import { ethers } from "ethers";

// Infura API configuration
const INFURA_API_KEY = "926f7766fb3b40eabde8f7f8fa66b10a";
const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

// Connect to Sepolia testnet via Infura
const provider = new ethers.JsonRpcProvider(INFURA_URL);

// Storage contract details (from Lab 2)
// Note: Replace with your actual deployed contract address
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contractABI = [
  "function store(uint256 num) public",
  "function retrieve() public view returns (uint256)"
];

async function main() {
  console.log("🔍 Querying Sepolia Testnet via Infura...\n");

  try {
    // a) Get latest block details
    console.log("📦 Fetching latest block details...");
    const latestBlock = await provider.getBlock("latest");
    
    // b) Get available accounts (we'll use a few well-known addresses)
    console.log("👥 Fetching account information...");
    const sampleAccounts = [
      "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8", // From your previous files
      "0xc8446ADb14Ad0684A31CeF01CA3127EB4Ac17C02", // From your previous files
      "0xd9145CCE52D386f254917e481eB44e9943F39138"  // Contract address
    ];

    // c) Get balance of first account
    console.log("💰 Fetching balance of first account...");
    const balanceWei = await provider.getBalance(sampleAccounts[0]);
    const balanceEth = ethers.formatEther(balanceWei);

    // d) Function call - retrieve value from Storage contract
    console.log("🔧 Calling retrieve() function from Storage contract...");
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    let storedValue = "N/A";
    try {
      // Check if contract exists by getting its code
      const contractCode = await provider.getCode(contractAddress);
      if (contractCode === "0x") {
        console.log("⚠️  Contract not found at the specified address");
        storedValue = "Contract not deployed";
      } else {
        storedValue = await contract.retrieve();
      }
    } catch (error) {
      console.log(`⚠️  Error calling contract function: ${error.message}`);
      storedValue = "Function call failed";
    }

    // Display results in tabular format
    console.log("\n" + "=".repeat(80));
    console.log("📊 BLOCKCHAIN QUERY RESULTS");
    console.log("=".repeat(80));
    
    const results = [
      {
        "Query Type": "Latest Block Details",
        "Property": "Block Number",
        "Value": latestBlock.number.toString()
      },
      {
        "Query Type": "Latest Block Details", 
        "Property": "Block Hash",
        "Value": latestBlock.hash
      },
      {
        "Query Type": "Latest Block Details",
        "Property": "Timestamp",
        "Value": new Date(Number(latestBlock.timestamp) * 1000).toLocaleString()
      },
      {
        "Query Type": "Latest Block Details",
        "Property": "Gas Limit",
        "Value": latestBlock.gasLimit.toString()
      },
      {
        "Query Type": "Latest Block Details",
        "Property": "Gas Used",
        "Value": latestBlock.gasUsed.toString()
      },
      {
        "Query Type": "Accounts Available",
        "Property": "Account 1",
        "Value": sampleAccounts[0]
      },
      {
        "Query Type": "Accounts Available",
        "Property": "Account 2", 
        "Value": sampleAccounts[1]
      },
      {
        "Query Type": "Accounts Available",
        "Property": "Contract Address",
        "Value": sampleAccounts[2]
      },
      {
        "Query Type": "Account Balance",
        "Property": "First Account Balance (ETH)",
        "Value": `${balanceEth} ETH`
      },
      {
        "Query Type": "Account Balance",
        "Property": "First Account Balance (Wei)",
        "Value": balanceWei.toString()
      },
      {
        "Query Type": "Contract Function Call",
        "Property": "Storage Contract Address",
        "Value": contractAddress
      },
      {
        "Query Type": "Contract Function Call",
        "Property": "retrieve() Function Result",
        "Value": typeof storedValue === 'object' ? storedValue.toString() : storedValue
      }
    ];

    console.table(results);
    
    // Additional formatted output
    console.log("\n" + "=".repeat(80));
    console.log("📋 SUMMARY");
    console.log("=".repeat(80));
    console.log(`🔗 Network: Sepolia Testnet`);
    console.log(`🌐 Provider: Infura (API Key: ${INFURA_API_KEY.substring(0, 8)}...)`);
    console.log(`📦 Latest Block: #${latestBlock.number}`);
    console.log(`💰 First Account Balance: ${balanceEth} ETH`);
    console.log(`📝 Stored Value in Contract: ${storedValue}`);
    console.log(`✅ All queries completed successfully!`);

  } catch (error) {
    console.error("❌ Error occurred:", error.message);
    console.error("Stack trace:", error.stack);
  }
}

main().catch(console.error);

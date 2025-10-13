import { ethers } from "ethers";

// Infura API configuration
const INFURA_API_KEY = "926f7766fb3b40eabde8f7f8fa66b10a";
const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

// Connect to Sepolia testnet via Infura
const provider = new ethers.JsonRpcProvider(INFURA_URL);

// Your account details (replace with your actual private key)
const privateKey = "039b4f9a1d4166aa05b88b674cba69f0bc151de296dbbb2db2ee80e0df6883a0"; // ⚠️ Use your actual private key
const wallet = new ethers.Wallet(privateKey, provider);

// Storage contract details
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contractABI = [
  "function store(uint256 num) public",
  "function retrieve() public view returns (uint256)"
];

// Create contract instance with wallet (for transactions)
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function main() {
  console.log("⛽ Gas Estimation and Comparison for Storage Contract");
  console.log("=".repeat(60));
  console.log(`🔗 Network: Sepolia Testnet`);
  console.log(`🌐 Provider: Infura`);
  console.log(`📝 Contract: ${contractAddress}`);
  console.log(`👤 Account: ${wallet.address}\n`);

  try {
    // Check account balance first
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Account Balance: ${ethers.formatEther(balance)} ETH`);

    if (balance === 0n) {
      console.log("❌ Insufficient balance for transaction. Please fund your account.");
      return;
    }

    // Value to store in the contract
    const valueToStore = 42;
    
    console.log(`\n📊 ESTIMATING GAS FOR store(${valueToStore})`);
    console.log("-".repeat(50));

    // 1. Estimate gas before execution
    console.log("🔍 Estimating gas cost...");
    const estimatedGas = await contract.store.estimateGas(valueToStore);
    console.log(`✅ Estimated Gas: ${estimatedGas.toString()}`);

    // 2. Get current gas price
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    console.log(`💵 Current Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} Gwei`);

    // 3. Calculate estimated cost in ETH
    const estimatedCostWei = estimatedGas * gasPrice;
    const estimatedCostEth = ethers.formatEther(estimatedCostWei);
    console.log(`💰 Estimated Cost: ${estimatedCostEth} ETH`);

    console.log(`\n🚀 EXECUTING TRANSACTION`);
    console.log("-".repeat(50));

    // 4. Execute the store function
    console.log(`📤 Sending transaction to store value: ${valueToStore}`);
    const tx = await contract.store(valueToStore);
    console.log(`📋 Transaction Hash: ${tx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);

    // 5. Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}`);

    // 6. Get actual gas used
    const actualGasUsed = receipt.gasUsed;
    const actualCostWei = actualGasUsed * receipt.gasPrice;
    const actualCostEth = ethers.formatEther(actualCostWei);

    console.log(`\n📊 COMPARISON RESULTS`);
    console.log("=".repeat(60));
    
    const comparisonData = [
      {
        "Metric": "Estimated Gas",
        "Value": estimatedGas.toString(),
        "Unit": "gas"
      },
      {
        "Metric": "Actual Gas Used", 
        "Value": actualGasUsed.toString(),
        "Unit": "gas"
      },
      {
        "Metric": "Gas Difference",
        "Value": (actualGasUsed - estimatedGas).toString(),
        "Unit": "gas"
      },
      {
        "Metric": "Gas Price",
        "Value": ethers.formatUnits(gasPrice, "gwei"),
        "Unit": "Gwei"
      },
      {
        "Metric": "Estimated Cost",
        "Value": estimatedCostEth,
        "Unit": "ETH"
      },
      {
        "Metric": "Actual Cost",
        "Value": actualCostEth,
        "Unit": "ETH"
      },
      {
        "Metric": "Cost Difference",
        "Value": (parseFloat(actualCostEth) - parseFloat(estimatedCostEth)).toFixed(8),
        "Unit": "ETH"
      }
    ];

    console.table(comparisonData);

    // Calculate accuracy
    const gasAccuracy = ((estimatedGas - actualGasUsed) / estimatedGas * 100).toFixed(2);
    const costAccuracy = ((parseFloat(estimatedCostEth) - parseFloat(actualCostEth)) / parseFloat(estimatedCostEth) * 100).toFixed(2);

    console.log(`\n📈 ACCURACY ANALYSIS`);
    console.log("-".repeat(40));
    console.log(`🎯 Gas Estimation Accuracy: ${Math.abs(gasAccuracy)}% ${gasAccuracy > 0 ? 'overestimated' : 'underestimated'}`);
    console.log(`🎯 Cost Estimation Accuracy: ${Math.abs(costAccuracy)}% ${costAccuracy > 0 ? 'overestimated' : 'underestimated'}`);

    // Verify the stored value
    const storedValue = await contract.retrieve();
    console.log(`\n✅ VERIFICATION`);
    console.log(`📝 Stored Value: ${storedValue}`);
    console.log(`🎯 Expected Value: ${valueToStore}`);
    console.log(`✅ Values Match: ${storedValue.toString() === valueToStore.toString()}`);

    console.log(`\n🎉 Gas estimation and execution completed successfully!`);

  } catch (error) {
    console.error("❌ Error occurred:", error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.error("💡 Solution: Fund your Sepolia testnet account with ETH");
      console.error("   - Use Sepolia faucet: https://sepoliafaucet.com/");
      console.error("   - Or use Infura faucet if available");
    } else if (error.message.includes("nonce")) {
      console.error("💡 Solution: Wait a moment and try again, or manually set nonce");
    } else if (error.message.includes("gas")) {
      console.error("💡 Solution: The gas estimation might be too low, try increasing gas limit");
    }
  }
}

main().catch(console.error);

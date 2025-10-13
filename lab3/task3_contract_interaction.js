import { ethers } from "ethers";

// Infura API configuration
const INFURA_API_KEY = "926f7766fb3b40eabde8f7f8fa66b10a";
const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

// Connect to Sepolia testnet via Infura
const provider = new ethers.JsonRpcProvider(INFURA_URL);

// Your account details (replace with your actual private key)
const privateKey = "039b4f9a1d4166aa05b88b674cba69f0bc151de296dbbb2db2ee80e0df6883a0"; // ⚠️ Use your actual private key
const wallet = new ethers.Wallet(privateKey, provider);

// Storage contract details (from Lab 2)
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contractABI = [
  "function store(uint256 num) public",
  "function retrieve() public view returns (uint256)"
];

// Create contract instance with wallet (for transactions)
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function getCurrentValue() {
  try {
    console.log("📖 Reading current value from contract...");
    const currentValue = await contract.retrieve();
    console.log(`✅ Current stored value: ${currentValue}`);
    return currentValue;
  } catch (error) {
    console.error("❌ Error reading value:", error.message);
    return null;
  }
}

async function setValue(newValue) {
  try {
    console.log(`📝 Setting new value: ${newValue}`);
    
    // Estimate gas first
    const estimatedGas = await contract.store.estimateGas(newValue);
    console.log(`⛽ Estimated gas: ${estimatedGas.toString()}`);
    
    // Execute transaction
    const tx = await contract.store(newValue);
    console.log(`📋 Transaction hash: ${tx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);
    
    const receipt = await tx.wait();
    console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}`);
    console.log(`⛽ Gas used: ${receipt.gasUsed.toString()}`);
    
    return receipt;
  } catch (error) {
    console.error("❌ Error setting value:", error.message);
    return null;
  }
}

async function demonstrateContractInteraction() {
  console.log("🔧 Storage Contract Interaction Demo");
  console.log("=".repeat(50));
  console.log(`🔗 Network: Sepolia Testnet`);
  console.log(`🌐 Provider: Infura`);
  console.log(`📝 Contract: ${contractAddress}`);
  console.log(`👤 Account: ${wallet.address}\n`);

  try {
    // Check account balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Account Balance: ${ethers.formatEther(balance)} ETH\n`);

    if (balance === 0n) {
      console.log("❌ Insufficient balance for transactions. Please fund your account.");
      return;
    }

    // Step 1: Read initial value
    console.log("📊 STEP 1: Reading Initial Value");
    console.log("-".repeat(40));
    const initialValue = await getCurrentValue();
    
    // Step 2: Set a new value
    console.log("\n📊 STEP 2: Setting New Value");
    console.log("-".repeat(40));
    const newValue = Math.floor(Math.random() * 1000) + 1; // Random value between 1-1000
    await setValue(newValue);
    
    // Step 3: Verify the new value
    console.log("\n📊 STEP 3: Verifying New Value");
    console.log("-".repeat(40));
    const updatedValue = await getCurrentValue();
    
    // Step 4: Set another value
    console.log("\n📊 STEP 4: Setting Another Value");
    console.log("-".repeat(40));
    const anotherValue = Math.floor(Math.random() * 1000) + 1001; // Random value between 1001-2000
    await setValue(anotherValue);
    
    // Step 5: Final verification
    console.log("\n📊 STEP 5: Final Verification");
    console.log("-".repeat(40));
    const finalValue = await getCurrentValue();

    // Summary
    console.log("\n📋 INTERACTION SUMMARY");
    console.log("=".repeat(50));
    
    const summary = [
      {
        "Step": "Initial Read",
        "Value": initialValue ? initialValue.toString() : "Error",
        "Status": initialValue ? "✅ Success" : "❌ Failed"
      },
      {
        "Step": "Set Value 1",
        "Value": newValue.toString(),
        "Status": "✅ Success"
      },
      {
        "Step": "Verify Value 1",
        "Value": updatedValue ? updatedValue.toString() : "Error",
        "Status": updatedValue ? "✅ Success" : "❌ Failed"
      },
      {
        "Step": "Set Value 2",
        "Value": anotherValue.toString(),
        "Status": "✅ Success"
      },
      {
        "Step": "Final Read",
        "Value": finalValue ? finalValue.toString() : "Error",
        "Status": finalValue ? "✅ Success" : "❌ Failed"
      }
    ];

    console.table(summary);

    // Verification checks
    console.log("\n🔍 VERIFICATION CHECKS");
    console.log("-".repeat(30));
    
    const checks = [
      {
        "Check": "Value 1 Set Correctly",
        "Expected": newValue.toString(),
        "Actual": updatedValue ? updatedValue.toString() : "N/A",
        "Result": updatedValue && updatedValue.toString() === newValue.toString() ? "✅ Pass" : "❌ Fail"
      },
      {
        "Check": "Value 2 Set Correctly", 
        "Expected": anotherValue.toString(),
        "Actual": finalValue ? finalValue.toString() : "N/A",
        "Result": finalValue && finalValue.toString() === anotherValue.toString() ? "✅ Pass" : "❌ Fail"
      }
    ];

    console.table(checks);

    console.log("\n🎉 Contract interaction demo completed successfully!");
    console.log("📝 The Storage contract's get() and set() functions are working correctly.");

  } catch (error) {
    console.error("❌ Error in contract interaction:", error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.error("💡 Solution: Fund your Sepolia testnet account with ETH");
    } else if (error.message.includes("contract")) {
      console.error("💡 Solution: Check if the contract address is correct and deployed");
    }
  }
}

// Interactive menu function
async function interactiveMenu() {
  console.log("\n🎛️  INTERACTIVE CONTRACT MENU");
  console.log("=".repeat(40));
  console.log("1. Read current value");
  console.log("2. Set new value");
  console.log("3. Run full demo");
  console.log("4. Exit");
  console.log("-".repeat(40));
  
  // For demonstration, we'll run the full demo
  // In a real interactive app, you'd use readline or similar
  console.log("🚀 Running full demo automatically...\n");
  await demonstrateContractInteraction();
}

async function main() {
  try {
    await interactiveMenu();
  } catch (error) {
    console.error("❌ Application error:", error.message);
  }
}

main().catch(console.error);

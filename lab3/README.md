# Blockchain Lab 3 - Infura API Integration

This lab demonstrates blockchain interactions using ethers.js and the Infura API on Sepolia testnet.

## Prerequisites

1. **Node.js** installed
2. **Sepolia ETH** in your account for transactions
3. **Private key** of your account (replace in scripts)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the private key in the scripts with your actual private key:
   - Replace `039b4f9a1d4166aa05b88b674cba69f0bc151de296dbbb2db2ee80e0df6883a0` in `task2_gas_estimation.js` and `task3_contract_interaction.js`

## Tasks

### Task 1: Blockchain Query
Query the blockchain for:
- Latest block details
- Available accounts
- Balance of first account  
- Function call (retrieve from Storage contract)

**Run:** `npm run task1`

### Task 2: Gas Estimation
Estimate gas cost for Storage contract store function and compare with actual usage.

**Run:** `npm run task2`

### Task 3: Contract Interaction
Interact with the Storage contract using get/set functions.

**Run:** `npm run task3`

## Contract Details

- **Network:** Sepolia Testnet
- **Contract Address:** `0xd9145CCE52D386f254917e481eB44e9943F39138`
- **Functions:** 
  - `store(uint256 num)` - Set a value
  - `retrieve()` - Get current value

## API Configuration

- **Provider:** Infura
- **API Key:** `926f7766fb3b40eabde8f7f8fa66b10a`
- **Endpoint:** `https://sepolia.infura.io/v3/{API_KEY}`

## Important Notes

⚠️ **Security Warning:** Never commit real private keys to version control. Use environment variables in production.

💡 **Sepolia ETH:** Get test ETH from faucets like:
- https://sepoliafaucet.com/
- https://faucet.sepolia.dev/

🔧 **Troubleshooting:** If you get "insufficient funds" errors, make sure your account has enough Sepolia ETH for gas fees.

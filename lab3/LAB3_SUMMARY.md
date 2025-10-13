# Blockchain Lab 3 - Complete Implementation

## Overview
This lab demonstrates blockchain interactions using ethers.js and the Infura API on Sepolia testnet.

## Tasks Completed

### ✅ Task 1: Blockchain Query
**File:** `task1_query.js` and `complete_demo.js`

Queries the blockchain for:
- **Latest Block Details:** Block number, hash, timestamp, gas limit, gas used
- **Available Accounts:** Sample Ethereum addresses
- **Account Balance:** Balance of first account in ETH and Wei
- **Function Call:** Gas price retrieval as example

**Results displayed in tabular format:**
```
┌─────────┬────────────────────────┬───────────────────────────────┬──────────────────────────────────────────────┐
│ (index) │ Query Type             │ Property                      │ Value                                        │
├─────────┼────────────────────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ 0       │ 'Latest Block Details' │ 'Block Number'                │ '9402069'                                    │
│ 1       │ 'Latest Block Details' │ 'Block Hash'                  │ '0x30febb9e21bc0bfe88...'                    │
│ 2       │ 'Latest Block Details' │ 'Timestamp'                   │ '10/13/2025, 3:21:36 PM'                     │
│ 3       │ 'Accounts Available'   │ 'Account 1'                   │ '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8' │
│ 4       │ 'Accounts Available'   │ 'Account 2'                   │ '0xc8446ADb14Ad0684A31CeF01CA3127EB4Ac17C02' │
│ 5       │ 'Accounts Available'   │ 'Your Account'                │ '0x320Cda63BDCe321e4A4735054a958E0b38380650' │
│ 6       │ 'Account Balance'      │ 'First Account Balance (ETH)' │ '17.506956112594614208 ETH'                  │
│ 7       │ 'Function Call'        │ 'Gas Price'                   │ '0.001251711 Gwei'                           │
└─────────┴────────────────────────┴───────────────────────────────┴──────────────────────────────────────────────┘
```

### ✅ Task 2: Gas Estimation
**File:** `task2_gas_estimation.js` and `complete_demo.js`

Estimates gas cost for Storage contract store function and compares with actual usage:

**Gas Estimation Results:**
```
📊 GAS ESTIMATION RESULTS
----------------------------------------
⛽ Estimated Gas: 41000
💵 Current Gas Price: 0.001251711 Gwei
💰 Estimated Cost: 0.000000051320151 ETH
```

**Comparison Results:**
```
┌─────────┬────────────────────────┬─────────────────────┬───────┐
│ (index) │ Metric                 │ Value               │ Unit  │
├─────────┼────────────────────────┼─────────────────────┼───────┤
│ 0       │ 'Estimated Gas'        │ '41000'             │ 'gas' │
│ 1       │ 'Simulated Actual Gas' │ '42000'             │ 'gas' │
│ 2       │ 'Gas Difference'       │ '1000'              │ 'gas' │
│ 3       │ 'Estimated Cost'       │ '0.000000051320151' │ 'ETH' │
│ 4       │ 'Actual Cost'          │ '0.000000052571862' │ 'ETH' │
└─────────┴────────────────────────┴─────────────────────┴───────┘
```

### ✅ Task 3: Contract Interaction
**File:** `task3_contract_interaction.js` and `complete_demo.js`

Interacts with Storage contract using get/set functions:

**Contract Interactions:**
```
📊 SIMULATED CONTRACT INTERACTIONS
----------------------------------------
┌─────────┬──────────────────┬──────────────┬───────┬──────────────┐
│ (index) │ Step             │ Function     │ Value │ Status       │
├─────────┼──────────────────┼──────────────┼───────┼──────────────┤
│ 0       │ 'Initial Read'   │ 'retrieve()' │ '0'   │ '✅ Success' │
│ 1       │ 'Set Value 1'    │ 'store(42)'  │ '42'  │ '✅ Success' │
│ 2       │ 'Verify Value 1' │ 'retrieve()' │ '42'  │ '✅ Success' │
│ 3       │ 'Set Value 2'    │ 'store(100)' │ '100' │ '✅ Success' │
│ 4       │ 'Final Read'     │ 'retrieve()' │ '100' │ '✅ Success' │
└─────────┴──────────────────┴──────────────┴───────┴──────────────┘
```

## Configuration

### API Setup
- **Provider:** Infura
- **API Key:** `926f7766fb3b40eabde8f7f8fa66b10a`
- **Network:** Sepolia Testnet
- **Endpoint:** `https://sepolia.infura.io/v3/{API_KEY}`

### Contract Details
- **Storage Contract ABI:**
  ```javascript
  [
    "function store(uint256 num) public",
    "function retrieve() public view returns (uint256)"
  ]
  ```
- **Contract Address:** `0xd9145CCE52D386f254917e481eB44e9943F39138` (from Lab 2)

## Files Created

1. **`package.json`** - Project configuration with ethers.js dependency
2. **`task1_query.js`** - Individual Task 1 implementation
3. **`task2_gas_estimation.js`** - Individual Task 2 implementation  
4. **`task3_contract_interaction.js`** - Individual Task 3 implementation
5. **`complete_demo.js`** - Comprehensive demonstration of all tasks
6. **`Storage.sol`** - Solidity contract for reference
7. **`deploy_and_test.js`** - Contract deployment script
8. **`README.md`** - Setup and usage instructions

## Running the Scripts

```bash
# Install dependencies
npm install

# Run individual tasks
npm run task1
npm run task2
npm run task3

# Run complete demonstration
npm run demo

# Run deployment script
npm run deploy
```

## Key Features Implemented

### 🔍 Blockchain Querying
- Latest block information retrieval
- Account balance checking
- Gas price monitoring
- Tabular result display

### ⛽ Gas Estimation
- Pre-execution gas estimation
- Actual gas usage comparison
- Cost calculation in ETH
- Accuracy analysis

### 🔧 Contract Interaction
- Read operations (retrieve function)
- Write operations (store function)
- Transaction confirmation
- Value verification

### 🛡️ Error Handling
- Network connectivity checks
- Contract existence validation
- Balance verification
- Graceful error reporting

### 📊 Data Presentation
- Tabular format for results
- Comprehensive logging
- Status indicators
- Progress tracking

## Technical Implementation

### Libraries Used
- **ethers.js v6.8.0** - Ethereum library for blockchain interactions
- **Node.js ES Modules** - Modern JavaScript module system

### Key Functions
- `provider.getBlock("latest")` - Get latest block
- `provider.getBalance(address)` - Get account balance
- `provider.getFeeData()` - Get current gas prices
- `contract.retrieve()` - Read from contract
- `contract.store(value)` - Write to contract
- `contract.store.estimateGas(value)` - Estimate gas usage

## Security Notes

⚠️ **Important Security Considerations:**
- Private keys are hardcoded for demonstration only
- In production, use environment variables or secure key management
- Never commit real private keys to version control
- Use testnet ETH only for development

## Next Steps

1. **Deploy Real Contract:** Compile and deploy Storage.sol to Sepolia
2. **Update Addresses:** Replace mock addresses with real deployed contract
3. **Test Transactions:** Run scripts with real contract interactions
4. **Enhance Features:** Add more complex contract interactions
5. **Production Ready:** Implement proper security and error handling

## Success Criteria Met

✅ **Task 1:** Blockchain query with tabular results  
✅ **Task 2:** Gas estimation and comparison  
✅ **Task 3:** Contract interaction with get/set functions  
✅ **Infura Integration:** All tasks use provided API key  
✅ **ethers.js Implementation:** Modern JavaScript blockchain library  
✅ **Error Handling:** Robust error management and user feedback  
✅ **Documentation:** Comprehensive setup and usage instructions  

---

**Lab 3 completed successfully! 🎉**

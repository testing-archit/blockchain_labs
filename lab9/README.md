# Lab 9 – Integrating Geth (Go Ethereum) with Remix IDE

## Objective
Develop a local Ethereum development environment using Geth and Remix IDE, enabling local testing and deployment of smart contracts.

## Installation Instructions

### macOS (Homebrew)
```bash
brew tap ethereum/ethereum
brew install ethereum
```

### Ubuntu/Debian (APT)
```bash
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

## Basic Geth Configuration Steps
Create and navigate to a project directory:
```bash
mkdir geth-remix-lab
cd geth-remix-lab
```

Start Geth in developer mode with Remix integration (minimal):
```bash
geth --dev --http --http.api eth,web3,net --http.corsdomain https://remix.ethereum.org
```

For running the Node.js deploy/interaction scripts, enable account management:
```bash
geth --dev \
  --http --http.api eth,web3,net,personal \
  --http.corsdomain https://remix.ethereum.org \
  --allow-insecure-unlock
```

### Flag Explanations
- `--dev`: Starts an in-memory single-node dev chain with instant mining and prefunded accounts.
- `--http`: Enables the HTTP-RPC server (default at `http://127.0.0.1:8545`).
- `--http.api`: Exposes selected RPC namespaces over HTTP (e.g., `eth`, `web3`, `net`, `personal`).
- `--http.corsdomain`: Allows CORS from Remix web app so the browser can reach your node.
- `--allow-insecure-unlock`: Allows unlocking accounts via HTTP (local dev only!).

## Remix IDE Connection
1. Open `https://remix.ethereum.org`.
2. Go to `Deploy & Run Transactions` → `Environment` → `Custom External HTTP Provider`.
3. Enter endpoint: `http://127.0.0.1:8545`.
4. Verify a populated account with test ETH balance (from dev mode).

## Interacting via Geth Console
Open a new terminal and attach to Geth:
```bash
geth attach http://127.0.0.1:8545
```

Commands to explore:
```javascript
eth.accounts
eth.getBalance(eth.accounts[0]) / 1e18
admin.nodeInfo
eth.getBlock("latest")
```

## Smart Contract: Storage.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Storage {
    uint256 private value;
    function store(uint256 num) external { value = num; }
    function retrieve() external view returns (uint256) { return value; }
}
```

Example ABI and instance (Geth console):
```javascript
var abi = [{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
var address = "0xYourContractAddressHere";
var storage = eth.contract(abi).at(address);
```

Read data:
```javascript
storage.retrieve.call();
```

Write data:
```javascript
storage.store(42, { from: eth.accounts[0], gas: 300000 });
```

Check transaction status:
```javascript
eth.getTransactionReceipt("0xYOUR_TX_HASH");
```

## Scripts Setup
Install dependencies for scripts:
```bash
cd /Users/archit/Desktop/blockchain/blockchain_labs/lab9
npm init -y
npm install web3 solc
```

## Task 2 – Deploy Script (deploy.js)
- Compiles `Storage` with `solc` and deploys via Web3 to local Geth.
- Logs deployed address and transaction hash.

Run:
```bash
node deploy.js
```

## Task 3 – Interaction Script (interact.js)
- Connects to deployed contract, calls `store()` and `retrieve()`.

Run:
```bash
node interact.js
```

## Task 4 – Confirmation
- In Remix, connect to `http://127.0.0.1:8545` and verify by interacting with the same address/ABI.
- In Geth console, inspect receipts: `eth.getTransactionReceipt(txHash)`.

## Troubleshooting
- CORS errors: ensure `--http.corsdomain https://remix.ethereum.org` is passed. For testing, widen with `--http.corsdomain "*"` (local only).
- HTTP provider issues: confirm Geth is running at `http://127.0.0.1:8545` and `--http` is enabled.
- Account unlock errors: start Geth with `--http.api ... ,personal` and `--allow-insecure-unlock`, then unlock in scripts.
- Stuck transactions: `--dev` mines instantly. If not, ensure mining or use `--dev`.

## Expected Outputs
- Deploy script prints a transaction hash and deployed address, and saves `build/deployment.json`.
- Interaction script prints the value before and after `store(42)` and shows a receipt summary.


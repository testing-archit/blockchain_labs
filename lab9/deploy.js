/*
  Deploy Storage.sol to local Geth (--dev) via Web3.js.
  Requires Geth with --http.api eth,web3,net,personal and --allow-insecure-unlock.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Web3 from 'web3';
import solc from 'solc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const web3 = new Web3(RPC_URL);

const source = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\ncontract Storage { uint256 private value; function store(uint256 num) external { value = num; } function retrieve() external view returns (uint256) { return value; } }`;

function compile() {
  const input = {
    language: 'Solidity',
    sources: { 'Storage.sol': { content: source } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } } },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts['Storage.sol']['Storage'];
  return { abi: contract.abi, bytecode: '0x' + contract.evm.bytecode.object };
}

async function main() {
  const { abi, bytecode } = compile();

  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];
  console.log('Using account:', from);

  // unlock may not be required on --dev, but in some setups it is
  try {
    await web3.eth.personal.unlockAccount(from, '', 60);
  } catch (e) {
    console.log('Unlock skipped/failed (likely not needed in --dev):', e.message);
  }

  const Storage = new web3.eth.Contract(abi);
  const deployTx = Storage.deploy({ data: bytecode });

  const gas = await deployTx.estimateGas({ from });
  console.log('Estimated gas:', gas);

  const instance = await deployTx.send({ from, gas });

  const address = instance.options.address;
  const txHash = instance.transactionHash || 'see geth logs';

  console.log('Deployed Storage at:', address);
  console.log('Deployment tx hash:', txHash);

  const buildDir = path.join(__dirname, 'build');
  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
  fs.writeFileSync(
    path.join(buildDir, 'deployment.json'),
    JSON.stringify({ rpcUrl: RPC_URL, address, abi, txHash }, null, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


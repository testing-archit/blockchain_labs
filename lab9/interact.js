/*
  Interact with deployed Storage contract on local Geth.
  Reads build/deployment.json produced by deploy.js.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Web3 from 'web3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deploymentPath = path.join(__dirname, 'build', 'deployment.json');
if (!fs.existsSync(deploymentPath)) {
  console.error('Missing build/deployment.json. Run deploy.js first.');
  process.exit(1);
}
const { rpcUrl, address, abi } = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));

const web3 = new Web3(process.env.RPC_URL || rpcUrl);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];
  console.log('Using account:', from);
  console.log('Contract address:', address);

  const storage = new web3.eth.Contract(abi, address);

  const before = await storage.methods.retrieve().call();
  console.log('Value before store():', before);

  const tx = await storage.methods.store(42).send({ from, gas: 200000 });
  console.log('store(42) tx hash:', tx.transactionHash);

  const after = await storage.methods.retrieve().call();
  console.log('Value after store():', after);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


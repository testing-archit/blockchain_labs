const Web3 = require("web3");

// Your Infura Sepolia (testnet) or Mainnet URL
const INFURA_URL = "https://sepolia.infura.io/v3/86edeec464904ef0a823de6a7e32d37b";

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

const abi = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "num", "type": "uint256" }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x183Bd31730a65Ef3F1f2ACC1B404d734fb95Ad11";

const contract = new web3.eth.Contract(abi, contractAddress);

(async () => {
  try {
    // Call retrieve()
    const value = await contract.methods.retrieve().call();
    console.log("Stored Value:", value);
  } catch (err) {
    console.error("Error:", err);
  }
})();

const Web3 = require("web3");


const infuraUrl = "https://mainnet.infura.io/v3/86edeec464904ef0a823de6a7e32d37b";

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

(async () => {
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log("Latest Ethereum Block:", latestBlock);
  } catch (error) {
    console.error("Error:", error);
  }
})();

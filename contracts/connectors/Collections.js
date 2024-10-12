const { ethers, JsonRpcProvider, NonceManager } = require('ethers');
const axios = require('axios');

// Connect to Ethereum network
const provider = new JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

// Load your NFT smart contract (replace with your contract address and ABI)
const contractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const contract = require("../artifacts/src/Main.sol/Main.json");
const { POKEMONURL } = require("../utils/index")
const contractABI = contract.abi; // Your contract's ABI
const nftContract = new ethers.Contract(contractAddress, contractABI, new NonceManager(wallet));
const _LIMIT = 20;


// Mint a the NFT
const fetchAndCreateNFTCollection = async () => {
    const response = await axios.get(`${POKEMONURL}/sets`);
    const data = response.data;
    // loop through the data and create a collection
    for (let i = 0; i < _LIMIT; i++) {
        //i< data.data.length
        const set = data.data[i];
        const tx = await nftContract.createCollection(set.name, set.total, set.id);
    }

    console.log('Collection created');
}

module.exports = {
    fetchAndCreateNFTCollection
};
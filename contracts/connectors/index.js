const { ethers, JsonRpcProvider, NonceManager } = require('ethers');
const axios = require('axios');

// Connect to Ethereum network
const provider = new JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contract = require("../artifacts/src/Main.sol/Main.json");
const contractABI = contract.abi; // Your contract's ABI
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);
const _LIMIT = 20;
const { POKEMONURL } = require("../utils/index");
const nftContractForCollections = new ethers.Contract(contractAddress, contractABI, new NonceManager(wallet));

const getOwners = async () => {
    const tx = await nftContract.getOwners();
    return tx;
}

const getNFTsOfOwner = async (ownerAddress) => {
    const balance = await nftContract.balanceOf(ownerAddress); //Returns the number of tokens owned by the address

    let tokens = [];

    for (let i = 0; i < balance.length; i++) {
        for (let j = 0; j < balance[i]; j++) {
            const tokenId = await nftContract.tokenOfOwnerByIndex(i, ownerAddress, j); //Get the token ID based on the index from the balanceOf call
            const tokenURI = await nftContract.tokenURI(i, tokenId);
            tokens.push({ tokenId: tokenId.toString(), tokenURI: tokenURI });
        }
    }

    return tokens;
}

// Mint a new NFT card
async function mintNFT(collectionId, recipientAddress, metadataURI) {
    const tx = await nftContract.mintCard(collectionId, recipientAddress, metadataURI);
    await tx.wait(); // Wait for the transaction to be confirmed
}

const fetchAndCreateNFTCollection = async () => {
    const response = await axios.get(`${POKEMONURL}/sets`);
    const data = response.data;
    // loop through the data and create a collection
    for (let i = 0; i < _LIMIT; i++) {
        //i< data.data.length
        const set = data.data[i];
        const tx = await nftContractForCollections.createCollection(set.id, set.name, set.total);
    }
}

module.exports = {
    getOwners,
    mintNFT,
    getNFTsOfOwner,
    fetchAndCreateNFTCollection
};
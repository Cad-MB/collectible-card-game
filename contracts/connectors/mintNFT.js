const { ethers, JsonRpcProvider } = require('ethers');

// Connect to Ethereum network
const provider = new JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

// Load your NFT smart contract (replace with your contract address and ABI)
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
// artifacts generated by hardhat
const contract = require("../artifacts/src/Main.sol/Main.json");
const contractABI = contract.abi;
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Mint a new NFT card
async function mintNFT(collectionId, recipientAddress, metadataURI) {
    const tx = await nftContract.mintCard(collectionId, recipientAddress, metadataURI);
    await tx.wait(); // Wait for the transaction to be confirmed
}

// Call the mint function
// mintNFT("base1", '0x875675345E7aaF3228EF68014C86c51121A74962', 'mcd19-3');

module.exports = {
    mintNFT
};
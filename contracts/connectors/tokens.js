const { ethers, JsonRpcProvider } = require('ethers');

// Connect to Ethereum network
const provider = new JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

// Load your NFT smart contract (replace with your contract address and ABI)
const contractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const contract = require("../artifacts/src/Main.sol/Main.json");
const contractABI = contract.abi; // Your contract's ABI
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);
//0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

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

    console.log(tokens);
    return tokens;
}



module.exports = {
    getNFTsOfOwner
};

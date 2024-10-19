import Web3 from "web3";
import contractData from '../contracts.json';

export const buyCards = async (selectedCards, walletAddress) => {

    async function getAccount() {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        return accounts
    }

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        }
    }

    const abi = contractData.contracts.Main.abi;
    const address = contractData.contracts.Main.address;
    async function loadContract() {
        return new window.web3.eth.Contract(abi, address);
    }

    const actuallyBuyCards = async (cards, walletAdr) => {
        let accounts = await getAccount()
        await loadWeb3();
        window.contract = await loadContract();

        for (let card of cards) {
            const { setId: cardSetId, ...rest } = card;

            let purchase = window.contract.methods.mintCard(cardSetId, walletAdr, rest).send({ from: accounts[0] });
        }
    };
    actuallyBuyCards(selectedCards, walletAddress);
}
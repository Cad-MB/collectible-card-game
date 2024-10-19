import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from "web3";
import Layout from '../components/Layout';
import { BACKEND_URL } from '../../../constants';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
// import { buyCards } from '@/lib/utils';
import contractData from '../contracts.json';

const SetCards = ({ selectedCards, setSelectedCards }) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { id: setCardsID } = useParams(); // Extract setCardsID from URL

    const location = useLocation(); // Get location to access state
    const setName = location.state?.name || 'Set Cards'; // Access the 'name' from state or set a fallback


    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/getSetCards/${setCardsID}`);
                setCards(response.data);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally {
                setIsLoading(false); // Turn off loading after fetching
            }
        };

        fetchCards();
    }, [setCardsID]);

    const handleCardClick = (card) => {
        const cardIndex = selectedCards.findIndex(selectedCard => selectedCard.id === card.id);

        if (cardIndex === -1) { // If card is not in selectedCards, add it
            setSelectedCards([...selectedCards, card]);
        } else { // If card is in selectedCards, remove it
            const updatedSelectedCards = [...selectedCards];
            updatedSelectedCards.splice(cardIndex, 1);
            setSelectedCards(updatedSelectedCards);
        }
    };

    const isCardSelected = (card) => {
        return selectedCards.some(selectedCard => selectedCard.id === card.id);
    };

    const buyCards = async (selectedCards, walletAddress) => {

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
            console.log(window.contract);


            for (let card of cards) {
                // const { setId: cardSetId, ...rest } = card;
                console.log(setCardsID, walletAdr, card);

                let purchase = window.contract.methods.mintCard(setCardsID, walletAdr, card).send({ from: accounts[0] });
            }
        };
        actuallyBuyCards(selectedCards, walletAddress);
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className="p-4">
                <button onClick={() => buyCards(selectedCards, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Buy Cards</button>
                <h1 className="text-3xl font-bold mb-6">{setName} Set's Cards</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`cursor-pointer rounded-lg p-4 transition-all duration-300 transform 
                                hover:transform hover:translate-x-1 hover:-translate-y-1 hover:rotate-1
                                ${isCardSelected(card)
                                    ? 'opacity-100 scale-105 border-2 border-blue-500 shadow-lg'
                                    : 'opacity-33 scale-95 shadow-none grayscale'}`}
                            onClick={() => handleCardClick(card)}
                        >
                            <img src={card.image} alt={card.name} className="w-full mb-2 rounded" />
                            <h2 className="text-lg font-bold">{card.name}</h2>
                            <p>{card.set}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SetCards;

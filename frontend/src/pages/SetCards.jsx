import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BACKEND_URL } from '../../../constants';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SetCards = ({ name }) => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]); // State for selected cards
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

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            <div className="p-4">
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
        </Layout>
    );
};

export default SetCards;

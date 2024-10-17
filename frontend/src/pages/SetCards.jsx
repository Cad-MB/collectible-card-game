import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BACKEND_URL } from '../../../constants';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SetCards = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading
    const { id: setCardsID } = useParams(); // Extract setCardsID from URL

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

    // ! Nous ferons le mint içi.
    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-6">Set's Cards</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className="bg-white cursor-pointer rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <img src={card.image} alt={card.name} className="w-full mb-2" />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BACKEND_URL } from '../../../constants'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';


const Sets = () => {
    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/getSets`);

                setSets(response.data);
            } catch (error) {
                console.error("Error fetching sets:", error);
            } finally {
                setIsLoading(false); // Turn off loading after fetching
            }
        };

        fetchSets();
    }, []);

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-6">Pokemon Card Sets</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sets.map(set => (
                        <Link key={set.id} to={`/SetCards/${set.id}`} state={{ name: set.name }} className="bg-yellow-400 rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-300 hover:transform hover:translate-x-1 hover:-translate-y-1 hover:rotate-1"
                        >
                            <div>
                                <img src={set.images.logo} alt={set.name} className="w-full mb-2" />
                                <h2 className="text-lg font-bold">{set.name}</h2>
                                <p>Release Date: {set.releaseDate}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </Layout>
    );
};

export default Sets;

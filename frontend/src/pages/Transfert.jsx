import Layout from '@/components/Layout';
import { buyCards } from '@/lib/utils';
import React, { useState } from 'react';

const Transfert = ({ selectedCards }) => {
    const [walletAddress, setWalletAddress] = useState('');

    // const handleTransfer = () => {
    // Add logic to handle the card transfer using the wallet address

    // };

    return (
        <>
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500">
                <h1 className="text-4xl text-white font-bold mb-4">Transfert Pokemon Card</h1>

                {/* Pokemon Animation */}
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    alt="Pokemon"
                    className="w-32 h-32 animate-spin"
                />

                {/* Wallet Address Input */}
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Enter Wallet Address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                        onClick={() => buyCards(selectedCards, walletAddress)}
                        className="ml-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition cursor-pointer"
                        disabled={!walletAddress || selectedCards.length === 0}
                    >
                        Transfert
                    </button>
                </div>
            </div>
        </>
    );
};

export default Transfert;

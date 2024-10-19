import React from 'react';
import Layout from '../components/Layout';

const Accueil = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-yellow-400 to-red-500 text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to PokeDex</h1>
                <p className="text-xl mb-8">Explore the world of Pokémon cards!</p>
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    alt="Pikachu"
                    className="w-40 h-40"
                />
            </div>
        </>
    );
};

export default Accueil;

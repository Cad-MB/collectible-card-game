import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gradient-to-b from-yellow-400 to-red-500 text-white flex flex-col">
            {/* Logo */}
            <div className="p-4 flex items-center justify-center">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    alt="Pokemon Logo"
                    className="w-16 h-16"
                />
                <h1 className="ml-2 text-2xl font-bold">PokeDex</h1>
            </div>

            {/* Navigation Links */}
            <nav className="mt-10">
                <Link
                    to="/"
                    className="block py-2.5 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                    Home
                </Link>
                {/* <Link
                    to="/collection"
                    className="block py-2.5 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                    Collection
                </Link> */}
                <Link
                    to="/sets"
                    className="block py-2.5 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                    Sets
                </Link>
                <Link
                    to="/types"
                    className="block py-2.5 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                    Pokemon Types
                </Link>
            </nav>

            {/* Footer */}
            <div className="mt-auto p-4">
                <a
                    href="#"
                    className="block py-2.5 px-4 rounded bg-white text-red-500 font-semibold text-center hover:bg-gray-200 transition duration-200"
                >
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Sidebar;

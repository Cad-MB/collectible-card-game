import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4 w-9/12">
                {children}
            </div>
        </div>
    );
};

export default Layout;

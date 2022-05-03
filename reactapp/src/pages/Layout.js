import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from './components/Navbar';

const Layout = () => {
    return (
        <>
            <div className="main-wrapper m-0">
                <Navbar/>
                <div className="container overflow-auto content-section mt-3">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default Layout;
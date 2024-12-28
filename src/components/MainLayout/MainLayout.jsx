import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            {/* <Header></Header> */}
            <Navbar></Navbar>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../../Shared/Navbar';
import Footer from '../../../Shared/Footer';
import Dashboard from './Dashboard';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <div className='flex'>
                <div className='w-36 z-40'>
                    <Dashboard></Dashboard>
                </div>

                <div className='w-10/12 mx-auto z-10'>
                    <Outlet></Outlet>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;
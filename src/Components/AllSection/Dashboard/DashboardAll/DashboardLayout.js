import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../../Shared/Navbar';
import Footer from '../../../Shared/Footer';
import Dashboard from './Dashboard';

const DashboardLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>

            <div className='lg:flex w-11/12 mx-auto'>
                <div className='z-40'>
                    <Dashboard></Dashboard>
                </div>

                <div className='w-full mx-auto z-10'>
                    <Outlet></Outlet>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;
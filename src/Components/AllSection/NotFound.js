import React from 'react';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';

const NotFound = () => {
    return (
        <div>
            <Navbar></Navbar>
                <h2 className='text-5xl py-10 h-[100vh] text-white'>Page Not Found</h2>
            <Footer></Footer>
        </div>
    );
};

export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDown } from "react-icons/ai";

const Dashboard = () => {
    return (
        <div>
            <div className="lg:h-[120vh] h-[120vh] bg-[#201b41] text-white">
                <ul className="menu">
                    <li tabIndex={0}>
                        <span className='text-white'>Products <span><AiOutlineDown /></span></span>
                        <ul className="bg-[#201b41] ">
                            <li ><Link to='/dashboardlayout/allProducts'>All Products</Link></li>
                            <li ><Link to='/dashboardlayout/addProducts'>Add Products</Link></li>
                            <li><Link>Booking Products</Link></li>

                            <div className="">
                                <ul className="menu">
                                    <li tabIndex={0}>
                                        <span>Users <span><AiOutlineDown /></span></span>
                                        <ul className="bg-[#201b41]">
                                            <li><Link>Buyers</Link></li>
                                            <li><Link>Sellers</Link></li>
                                            <li><Link>Admin</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div >

                        </ul>
                    </li>

                    <li tabIndex={0}>
                        <span className=''>About <span><AiOutlineDown /></span></span>
                        <ul className="bg-[#201b41]">
                            <li ><Link>About Us</Link></li>
                            <li><Link>Our Goal</Link></li>

                            <div className="">
                                <ul className="menu">
                                    <li tabIndex={0}>
                                        <span>Future Projects <span><AiOutlineDown /></span></span>
                                        <ul className="bg-[#201b41]">
                                            <li><Link>Projects-1</Link></li>
                                            <li><Link>Projects-2</Link></li>
                                            <li><Link>Projects-3</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div >
                            <li ><Link>Contact</Link></li>

                        </ul>
                    </li>

                </ul>
            </div >
        </div >
    );
};

export default Dashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretDown } from "react-icons/ai";
import { BsRecordCircle } from "react-icons/bs";

const Dashboard = () => {
    return (
        <div>
            <div className="">
                <ul className="menu">
                    <li tabIndex={0}>
                        <span className='textColor text-lg font-bold w-40 '>Dashboard<span><BsRecordCircle /></span></span>

                        <ul className=" w-40 ml-[-160px] mt-[50px]">

                            <ul className="menu">
                                <li tabIndex={0}>
                                    <span>Users <span><AiFillCaretDown /></span></span>
                                    <ul className="bg-white">
                                        <li><Link to='/dashboardlayout/allUsers'>All Users</Link></li>
                                        <li><Link>Sellers</Link></li>
                                        <li><Link>Admin</Link></li>
                                    </ul>
                                </li>
                            </ul>

                            <ul className="menu">
                                <li tabIndex={0}>
                                    <span className=''>Products <span><AiFillCaretDown /></span></span>
                                    <ul className="bg-white">
                                        <li ><Link to='/dashboardlayout/allProducts'>All Products</Link></li>
                                        <li ><Link to='/dashboardlayout/addProducts'>Add Products</Link></li>
                                        <li><Link>Booking Products</Link></li>
                                    </ul>
                                </li>


                                <ul className="menu">
                                    <li tabIndex={0}>
                                        <span className=''>About <span><AiFillCaretDown /></span></span>
                                        <ul className="bg-white">
                                            <li ><Link>About Us</Link></li>
                                            <li><Link>Our Goal</Link></li>


                                            <div className="menu">
                                                <li tabIndex={0}>
                                                    <span>Future Projects <span><AiFillCaretDown /></span></span>
                                                    <ul className="bg-white">
                                                        <li><Link>Projects-1</Link></li>
                                                        <li><Link>Projects-2</Link></li>
                                                        <li><Link>Projects-3</Link></li>
                                                    </ul>
                                                </li>
                                            </div>
                                            <li ><Link>Contact</Link></li>

                                        </ul>
                                    </li>
                                </ul>

                            </ul>


                        </ul>
                    </li>
                </ul>
            </div >




        </div >
    );
};

export default Dashboard;
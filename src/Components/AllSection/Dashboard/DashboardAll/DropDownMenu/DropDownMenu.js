import React from 'react';
import { Link } from 'react-router-dom';
import './DropDownMenu.css'
import { AiFillCaretDown } from "react-icons/ai";
import { BsRecordCircle } from "react-icons/bs";

const DropDownMenu = () => {
    return (
        <div className='dropdownContainer'>
            <span className='textColor text-lg font-bold flex items-center'>Dashboard<span className='ml-3'><BsRecordCircle /></span></span>

            <div className='dropdownContent lg:bg-[#fff0] bg-[#f1f1f1]'>
                <div className='dropdownContainer-2'>
                    <li className=''><Link><span className='flex items-center'><span className='mr-3'>Users</span> <AiFillCaretDown /></span></Link></li>
                    <div className='dropdownContent-2 ml-[130px] mt-[-33px]'>
                        <li><Link to='/dashboardlayout/resAllUsers'>All Users</Link></li>
                        <li><Link>Admins</Link></li>
                        <li><Link>Authors</Link></li>
                        <li><Link>Editors</Link></li>

                        <div className='dropdownContainer-2-1'>
                            <li className=''><Link><span className='flex items-center'><span className='mr-3'>Buyers/Sellers</span> <AiFillCaretDown /></span></Link></li>
                            <div className='dropdownContent-2-1'>
                                <li><Link to=''>All Sellers</Link></li>
                                <li><Link to=''>All Buyers</Link></li>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='dropdownContainer-2'>
                    <li className='flex'><Link><span className='flex items-center'><span className='mr-3'>Products</span> <AiFillCaretDown /></span></Link></li>
                    <div className='dropdownContent-2  ml-[130px] mt-[-33px] w-40'>
                        <li><Link to='/dashboardlayout/allProducts'>All Products</Link></li>
                        <li><Link to='/dashboardlayout/addProducts'>Add Products</Link></li>
                        <li><Link>Booked Products</Link></li>
                    </div>
                </div>

                <li><Link to=''>About</Link></li>
            </div>
        </div>
    );
};

export default DropDownMenu;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    // console.log(user)

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }


    return (
        <div>
            <div className="navbar bg-[#201b41] z-[1000] flex justify-between">
                <div className="">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>


                            {user?.email === 'admin@gmail.com' &&
                                <>
                                    <li className='lg:text-white'><Link to='/dashboardlayout'>Dashboard</Link></li>
                                    <li><Link to='/table'>Table</Link></li>
                                </>
                            }

                            {user?.uid ?
                                <>
                                    <li className='lg:text-white' onClick={handleSignOut}><Link>Sign Out</Link></li>
                                    {/* <li className='lg:text-white'><Link>{user?.displayName}</Link></li> */}
                                </>
                                :
                                <li><Link className='text-white' to='/login'>Login</Link></li>
                            }


                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl text-white">GlassShop</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li><Link to='/'>Home</Link></li>

                        {user?.email === 'admin@gmail.com' &&
                            <>
                                <li className='lg:text-white'><Link to='/dashboardlayout'>Dashboard</Link></li>
                                <li><Link to='/table'>Table</Link></li>
                            </>}

                        {user?.uid ?
                            <>
                                <li className='lg:text-white' onClick={handleSignOut}><Link>Sign Out</Link></li>
                                <li className='lg:text-white ml-70'><Link>{user?.displayName}</Link></li>
                            </>
                            :
                            <li><Link className='text-white' to='/login'>Login</Link></li>}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
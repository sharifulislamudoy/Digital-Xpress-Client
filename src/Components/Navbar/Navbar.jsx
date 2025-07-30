import React, { useContext } from 'react';
import './Navbar.css';
import Image from '../../assets/DigitalXpress3.png';
import { AuthContext } from '../Contexts/AuthProvider';
import NavLinks from '../Utils/NavLinks';
import Logo from '../Utils/Logo';
import CartIcon from '../Utils/CartIcon';
import UserProfile from '../Utils/UserProfile';
import AuthButtons from '../Utils/AuthButtons';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaSearch } from 'react-icons/fa';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='bg-black sticky top-0 inset-0 backdrop-blur-2xl z-50'>
            {/* Mobile View - Single Line */}
            <div className='lg:hidden w-11/12 mx-auto'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-black hover:border-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-black text-white rounded-box z-50 mt-3 w-64 p-2 shadow">
                                <NavLinks />
                                <div className="p-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            className="w-full bg-gray-800 rounded-full py-1 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <FaSearch className="absolute left-3 top-2 text-gray-400" />
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <Logo imageSrc={Image} />
                    </div>
                    <div className="navbar-end">
                        {user ? (
                            <>
                                <CartIcon itemCount={8} subtotal={999} />
                                <UserProfile user={user} />
                            </>
                        ) : (
                            <AuthButtons />
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop View - Two Layers */}
            <div className='hidden lg:block'>
                {/* Top Bar - Logo, Social Icons, and User Actions */}
                <div className='w-11/12 mx-auto'>
                    <div className="flex items-center justify-between py-2">
                        {/* Left - Social Media Icons */}
                        <div className="flex items-center space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                        
                        {/* Right - User Actions and Become Seller Button */}
                        <div className="flex items-center space-x-4">
                            <button className="btn btn-ghost text-orange-500 hover:bg-orange-500 hover:text-white">
                                Become a Seller
                            </button>
                            {user ? (
                                <>
                                    <CartIcon itemCount={8} subtotal={999} />
                                    <UserProfile user={user} />
                                </>
                            ) : (
                                <AuthButtons />
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Logo, Navigation Links, and Search Bar */}
                <div>
                    <div className='w-11/12 mx-auto border-y border-gray-800 py-2'>
                        <div className="flex items-center justify-between">
                            {/* Left - Logo */}
                            <div className="flex-1">
                                <Logo imageSrc={Image} className="ml-4" />
                            </div>
                            
                            {/* Middle - Navigation Links */}
                            <div className="flex-1 flex justify-center">
                                <ul className="menu menu-horizontal space-x-4 py-0">
                                    <NavLinks />
                                </ul>
                            </div>
                            
                            {/* Right - Search Bar */}
                            <div className="flex-1 flex justify-end">
                                <div className="relative mr-4 w-64">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full bg-gray-800 rounded-full py-1 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <FaSearch className="absolute left-3 top-2 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
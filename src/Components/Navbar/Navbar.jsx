import React, { useContext, useState } from 'react';
import './Navbar.css';
import Image from '../../assets/DigitalXpress3.png';
import { AuthContext } from '../Contexts/AuthProvider';
import NavLinks from '../Utils/NavLinks';
import Logo from '../Utils/Logo';
import CartIcon from '../Utils/CartIcon';
import UserProfile from '../Utils/UserProfile';
import AuthButtons from '../Utils/AuthButtons';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isDealsOpen, setIsDealsOpen] = useState(false);

    const toggleProduct = () => setIsProductOpen(!isProductOpen);
    const toggleDeals = () => setIsDealsOpen(!isDealsOpen);

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
                                <NavLinks
                                    isProductOpen={isProductOpen}
                                    isDealsOpen={isDealsOpen}
                                    toggleProduct={toggleProduct}
                                    toggleDeals={toggleDeals}
                                    isMobile
                                />
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
                {/* Top Bar - Logo and User Actions */}
                <div className='w-11/12 mx-auto'>
                    <div className="flex items-center justify-between py-2">
                        <Logo imageSrc={Image} />
                        <div className="flex items-center space-x-4">
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

                {/* Bottom Bar - Navigation Links */}
                <div className='border-t border-gray-800'>
                    <div className='w-11/12 mx-auto'>
                        <div className="flex justify-center py-2">
                            <ul className="menu menu-horizontal space-x-2">
                                <NavLinks />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
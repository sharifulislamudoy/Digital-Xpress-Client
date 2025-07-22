import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Navbar = () => {
    const [isProductOpen, setIsProductOpen] = useState(false);

    const toggleProduct = () => setIsProductOpen(!isProductOpen);

    return (
        <div className='bg-black sticky top-0 inset-0 backdrop-blur-2xl z-50'>
            <div className='w-11/12 mx-auto'>
                <div className="navbar shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            {/* Hamburger Icon */}
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost lg:hidden hover:bg-black hover:border-orange-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-black text-white rounded-box z-50 mt-3 w-64 p-2 shadow"
                            >
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={toggleProduct}
                                    >
                                        <span>Products</span>
                                        {isProductOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>

                                    {/* Submenu */}
                                    {isProductOpen && (
                                        <ul className="pl-4 pt-2">
                                            <li>
                                                <NavLink to="/products/mobile-phones">Mobile Phones</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/products/laptops-computers">Laptops & Computers</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/products/gadgets-accessories">Gadgets & Accessories</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/products/home-appliances">Home Appliances</NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                <li>
                                    <NavLink to="/deals">Deals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">About</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                        <NavLink to="/" className="btn btn-ghost text-xl">Digital<span className='text-orange-400'>Xpress</span></NavLink>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li>
                                <details>
                                    <summary>Products</summary>
                                    <ul className="p-2 w-60 bg-black">
                                        <li><NavLink to="/products/mobile-phones">Mobile Phones</NavLink></li>
                                        <li><NavLink to="/products/laptops-computers">Laptops & Computers</NavLink></li>
                                        <li><NavLink to="/products/gadgets-accessories">Gadgets & Mobile Accessories</NavLink></li>
                                        <li><NavLink to="/products/home-appliances">Home Appliances</NavLink></li>
                                    </ul>
                                </details>
                            </li>
                            <li><NavLink to="/deals">Deals</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                    <span className="badge badge-sm bg-black indicator-item">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-black z-1 mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold text-orange-400">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <NavLink to="/cart" className="btn btn-primary btn-block">View cart</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-2 dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border-2 border-orange-400">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <NavLink to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </NavLink>
                                </li>
                                <li><NavLink to="/settings">Settings</NavLink></li>
                                <li><NavLink to="/logout">Logout</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
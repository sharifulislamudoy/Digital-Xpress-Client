import React from 'react';
import '../Navbar/Navbar.css'
import { NavLink } from 'react-router';

const NavLinks = () => {
    return (
        <>
            <li><NavLink to="/" className="text-white hover:text-orange-400">Home</NavLink></li>
            <li><NavLink to="/products" className="text-white hover:text-orange-400">Products</NavLink></li>
            <li><NavLink to="/about" className="text-white hover:text-orange-400">About</NavLink></li>
            <li><NavLink to="/contact" className="text-white hover:text-orange-400">Contact</NavLink></li>
        </>
    );
};

export default NavLinks;
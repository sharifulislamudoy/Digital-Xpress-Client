import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import BackGround from '../../../assets/Hero-Image.png';

const Hero = () => {
    return (
        <div
            className='relative h-screen bg-cover bg-center flex items-center'
            style={{ backgroundImage: `url(${BackGround})` }}
        >
            {/* Overlay */}
            <div className='absolute inset-0 backdrop-blur-sm bg-black/40'></div>

            <div className='relative z-10 w-11/12 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10'>
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4  }}
                    className='text-white max-w-lg'
                >
                    <h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
                        Discover the Future of Digital Shopping
                    </h1>
                    <p className='text-md mb-6'>
                        Shop top-quality mobile phones, gadgets, accessories, and home appliances — all in one place.
                    </p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='relative mb-6'
                    >
                        <input
                            type='text'
                            placeholder='Search for products...'
                            className='w-full bg-white py-3 pl-5 pr-12 rounded-lg shadow-md focus:outline-none text-black'
                        />
                        <button className='absolute right-3 top-1/2 -translate-y-1/2 text-orange-500'>
                            <FaSearch size={20} />
                        </button>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition'
                    >
                        Explore Now
                    </motion.button>
                </motion.div>

                {/* Right section (can be used for an image or left empty for now) */}
                <div className='flex-1'></div>
            </div>
        </div>
    );
};

export default Hero;

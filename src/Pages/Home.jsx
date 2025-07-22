import React from 'react';
import { motion } from 'framer-motion';
import BackGround from '../assets/Hero-Image.png';

const Home = () => {
    return (
        <div
            className='relative h-screen bg-cover bg-center flex items-center'
            style={{ backgroundImage: `url(${BackGround})` }}
        >
            {/* Overlay */}
            <div className='absolute inset-0 bg-black/60'></div>

            <div className='relative z-10 w-11/12 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10'>
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='text-white max-w-xl'
                >
                    <h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
                        Discover the Future of Digital Shopping
                    </h1>
                    <p className='text-md mb-6'>
                        Shop top-quality mobile phones, gadgets, accessories, and home appliances — all in one place.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition'
                    >
                        Explore Now
                    </motion.button>
                </motion.div>
                <div className='flex-1'></div>
            </div>
        </div>
    );
};

export default Home;

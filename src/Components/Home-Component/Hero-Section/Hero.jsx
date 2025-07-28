import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMobileAlt, FaHeadphones, FaShoppingCart } from 'react-icons/fa';
import { BsSmartwatch, BsLaptop } from 'react-icons/bs';
import { GiProcessor } from 'react-icons/gi';
import BackGround from '../../../assets/Hero-Image.png';

const Hero = () => {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300); // 300ms delay for initial render
        return () => clearTimeout(timer);
    }, []);

    // Parallax effects
    const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const yDevices = useTransform(scrollYProgress, [0, 1], [0, 30]);

    // Floating animation with initial hidden state
    const floatingVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        float: {
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
            x: [0, 8, 0],
            rotate: [0, 3, -2, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
            }
        }
    };

    // Rotating animations with initial state
    const rotateVariants = {
        hidden: { opacity: 0, rotate: 0 },
        rotate: {
            opacity: 1,
            rotate: 360,
            transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear"
            }
        },
        rotateReverse: {
            opacity: 1,
            rotate: -360,
            transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    // Shopping cart animation
    const cartVariants = {
        hidden: { 
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0
        },
        animate: {
            opacity: 1,
            scale: [1, 1.05, 1],
            y: [0, -8, 0],
            rotateY: [0, 15, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5 // Additional delay for cart animation
            }
        }
    };

    // Device configuration
    const devices = [
        { icon: <FaMobileAlt className="text-blue-300 text-3xl" />, size: "w-14 h-14", delay: 0.2, bg: "bg-blue-500/20" },
        { icon: <BsLaptop className="text-purple-300 text-3xl" />, size: "w-14 h-14", delay: 0.4, bg: "bg-purple-500/20" },
        { icon: <BsSmartwatch className="text-green-300 text-2xl" />, size: "w-12 h-12", delay: 0.6, bg: "bg-green-500/20" },
        { icon: <FaHeadphones className="text-pink-300 text-2xl" />, size: "w-12 h-12", delay: 0.8, bg: "bg-pink-500/20" },
        { icon: <GiProcessor className="text-orange-300 text-2xl" />, size: "w-12 h-12", delay: 1.0, bg: "bg-orange-500/20" }
    ];

    return (
        <motion.div 
            ref={containerRef}
            className="relative h-screen pb-25 w-full overflow-hidden"
            style={{
                backgroundImage: `url(${BackGround})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            {/* Gradient overlay */}
            <motion.div 
                className="absolute backdrop-blur-sm inset-0 bg-gradient-to-b from-black/70 to-black/30"
                style={{ y: yBg }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 w-11/12 mx-auto">
                {/* Text content */}
                <motion.div 
                    className="text-white "
                    style={{ y: yText }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                    >
                        <span className="text-orange-500">Next Gen</span> Tech Shopping Experience
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg mb-8 text-gray-300"
                    >
                        Discover the latest gadgets and premium electronics with exclusive member benefits.
                    </motion.p>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative mb-8"
                    >
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-white/90 py-3 pl-5 pr-12 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600 transition">
                            <FaSearch size={20} />
                        </button>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
                        >
                            Shop Now
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-transparent border-2 border-white/30 hover:border-orange-400 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                        >
                            View Deals
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Animation section - only on large screens */}
                <motion.div 
                    className="hidden lg:flex relative w-full max-w-2xl h-full items-center justify-center"
                    style={{ y: yDevices }}
                >
                    {/* Glowing center - only animates after load */}
                    <AnimatePresence>
                        {isLoaded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: [0.8, 1, 0.8],
                                    scale: [1, 1.05, 1]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute w-40 h-40 bg-orange-500/20 rounded-full blur-xl"
                            />
                        )}
                    </AnimatePresence>

                    {/* Outer ring */}
                    <motion.div
                        // initial="hidden"
                        // animate={isLoaded ? "rotate" : "hidden"}
                        variants={rotateVariants}
                        className="absolute w-[26rem] h-[26rem] rounded-full border border-orange-400/20"
                    >
                        {/* Floating particles */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                // initial="hidden"
                                // animate={isLoaded ? "float" : "hidden"}
                                variants={floatingVariants}
                                transition={{ 
                                    delay: 0.3 + (i * 0.15),
                                    duration: 6 + (i * 0.3)
                                }}
                                className="absolute w-2 h-2 bg-orange-300/10 rounded-full shadow-lg"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${i * 30}deg) translateX(13rem) rotate(-${i * 30}deg)`
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Inner ring */}
                    <motion.div
                        initial="hidden"
                        animate={isLoaded ? "rotateReverse" : "hidden"}
                        variants={rotateVariants}
                        className="absolute w-[18rem] h-[18rem] rounded-full border border-orange-500/5"
                    />

                    {/* Floating devices */}
                    {devices.map((device, i) => {
                        const angle = (i * 72) * (Math.PI / 180);
                        const radius = 11;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                            <motion.div
                                key={i}
                                initial="hidden"
                                animate={isLoaded ? "float" : "hidden"}
                                variants={floatingVariants}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                                className={`absolute flex items-center justify-center ${device.size} rounded-xl ${device.bg} backdrop-blur-md border border-white/10 shadow-lg`}
                                style={{
                                    left: `calc(50% + ${x}rem)`,
                                    top: `calc(50% + ${y}rem)`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                {device.icon}
                            </motion.div>
                        );
                    })}

                    {/* Central cart icon - always visible but animates after load */}
                    <motion.div
                        initial="hidden"
                        animate={isLoaded ? "animate" : "hidden"}
                        variants={cartVariants}
                        className="absolute flex items-center justify-center w-20 h-20 rounded-xl bg-orange-500/20 backdrop-blur-md border border-orange-400/20"
                    >
                        <FaShoppingCart className="text-orange-300 text-4xl" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;
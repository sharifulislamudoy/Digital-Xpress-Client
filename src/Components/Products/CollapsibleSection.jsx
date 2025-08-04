import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-orange-400">{title}</h3>
                <button className="text-orange-400 focus:outline-none">
                    {isOpen ? '-' : '+'}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollapsibleSection;
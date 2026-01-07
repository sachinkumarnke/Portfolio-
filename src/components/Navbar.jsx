import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center bg-transparent backdrop-blur-sm">
            {/* Logo - Absolute Left */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 absolute left-6"
            >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold font-heading text-xl">
                    S
                </div>
                <span className="text-2xl font-bold font-heading text-white tracking-wide">Sachin</span>
            </motion.div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-8">
                <Link to="/" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">Home</Link>
                <a href="/#about" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">About</a>
                <a href="/#skills" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">Skills</a>
                <a href="/#experience" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">Experience</a>
                <Link to="/projects" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">Projects</Link>
                <a href="/#contact" className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium uppercase tracking-wider font-sans">Contact</a>
            </div>

            {/* Right Side - Reach Out Button */}
            <div className="hidden md:flex items-center gap-4 absolute right-6">
                <motion.a
                    href="#contact"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white px-6 py-2 rounded-full font-bold font-sans shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    Reach Out
                </motion.a>
            </div>

            {/* Mobile Menu Toggle - Absolute Right */}
            <div className="md:hidden flex items-center gap-4 absolute right-6">
                <motion.a
                    href="#contact"
                    className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white px-4 py-1.5 rounded-full font-bold font-sans text-sm"
                >
                    Reach Out
                </motion.a>
                <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-8 flex flex-col items-center gap-6 shadow-2xl"
                    >
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">Home</Link>
                        <a href="/#about" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">About</a>
                        <a href="/#skills" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">Skills</a>
                        <a href="/#experience" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">Experience</a>
                        <Link to="/projects" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">Projects</Link>
                        <a href="/#contact" onClick={() => setIsOpen(false)} className="text-white text-xl font-heading hover:text-teal-400 transition-colors">Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { FaYoutube, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="relative z-10 bg-black py-12 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-teal-900/20 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Name */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-wide font-['Bangers']"
            >
                Sachin Kumar
            </motion.h2>

            {/* Underline */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-8"
            ></motion.div>

            {/* Social Icons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-6 text-2xl text-gray-400 mb-8"
            >
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><FaYoutube /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><SiX /></a>
                <a href="https://www.linkedin.com/in/sachin-kumar-a85205231/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><FaLinkedin /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><FaInstagram /></a>
                <a href="https://github.com/sachinkumarnke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><FaGithub /></a>
            </motion.div>

            {/* Quote */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-teal-500/80 italic text-sm md:text-base mb-12 font-light tracking-wider"
            >
                "Success is when preparation meets opportunity"
            </motion.p>

            {/* Copyright */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-gray-600 text-xs"
            >
                © {new Date().getFullYear()} Sachin Kumar. All rights reserved. • <a href="/admin/login" className="hover:text-teal-500 transition-colors">Admin</a>
            </motion.p>
        </footer>
    );
};

export default Footer;

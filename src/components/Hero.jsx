import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative px-8 md:px-16 pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-teal-950">

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-start text-left"
                >
                    {/* Small Header with Cursor */}
                    <div className="overflow-hidden mb-6 flex items-center">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-xs md:text-sm text-teal-400 font-mono tracking-[0.25em] uppercase font-semibold"
                        >
                            AWS AND DEVOPS
                        </motion.h3>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                            className="w-0.5 h-5 bg-teal-400 ml-2"
                        ></motion.span>
                    </div>

                    {/* Main Heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="text-teal-400 block">Hello, I'm</span>
                        <span className="text-white block mt-2">Sachin</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        A fresher enthusiastic about Cloud Computing and DevOps. I have hands-on experience with
                        AWS, Docker, Kubernetes, Terraform, Jenkins, and Ansible. I enjoy configuring cloud infrastructure, automating
                        processes, and creating simple CI/CD pipelines.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45, 212, 191, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all"
                        >
                            View My Work
                        </motion.a>
                        <motion.a
                            href="/SACHIN KUMAR.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all"
                        >
                            My Resume
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-6 text-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <motion.a
                            href="#"
                            className="text-gray-500 hover:text-teal-400 transition-colors"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaYoutube />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-gray-500 hover:text-teal-400 transition-colors"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <SiX />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/sachin-kumar-a85205231/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-teal-400 transition-colors"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaLinkedin />
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-gray-500 hover:text-teal-400 transition-colors"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaInstagram />
                        </motion.a>
                        <motion.a
                            href="https://github.com/sachinkumarnke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-teal-400 transition-colors"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaGithub />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Column: 3D Character */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative flex justify-center items-center lg:justify-end"
                >
                    {/* Glowing Background Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-cyan-500/20 blur-[150px] rounded-full"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    ></motion.div>

                    {/* 3D Character with Floating Animation */}
                    <motion.img
                        src="/hero-robot.png"
                        alt="3D Developer Character"
                        className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Floating Particles Around Character */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-teal-400 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
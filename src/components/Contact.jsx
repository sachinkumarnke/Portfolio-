import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus(''), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            });
    };

    return (
        <section id="contact" className="py-24 bg-black relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Floating Astronaut */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full"></div>
                        <img
                            src="/Astra---BKFCAy.png"
                            alt="Astronaut playing guitar"
                            className="relative z-10 w-full max-w-md animate-float drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative"
                    >
                        {/* Background stars/dots effect could go here */}

                        <h2 className="text-4xl font-bold font-heading text-white mb-8">Let's Work Together</h2>

                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-400">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-400">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                                    placeholder="Your Email"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-400">Service Needed <span className="text-red-500">*</span></label>
                                <select
                                    name="service"
                                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled selected>Something in mind?</option>
                                    <option value="devops">DevOps & Automation</option>
                                    <option value="cloud">Cloud Infrastructure (AWS)</option>
                                    <option value="consulting">Consulting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-400">Idea <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-gray-600"
                                    placeholder="Enter your idea"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-blue-600/20"
                            >
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed to Send' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-teal-500/50 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-teal-500/50">
                                ✓
                            </div>
                            <h3 className="text-2xl font-bold text-white font-heading">Message Sent!</h3>
                            <p className="text-gray-300">Thanks for reaching out. I'll get back to you soon.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
};

export default Contact;

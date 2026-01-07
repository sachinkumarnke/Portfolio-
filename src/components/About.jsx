import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-black relative z-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl font-bold font-heading text-white mb-8">About <span className="text-teal-400">Me</span></h2>

                    <div className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans space-y-6">
                        <p>
                            I'm a <span className="text-white font-bold">DevOps Engineer</span> and <span className="text-white font-bold">Cloud Enthusiast</span> passionate about automating infrastructure and optimizing deployment pipelines.
                        </p>
                        <p>
                            My journey involves mastering cloud platforms like <span className="text-teal-400">AWS</span>, containerization with <span className="text-teal-400">Docker & Kubernetes</span>, and implementing robust CI/CD workflows using <span className="text-teal-400">Jenkins</span> and <span className="text-teal-400">GitHub Actions</span>.
                        </p>
                        <p>
                            I love turning complex operational challenges into streamlined, scalable, and secure solutions. When I'm not coding or configuring servers, I'm exploring the latest in cloud native technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5 hover:border-teal-400/30 transition-colors">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Experience</h4>
                            <p className="text-2xl font-bold text-white">Fresher</p>
                            <p className="text-sm text-gray-500">Ready to Deploy</p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5 hover:border-teal-400/30 transition-colors">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Focus</h4>
                            <p className="text-2xl font-bold text-white">Cloud & DevOps</p>
                            <p className="text-sm text-gray-500">AWS, K8s, CI/CD</p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5 hover:border-teal-400/30 transition-colors">
                            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Goal</h4>
                            <p className="text-2xl font-bold text-white">Automation</p>
                            <p className="text-sm text-gray-500">Scalable Infrastructure</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

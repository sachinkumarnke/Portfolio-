import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            if (!db) return;
            try {
                // Try to order by createdAt if it exists, otherwise default fetch
                const q = query(collection(db, "experiences"));
                const querySnapshot = await getDocs(q);
                const expList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Sort manually if needed or rely on query order
                // For now, let's just use the list as is, or sort by period/role if desired
                setExperiences(expList);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    return (
        <section id="experience" className="py-24 bg-black relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold font-heading text-teal-400 mb-4">Work Experience</h2>
                    <p className="text-xl text-gray-400 font-sans">My professional journey and contributions.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center text-gray-500">Loading experience...</div>
                    ) : experiences.length === 0 ? (
                        <div className="text-center text-gray-500">No experience listed yet.</div>
                    ) : (
                        experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-teal-500/30 transition-all hover:shadow-lg hover:shadow-teal-500/10 relative overflow-hidden group mb-6"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-cyan-600"></div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <FaBriefcase className="text-teal-400" />
                                            {exp.role}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            {exp.website && (
                                                <a
                                                    href={exp.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-teal-400 font-semibold hover:underline flex items-center gap-1"
                                                >
                                                    {exp.company} <FaExternalLinkAlt size={12} />
                                                </a>
                                            )}
                                            {!exp.website && <span className="text-teal-400 font-semibold">{exp.company}</span>}
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-400">{exp.period}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-lg leading-relaxed mb-6 whitespace-pre-line">
                                    {exp.description}
                                </p>

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 text-teal-300 rounded-full text-sm font-medium border border-white/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;

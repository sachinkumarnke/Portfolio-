import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const AllProjects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!db) {
                console.error("Firebase DB not initialized");
                setLoading(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjectsData(projectsList);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12">
            <div className="container mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-center mb-16 text-teal-400 font-heading"
                >
                    All Projects
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-teal-500/50 transition-all group"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <a href={project.githubLink} className="p-3 bg-white text-black rounded-full hover:bg-teal-400 transition-colors">
                                        <FaGithub size={20} />
                                    </a>
                                    <a href={project.liveLink} className="p-3 bg-white text-black rounded-full hover:bg-teal-400 transition-colors">
                                        <FaExternalLinkAlt size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-teal-400 text-sm font-mono mb-2">{project.category}</div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    to={`/project/${project.id}`}
                                    className="block w-full py-3 text-center border border-teal-500/30 rounded-lg text-teal-400 hover:bg-teal-500/10 transition-colors font-semibold"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProjects;

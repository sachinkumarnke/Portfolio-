import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!db) {
                console.error("Firebase DB not initialized");
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/" className="text-teal-400 hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 relative z-20">
            <div className="container mx-auto max-w-5xl">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-teal-400 mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative h-[50vh] w-full rounded-2xl overflow-hidden mb-12 border border-white/10">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <p className="text-teal-400 font-bold mb-2 uppercase tracking-wider">{project.category}</p>
                            <h1 className="text-4xl md:text-6xl font-bold font-heading">{project.title}</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold font-heading mb-4 text-white">Overview</h3>
                                <p className="text-gray-300 leading-relaxed text-lg font-sans whitespace-pre-line">
                                    {project.overview || project.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold font-heading mb-4 text-white">Key Features</h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 font-sans">
                                    {project.keyFeatures && project.keyFeatures.length > 0 ? (
                                        project.keyFeatures.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))
                                    ) : (
                                        <li>No specific features listed.</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                                <h3 className="text-xl font-bold font-heading mb-4 text-white">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, index) => (
                                        <span key={index} className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm font-medium border border-teal-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <a href={project.github} className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    <FaGithub /> View Code
                                </a>
                                <a href={project.demo} className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;

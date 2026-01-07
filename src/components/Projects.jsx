import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Projects = () => {
    const targetRef = useRef(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);

            if (!db) {
                setError("Firebase is not initialized. Check configuration.");
                setLoading(false);
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsList);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectClick = (id) => {
        navigate(`/project/${id}`);
    };

    if (loading) {
        return (
            <section id="projects" ref={targetRef} className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading Projects...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" ref={targetRef} className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section id="projects" ref={targetRef} className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-gray-400 text-xl text-center">
                    <p>No projects found.</p>
                    <p className="text-sm mt-2">Add projects via the Admin Panel.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" ref={targetRef} className="relative h-[300vh] bg-black z-10">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col md:flex-row h-full items-center">

                    {/* Left Side: Text */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center h-full z-20 p-8">
                        <h2 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">Selected<br /><span className="text-teal-400">Projects</span></h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-md font-sans">
                            Real-world implementations of DevOps principles and Cloud architecture. Click on a project to view details.
                        </p>
                    </div>

                    {/* Right Side: Horizontal Scroll Images */}
                    <div className="w-full md:w-2/3 h-full flex items-center overflow-hidden pl-4 md:pl-10">
                        <motion.div style={{ x }} className="flex gap-8 md:gap-12">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => handleProjectClick(project.id)}
                                    className="relative w-[85vw] md:w-[45vw] h-[50vh] md:h-[60vh] flex-shrink-0 bg-gray-900 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-teal-400/50 transition-colors"
                                >
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <h3 className="text-3xl font-bold text-white mb-2 font-heading">{project.title}</h3>
                                        <p className="text-teal-400 font-medium mb-3 font-sans">{project.category}</p>
                                        <p className="text-gray-300 text-sm leading-relaxed max-w-sm font-sans">{project.description}</p>
                                        <span className="inline-block mt-4 text-teal-400 text-sm font-bold uppercase tracking-wider border-b border-teal-400 pb-1">View Case Study</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;

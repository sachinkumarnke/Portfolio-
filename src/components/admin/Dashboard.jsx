import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaLayerGroup, FaProjectDiagram, FaCode, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            if (!db) return;
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsList);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        console.log("Attempting to delete project with ID:", id);
        if (!db) {
            alert("Database not initialized!");
            return;
        }
        if (window.confirm("Are you sure you want to delete this project?")) {
            console.log("User confirmed delete.");
            try {
                console.log("Calling deleteDoc...");
                await deleteDoc(doc(db, "projects", id));
                console.log("deleteDoc successful. Updating state...");
                setProjects(projects.filter(project => project.id !== id));
                alert("Project deleted successfully!");
            } catch (error) {
                console.error("Error deleting project:", error);
                alert("Failed to delete project. Error: " + error.message);
            }
        } else {
            console.log("User cancelled delete.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    // Calculate Stats
    const totalProjects = projects.length;
    const categories = [...new Set(projects.map(p => p.category))].length;
    const totalTech = [...new Set(projects.flatMap(p => p.techStack || []))].length;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500 selection:text-black pb-20">
            {/* Top Navigation Bar */}
            <nav className="bg-gray-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/20">
                            A
                        </div>
                        <span className="text-xl font-bold tracking-wide">Admin<span className="text-teal-400">Panel</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-400 text-sm hidden md:inline">Welcome back, Admin</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-semibold bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500/20"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
                        <p className="text-gray-400">Manage your portfolio projects and content.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/admin/experiences"
                            className="group flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-gray-700 transition-all"
                        >
                            <FaBriefcase /> Manage Experience
                        </Link>
                        <Link
                            to="/admin/project/new"
                            className="group flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all"
                        >
                            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform">
                                <FaPlus size={12} />
                            </div>
                            Add New Project
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatsCard icon={<FaProjectDiagram />} title="Total Projects" value={totalProjects} color="from-blue-500 to-indigo-600" />
                    <StatsCard icon={<FaLayerGroup />} title="Categories" value={categories} color="from-purple-500 to-pink-600" />
                    <StatsCard icon={<FaCode />} title="Tech Stack Items" value={totalTech} color="from-orange-500 to-red-600" />
                </div>

                {/* Projects Grid */}
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
                    Recent Projects
                </h2>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-gray-400 text-lg mb-4">No projects found.</p>
                        <Link to="/admin/project/new" className="text-teal-400 hover:underline">Create your first project</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-teal-500/30 transition-all hover:shadow-2xl hover:shadow-teal-900/20 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-teal-400 border border-white/10">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors line-clamp-1">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">{project.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/admin/project/edit/${project.id}`}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                                title="Edit Project"
                                            >
                                                <FaEdit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete Project"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                        <Link to={`/project/${project.id}`} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider">
                                            View Live
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatsCard = ({ icon, title, value, color }) => (
    <div className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex items-center gap-6 hover:bg-gray-800/40 transition-colors">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
    </div>
);

export default Dashboard;

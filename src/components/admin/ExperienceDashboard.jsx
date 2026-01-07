import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaBriefcase, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ExperienceDashboard = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExperiences = async () => {
            if (!db) return;
            try {
                const querySnapshot = await getDocs(collection(db, "experiences"));
                const expList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort by createdAt if available, otherwise by period (simple string sort for now)
                setExperiences(expList);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const handleDelete = async (id) => {
        if (!db) return;
        if (window.confirm("Are you sure you want to delete this experience?")) {
            try {
                await deleteDoc(doc(db, "experiences", id));
                setExperiences(experiences.filter(exp => exp.id !== id));
                alert("Experience deleted successfully!");
            } catch (error) {
                console.error("Error deleting experience:", error);
                alert("Failed to delete experience. Error: " + error.message);
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500 selection:text-black pb-20">
            {/* Top Navigation Bar */}
            <nav className="bg-gray-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                            <FaArrowLeft /> Back to Dashboard
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-400 text-sm hidden md:inline">Admin Panel</span>
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
                        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <FaBriefcase className="text-teal-400" /> Experience Manager
                        </h1>
                        <p className="text-gray-400">Manage your work history and roles.</p>
                    </div>
                    <Link
                        to="/admin/experience/new"
                        className="group flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all"
                    >
                        <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform">
                            <FaPlus size={12} />
                        </div>
                        Add New Role
                    </Link>
                </div>

                {/* Experience List */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading experiences...</div>
                ) : experiences.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-gray-400 text-lg mb-4">No experience entries found.</p>
                        <Link to="/admin/experience/new" className="text-teal-400 hover:underline">Add your first role</Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-teal-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                    <div className="text-teal-400 font-medium mb-2">{exp.company}</div>
                                    <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">{exp.description}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        to={`/admin/experience/edit/${exp.id}`}
                                        className="p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <FaEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(exp.id)}
                                        className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceDashboard;

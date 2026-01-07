import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaArrowLeft, FaSave, FaImage, FaCode, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        overview: '',
        keyFeatures: '',
        image: '',
        techStack: '',
        githubLink: '',
        liveLink: ''
    });

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                if (!db) return;
                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        ...data,
                        techStack: data.techStack ? data.techStack.join(', ') : '',
                        keyFeatures: data.keyFeatures ? data.keyFeatures.join('\n') : ''
                    });
                }
            };
            fetchProject();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db) {
            alert("Firebase DB not initialized");
            return;
        }
        setLoading(true);
        const projectData = {
            ...formData,
            techStack: formData.techStack.split(',').map(item => item.trim()),
            keyFeatures: formData.keyFeatures.split('\n').filter(item => item.trim() !== '')
        };

        try {
            if (id) {
                await updateDoc(doc(db, "projects", id), projectData);
            } else {
                await addDoc(collection(db, "projects"), projectData);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error saving project: ", error);
            alert("Failed to save project. Error: " + error.message + "\n\nCheck your Firestore Security Rules if this persists.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 flex justify-center">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-3 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{id ? 'Edit Project' : 'Create New Project'}</h1>
                        <p className="text-gray-400 text-sm">Fill in the details below to showcase your work.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 space-y-6">
                            <h2 className="text-xl font-bold text-teal-400 mb-4 border-b border-white/5 pb-2">Project Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Project Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                    placeholder="e.g. Automated CI/CD Pipeline"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Description (Short Summary)</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600 resize-none"
                                    placeholder="Brief summary for the card view..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Detailed Overview</label>
                                <textarea
                                    name="overview"
                                    value={formData.overview}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600 resize-none"
                                    placeholder="Full project details, context, and problem solved..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Key Features (One per line)</label>
                                <textarea
                                    name="keyFeatures"
                                    value={formData.keyFeatures}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600 resize-none"
                                    placeholder="Automated Scaling&#10;Real-time Monitoring&#10;Secure Authentication"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tech Stack</label>
                                <div className="relative">
                                    <FaCode className="absolute left-4 top-4 text-gray-500" />
                                    <input
                                        name="techStack"
                                        value={formData.techStack}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                        placeholder="React, Node.js, AWS, Docker (comma separated)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Media & Links */}
                    <div className="space-y-6">
                        <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 space-y-6">
                            <h2 className="text-xl font-bold text-teal-400 mb-4 border-b border-white/5 pb-2">Media & Links</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="DevOps & Automation">DevOps & Automation</option>
                                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Project Image</label>
                                <div className="space-y-4">
                                    {/* File Input */}


                                    {/* URL Fallback / Display */}
                                    <div className="relative">
                                        <FaImage className="absolute left-4 top-4 text-gray-500" />
                                        <input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                            placeholder="Or paste image URL here..."
                                        />
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 h-40">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">GitHub Repository</label>
                                    <div className="relative">
                                        <FaGithub className="absolute left-4 top-4 text-gray-500" />
                                        <input
                                            name="githubLink"
                                            value={formData.githubLink}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Live Demo</label>
                                    <div className="relative">
                                        <FaExternalLinkAlt className="absolute left-4 top-4 text-gray-500" />
                                        <input
                                            name="liveLink"
                                            value={formData.liveLink}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <FaSave />
                            {loading ? 'Saving Project...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;

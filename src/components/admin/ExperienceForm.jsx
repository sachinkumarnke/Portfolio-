import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaBriefcase } from 'react-icons/fa';

const ExperienceForm = () => {
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        website: '',
        period: '',
        description: '',
        technologies: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchExperience = async () => {
                if (!db) return;
                const docRef = doc(db, "experiences", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        ...data,
                        technologies: data.technologies ? data.technologies.join(', ') : ''
                    });
                }
            };
            fetchExperience();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!db) {
            alert("Database not initialized!");
            setLoading(false);
            return;
        }

        try {
            const experienceData = {
                ...formData,
                technologies: formData.technologies.split(',').map(item => item.trim()).filter(item => item !== ''),
                createdAt: new Date().toISOString() // Simple timestamp for sorting
            };

            if (id) {
                await updateDoc(doc(db, "experiences", id), experienceData);
                alert("Experience updated successfully!");
            } else {
                await addDoc(collection(db, "experiences"), experienceData);
                alert("Experience added successfully!");
            }
            navigate('/admin/experiences');
        } catch (error) {
            console.error("Error saving experience:", error);
            alert("Error saving experience: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500 selection:text-black pb-20">
            <nav className="bg-gray-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <Link to="/admin/experiences" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                        <FaArrowLeft /> Back to Experience Manager
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <FaBriefcase className="text-teal-400" />
                            {id ? 'Edit Experience' : 'Add New Experience'}
                        </h1>
                        <p className="text-gray-400 mt-2">Add details about your professional role.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Role / Job Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="e.g. DevOps Engineer"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="e.g. SoftIndia"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Company Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Time Period</label>
                                <input
                                    type="text"
                                    name="period"
                                    value={formData.period}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="e.g. Jan 2023 - Present"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors h-32"
                                placeholder="Describe your responsibilities and achievements..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Technologies Used (Comma separated)</label>
                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                placeholder="e.g. AWS, Docker, React, Node.js"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <FaSave /> Save Experience
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExperienceForm;

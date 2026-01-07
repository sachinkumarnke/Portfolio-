import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaDocker, FaLinux, FaPython, FaGitAlt, FaJenkins } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiGnubash } from 'react-icons/si';

const skills = [
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Kubernetes', icon: <SiKubernetes /> },
    { name: 'Terraform', icon: <SiTerraform /> },
    { name: 'Jenkins', icon: <FaJenkins /> },
    { name: 'Linux', icon: <FaLinux /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Bash', icon: <SiGnubash /> },
    { name: 'Ansible', icon: <SiAnsible /> },
    { name: 'Prometheus', icon: <SiPrometheus /> },
    { name: 'Grafana', icon: <SiGrafana /> },
    { name: 'Git', icon: <FaGitAlt /> },
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-black relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-5xl font-bold font-heading text-teal-400 mb-4">My Skills</h2>
                <p className="text-xl text-gray-400 font-sans">Cloud Infrastructure | DevOps Tools | Automation</p>
            </div>

            <div className="flex overflow-hidden w-full mask-gradient">
                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 20,
                        repeat: Infinity,
                    }}
                    style={{ width: "fit-content" }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 text-gray-400 hover:text-teal-400 transition-colors min-w-max cursor-pointer group">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                            <span className="text-xl font-semibold font-sans">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

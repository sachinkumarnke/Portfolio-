import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import ProjectDetails from './components/ProjectDetails';
import CustomCursor from './components/CustomCursor';
import AllProjects from './components/AllProjects';
import Footer from './components/Footer';

import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProjectForm from './components/admin/ProjectForm';
import ExperienceDashboard from './components/admin/ExperienceDashboard';
import ExperienceForm from './components/admin/ExperienceForm';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-teal-500 selection:text-black">
      <ParticlesBackground />

      <Navbar />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
        } />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<AllProjects />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/project/new" element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/project/edit/:id" element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/experiences" element={
          <ProtectedRoute>
            <ExperienceDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/experience/new" element={
          <ProtectedRoute>
            <ExperienceForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/experience/edit/:id" element={
          <ProtectedRoute>
            <ExperienceForm />
          </ProtectedRoute>
        } />
      </Routes>

      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;

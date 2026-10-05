/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { ContentCreator } from './components/ContentCreator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { CVModal } from './components/CVModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [isCVOpen, setIsCVOpen] = useState(false);

  const handleOpenRequest = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setIsRequestOpen(true);
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#080b12] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
        
        {/* Full Page Floating Particle & Code Glow Ambient Background */}
        <AnimatedBackground />

        {/* Sticky Header Navbar */}
        <Navbar 
          onOpenAdmin={() => setIsAdminOpen(true)}
          onRequestProject={() => handleOpenRequest()}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero 
            onOpenRequest={() => handleOpenRequest()}
            onOpenCV={() => setIsCVOpen(true)}
          />

          {/* 2. About Me Section */}
          <About 
            onOpenCV={() => setIsCVOpen(true)}
          />

          {/* 3. Skills Section */}
          <Skills />

          {/* 4. Projects Showcase */}
          <Projects />

          {/* 5. Services Section */}
          <Services 
            onSelectService={(service) => handleOpenRequest(service)}
          />

          {/* 6. Content Creator Profile */}
          <ContentCreator />

          {/* 7. Contact Section */}
          <Contact 
            onRequestProject={() => handleOpenRequest()}
          />
        </main>

        {/* Footer */}
        <Footer 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Interactive Modals */}
        <ProjectRequestModal
          isOpen={isRequestOpen}
          onClose={() => {
            setIsRequestOpen(false);
            setSelectedService(undefined);
          }}
          initialService={selectedService}
        />

        <CVModal
          isOpen={isCVOpen}
          onClose={() => setIsCVOpen(false)}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

      </div>
    </PortfolioProvider>
  );
}

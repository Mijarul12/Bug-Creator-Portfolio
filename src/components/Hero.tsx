import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Flame, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download,
  Github,
  Play,
  User,
  Zap,
  Bot
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatedDeveloperMan } from './AnimatedDeveloperMan';

interface HeroProps {
  onOpenRequest: () => void;
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRequest, onOpenCV }) => {
  const { profile } = usePortfolio();
  const [viewMode, setViewMode] = useState<'character' | 'terminal'>('character');
  const [activeTab, setActiveTab] = useState<'app' | 'android' | 'rules'>('app');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    app: `// Bug Creator Core Engine
import { Developer } from '@bug-creator/ecosystem';

export const mijarulRahaman: Developer = {
  name: "${profile.name || 'Mijarul Rahaman'}",
  role: "Fullstack & Android Engineer",
  specialties: [
    "High-Performance Web Apps",
    "Native & Cross-Platform Android",
    "Firebase Firestore Architecture",
    "Creative Interactive UI/UX"
  ],
  status: "Available for new client projects",
  build: async (idea) => {
    const product = await engineerProduct(idea, {
      speed: "blazing-fast",
      design: "pixel-perfect",
      security: "zero-trust"
    });
    return product.shipToProduction();
  }
};`,
    android: `// Native Android Engine
package com.bugcreator.apps

class ProductionApp : Application() {
  override fun onCreate() {
    super.onCreate()
    initializeFirebase()
    setupOfflineCaching()
    enableHardwareAcceleration()
  }

  fun launchCleanExperience() {
    val ui = ComposeLayout.Builder()
      .withGlassmorphism()
      .withZeroLagAudio()
      .build()
    startActivity(ui)
  }
}`,
    rules: `// Zero-Trust Security Fortress
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /projects/{projectId} {
      allow read: if true;
      allow write: if isAdmin() && isValidProject();
    }
    match /clientRequests/{id} {
      allow create: if isValidRequest();
      allow read, update: if isAdmin();
    }
  }
}`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
      {/* Background Grid & Pulsing Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand & Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill with pulsing green beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono shadow-sm animate-float-slow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Client Projects & Contract</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Web & Android</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-mono text-sm tracking-wider text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  [ Bug Creator ]
                </span>
                <span className="h-px w-10 bg-cyan-500/40"></span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{profile.name || 'Mijarul Rahaman'}</span>
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-slate-300 font-display">
                {profile.tagline || 'I Build Apps, Websites & Digital Experiences.'}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile.bio || 'Passionate developer and content creator behind Bug Creator. Turning visionary concepts into functional, visually magnetic, and production-grade applications.'}
            </p>

            {/* CTA Buttons with hover glows */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 group cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenRequest}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700/80 hover:border-cyan-500/50 shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Request a Project</span>
              </button>

              <button
                onClick={onOpenCV}
                className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer hover:text-cyan-400"
              >
                <Download className="w-4 h-4" />
                <span>View CV</span>
              </button>
            </div>

            {/* Live Stats Row with Animated Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
              <div className="space-y-0.5 group cursor-default">
                <div className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">{profile.yearsExperience || '3+ Years'}</div>
                <div className="text-xs text-slate-400 font-mono">Experience</div>
              </div>
              <div className="space-y-0.5 group cursor-default">
                <div className="text-2xl font-bold font-display text-cyan-400 group-hover:scale-105 transition-transform">{profile.completedProjects || '25+ Built'}</div>
                <div className="text-xs text-slate-400 font-mono">Projects</div>
              </div>
              <div className="space-y-0.5 group cursor-default">
                <div className="text-2xl font-bold font-display text-emerald-400 group-hover:scale-105 transition-transform">{profile.happyClients || '100%'}</div>
                <div className="text-xs text-slate-400 font-mono">Client Delight</div>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Developer Man & Interactive Cyber Sandbox */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* View Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-4 z-20">
              <button
                onClick={() => setViewMode('character')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'character'
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Animated Character</span>
              </button>
              <button
                onClick={() => setViewMode('terminal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'terminal'
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Code Sandbox</span>
              </button>
            </div>

            {/* Display Mode 1: Animated Developer Man Character */}
            {viewMode === 'character' ? (
              <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
                <AnimatedDeveloperMan />

                {/* Subtitle card */}
                <div className="mt-6 w-full max-w-sm p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-mono text-slate-300">Mijarul Rahaman • Active</span>
                  </div>
                  <button 
                    onClick={() => setViewMode('terminal')}
                    className="text-cyan-400 hover:underline font-mono text-[11px]"
                  >
                    View Code →
                  </button>
                </div>
              </div>
            ) : (
              /* Display Mode 2: Interactive Terminal Window */
              <div className="w-full relative rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-2xl shadow-cyan-950/20 overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0e1322] border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">bug-creator-ide</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={copyCode}
                      className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Code Tabs */}
                <div className="flex items-center border-b border-slate-800/80 bg-[#090d16] px-2 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('app')}
                    className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === 'app'
                        ? 'border-cyan-400 text-cyan-300 bg-slate-900/40'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <Terminal className="w-3 h-3" />
                    <span>bug_creator.ts</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('android')}
                    className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === 'android'
                        ? 'border-cyan-400 text-cyan-300 bg-slate-900/40'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>MainActivity.kt</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('rules')}
                    className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === 'rules'
                        ? 'border-cyan-400 text-cyan-300 bg-slate-900/40'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>firestore.rules</span>
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 sm:p-5 text-xs font-mono overflow-x-auto text-slate-300 max-h-[360px] leading-relaxed">
                  <pre>
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-[#090d16] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>TypeScript 5.8 • Android Compose • Firestore</span>
                  </div>
                  <div className="text-cyan-400">UTF-8</div>
                </div>

              </div>
            )}

            {/* Floating Accents */}
            <div className="absolute -bottom-4 -left-4 bg-slate-900/90 border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md hidden sm:flex z-20 animate-float">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Fullstack Architecture</p>
                <p className="text-slate-400 text-[11px]">React 19 + Android + Cloud</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

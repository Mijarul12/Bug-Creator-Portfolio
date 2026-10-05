import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Tag
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const featuresList = (project.features || '')
    .split('\n')
    .map(f => f.trim())
    .filter(Boolean)
    .flatMap(f => f.split(',').map(s => s.trim()))
    .filter(Boolean);

  const techList = (project.technologies || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Coming Soon':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#0d121f] border border-slate-800 shadow-2xl shadow-cyan-950/30 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
          <img
            src={project.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80'}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-[#0d121f]/50 to-transparent" />
          
          {/* Header Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-slate-900/90 text-cyan-300 font-mono text-xs border border-slate-700/80 backdrop-blur-md">
                {project.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border backdrop-blur-md ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            {project.createdAt && (
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{project.createdAt}</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Title & Short Description */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Problem & Solution (If provided) */}
          {(project.problemStatement || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {project.problemStatement && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Engineered Solution</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {featuresList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Core Capabilities & Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featuresList.map((feat, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technologies & Tools</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {techList.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

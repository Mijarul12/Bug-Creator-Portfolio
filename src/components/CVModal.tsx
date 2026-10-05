import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  MapPin, 
  Mail, 
  Phone, 
  Code2, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Award,
  CheckCircle2,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { profile, skills, projects } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#0f1422] border border-slate-800 shadow-2xl shadow-cyan-950/40 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Curriculum Vitae — {profile.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content Document */}
        <div className="p-8 sm:p-12 space-y-8 max-h-[75vh] overflow-y-auto bg-[#0a0e1a] text-slate-200">
          
          {/* Header Title Block */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
                {profile.name}
              </h1>
              <p className="text-cyan-400 font-mono text-sm font-semibold">
                Lead Engineer & Creator at Bug Creator | Web & Android Specialist
              </p>
              <p className="text-xs text-slate-400 max-w-xl pt-1">
                {profile.bio}
              </p>
            </div>

            <div className="space-y-1 text-xs font-mono text-slate-300 border-l border-slate-800 pl-4 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
              <Code2 className="w-4 h-4" />
              <span>Core Technical Skills</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {skills.map((s) => (
                <div key={s.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="font-semibold text-white truncate">{s.name}</div>
                  <div className="text-[10px] font-mono text-cyan-400">{s.level}% Proficiency</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Featured Projects */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
              <Layers className="w-4 h-4" />
              <span>Key Software Projects</span>
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    <strong className="text-slate-300">Tech:</strong> {proj.technologies}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </h2>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-white">Founder & Lead Engineer</strong>
                  <span className="text-[10px] font-mono text-cyan-400">2023 - Present</span>
                </div>
                <p className="text-[11px] text-slate-400">Bug Creator Development & Media</p>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  Delivered 25+ responsive web apps and Android tools. Maintained 99.9% uptime, optimized client acquisition systems, and produced programming tutorials.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Certification</span>
              </h2>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-white">Computer Science & Application</strong>
                  <span className="text-[10px] font-mono text-cyan-400">Completed</span>
                </div>
                <p className="text-[11px] text-slate-400">Software Engineering Foundations</p>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  Specialized in Data Structures, Relational/NoSQL Database Design, Mobile Architectures, and Web Protocols.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  Smartphone, 
  Server, 
  Database, 
  Flame, 
  Layout, 
  PlugZap, 
  Bot, 
  Palette, 
  Layers,
  Atom,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend & DB', 'Mobile & Apps', 'Core & Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  // Icon resolver
  const renderSkillIcon = (iconName: string, name: string) => {
    const iconClass = "w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200";
    if (name.includes('React') || iconName === 'Atom') return <Atom className={iconClass} />;
    if (name.includes('Android') || iconName === 'Smartphone') return <Smartphone className={iconClass} />;
    if (name.includes('Firebase') || iconName === 'Flame') return <Flame className={iconClass} />;
    if (name.includes('Node') || iconName === 'Server') return <Server className={iconClass} />;
    if (name.includes('Database') || iconName === 'Database') return <Database className={iconClass} />;
    if (name.includes('API') || iconName === 'PlugZap') return <PlugZap className={iconClass} />;
    if (name.includes('AI') || iconName === 'Bot') return <Bot className={iconClass} />;
    if (name.includes('Design') || iconName === 'Layout') return <Layout className={iconClass} />;
    if (name.includes('CSS') || iconName === 'Palette') return <Palette className={iconClass} />;
    return <Code2 className={iconClass} />;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Skills & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-base">
            Modern tools, frameworks, and programming architectures I employ to construct dependable, lightning-fast digital products.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-950/20 backdrop-blur-sm flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Card Top: Icon, Name, Category & Percentage */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:border-cyan-500/30 transition-colors">
                      {renderSkillIcon(skill.icon, skill.name)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
                    {skill.level}%
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-slate-300">{skill.level >= 90 ? 'Advanced / Production' : 'Proficient'}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Always Learning & Leveling Up</h4>
              <p className="text-xs text-slate-400">Continuously integrating emerging technologies like Android Compose, AI Grounding, and edge runtimes.</p>
            </div>
          </div>

          <a
            href="#projects"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0"
          >
            See Them in Action
          </a>
        </div>

      </div>
    </section>
  );
};

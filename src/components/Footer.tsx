import React from 'react';
import { 
  Code2, 
  Github, 
  Youtube, 
  Instagram, 
  Linkedin, 
  ArrowUp, 
  Heart,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { profile, socialLinks, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('youtube')) return <Youtube className="w-4 h-4" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (p.includes('github')) return <Github className="w-4 h-4" />;
    if (p.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    return <Code2 className="w-4 h-4" />;
  };

  return (
    <footer className="relative bg-[#06080e] border-t border-slate-900 pt-16 pb-12 overflow-hidden text-slate-400">
      
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight">Bug Creator</span>
                <p className="text-xs text-slate-400">{profile.name || 'Mijarul Rahaman'}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {profile.tagline || 'Building Apps, Websites & Digital Experiences.'}
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors"
                  title={s.platform}
                >
                  {getSocialIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About Mijarul</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills & Stack</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">Development Services</a>
              </li>
              <li>
                <a href="#content" className="hover:text-cyan-400 transition-colors">Content & Tutorials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Developer</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & Admin (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Developer Ecosystem
            </h4>
            <p className="text-xs text-slate-400">
              Direct Inquiries: <a href={`mailto:${profile.email}`} className="text-cyan-400 font-mono">{profile.email}</a>
            </p>
            <p className="text-xs text-slate-400">
              Location: {profile.location}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
              >
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isAdmin ? 'Admin Console Active' : 'Admin Login (Mijarul)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Bug Creator — Mijarul Rahaman. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <span>Built with React 19, Tailwind & Firebase</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

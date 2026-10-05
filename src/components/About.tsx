import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Send, 
  Code2, 
  Terminal, 
  CheckCircle, 
  Sparkles,
  Award,
  Cpu,
  Layers,
  User,
  Zap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatedDeveloperMan } from './AnimatedDeveloperMan';

interface AboutProps {
  onOpenCV: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCV }) => {
  const { profile } = usePortfolio();
  const [displayAvatar, setDisplayAvatar] = useState<'animated' | 'photo'>('animated');

  const specialties = [
    {
      title: 'Fullstack Web Engineering',
      desc: 'High-speed React, Vite, Next.js, and TypeScript web applications with serverless micro-backends.'
    },
    {
      title: 'Custom Android Development',
      desc: 'Native Android apps using Kotlin, Jetpack libraries, background services, and real-time syncing.'
    },
    {
      title: 'Firebase & Cloud Architecture',
      desc: 'Firestore NoSQL design, zero-trust security rules, multi-tenant databases, and authentication.'
    },
    {
      title: 'UI/UX & Interactive Design',
      desc: 'Modern dark developer interfaces, glassmorphism, micro-animations, and responsive layouts.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/50 border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About The Creator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Crafting Digital Solutions with <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Passion & Precision</span>
          </h2>
          <p className="text-slate-400 text-base">
            Get to know the developer behind Bug Creator and how I turn technical challenges into sleek digital reality.
          </p>
        </div>

        {/* Two-column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Profile Card & Photo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              
              {/* Animated Gradient Glow Border */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 backdrop-blur-xl space-y-5">
                
                {/* Image & Animated Character Container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-700/60 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 flex items-center justify-center p-2">
                  
                  {/* Mode Toggle Switcher on top */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 p-0.5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-md">
                    <button
                      onClick={() => setDisplayAvatar('animated')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                        displayAvatar === 'animated'
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Animated Laughing Boy Character"
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-400" />
                      <span>Laughing Boy 😄</span>
                    </button>
                    <button
                      onClick={() => setDisplayAvatar('photo')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                        displayAvatar === 'photo'
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Real Profile Photo"
                    >
                      <User className="w-2.5 h-2.5" />
                      <span>Photo</span>
                    </button>
                  </div>

                  {/* Animated Laughing Boy Character View (Active by default) */}
                  {displayAvatar === 'animated' ? (
                    <div className="w-full h-full flex items-center justify-center pt-3 animate-in fade-in duration-300">
                      <AnimatedDeveloperMan size="md" showBubble={false} showTokens={true} initialLaughing={true} />
                    </div>
                  ) : (
                    /* Real Photo View */
                    <div className="relative w-full h-full animate-in fade-in duration-300">
                      <img
                        src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80'}
                        alt={profile.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    </div>
                  )}
                  
                  {/* Floating Animated Badges */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-[10px] font-mono text-cyan-300 animate-float z-10">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span>Bug Creator</span>
                  </div>

                  {/* Floating Badge on Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs z-10">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-cyan-300 font-mono text-[10px]">
                      Lead Software Engineer
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Online</span>
                    </span>
                  </div>
                </div>

                {/* Profile Snapshot Info */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">{profile.name}</h3>
                      <p className="text-xs text-cyan-400 font-mono">Software Engineer & Creator</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
                      West Bengal, IN
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{profile.location || 'Kolkata, West Bengal, India'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-mono">{profile.email || 'mijarulkhkh@gmail.com'}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-mono">{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions inside card */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={onOpenCV}
                      className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Curriculum Vitae</span>
                    </button>
                    <a
                      href="#contact"
                      className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Direct Contact</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Right: Detailed Bio & Specialties */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white font-display">
                Developing Next-Gen Apps With Modern Technology
              </h3>
              
              <div className="text-slate-300 space-y-3 leading-relaxed text-sm sm:text-base">
                <p>
                  I am <strong className="text-white font-semibold">{profile.name}</strong>, a developer passionate about building modern websites, applications, and digital experiences. I work with modern development technologies and enjoy turning ideas into functional and visually engaging digital products.
                </p>
                <p className="text-slate-400">
                  Through my developer brand <strong className="text-cyan-400">Bug Creator</strong>, I have engineered numerous community platforms, Islamic mobile utilities, logic games, and enterprise websites. I strive for clean architecture, high responsiveness, and secure cloud integration using Firebase.
                </p>
              </div>
            </div>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {specialties.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Developer Highlights Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-indigo-950/30 border border-cyan-800/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Fullstack & Android Ready</h5>
                  <p className="text-xs text-slate-400">Available for freelance contracts, full builds, and consultation</p>
                </div>
              </div>

              <a
                href="#contact"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm"
              >
                Let's Talk
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

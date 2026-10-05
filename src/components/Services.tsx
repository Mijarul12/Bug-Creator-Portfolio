import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Building2, 
  ShoppingBag, 
  Flame, 
  Globe, 
  Smartphone, 
  Layers, 
  Wrench,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = usePortfolio();

  const getServiceIcon = (iconName: string, title: string) => {
    const iconClass = "w-6 h-6 text-cyan-400";
    if (title.includes('Portfolio') || iconName === 'UserCheck') return <UserCheck className={iconClass} />;
    if (title.includes('Business') || iconName === 'Building2') return <Building2 className={iconClass} />;
    if (title.includes('E-commerce') || iconName === 'ShoppingBag') return <ShoppingBag className={iconClass} />;
    if (title.includes('Landing') || iconName === 'Flame') return <Flame className={iconClass} />;
    if (title.includes('Web App') || iconName === 'Globe') return <Globe className={iconClass} />;
    if (title.includes('Android') || iconName === 'Smartphone') return <Smartphone className={iconClass} />;
    if (title.includes('Firebase') || iconName === 'Layers') return <Layers className={iconClass} />;
    return <Wrench className={iconClass} />;
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Development Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Services & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-slate-400 text-base">
            From modern responsive websites to enterprise Firebase cloud backends and native Android apps, I craft solutions engineered to deliver results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const features = (service.features || '')
              .split('\n')
              .map(f => f.trim())
              .filter(Boolean);

            return (
              <div
                key={service.id}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Icon & Turnaround Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/80 group-hover:border-cyan-500/40 transition-colors">
                      {getServiceIcon(service.icon, service.title)}
                    </div>
                    {service.turnaround && (
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{service.turnaround}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  {features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      {features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

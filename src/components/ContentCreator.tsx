import React, { useState } from 'react';
import { 
  Sparkles, 
  Youtube, 
  Instagram, 
  Play, 
  ExternalLink, 
  Video, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  Tv
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ContentItem } from '../types';

export const ContentCreator: React.FC = () => {
  const { contentItems, socialLinks } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(null);

  const youtubeLink = socialLinks.find(s => s.platform.toLowerCase().includes('youtube'))?.url || 'https://youtube.com/@bugcreator';
  const instagramLink = socialLinks.find(s => s.platform.toLowerCase().includes('instagram'))?.url || 'https://instagram.com/bugcreator_dev';

  return (
    <section id="content" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-900">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-950/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>Content Creator Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Follow My <span className="bg-gradient-to-r from-red-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Coding Journey</span>
          </h2>
          <p className="text-slate-400 text-base">
            Watch real-world fullstack coding sessions, Android app speedruns, UI tutorials, and architectural breakdowns on YouTube and Instagram.
          </p>

          {/* Social Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Subscribe on YouTube</span>
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 border border-pink-500/30 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentItems.map((item) => {
            const isYT = item.platform.toLowerCase().includes('youtube');

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-cyan-950/20 hover:-translate-y-1.5"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setSelectedVideo(item)}>
                    <img
                      src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Platform Tag */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold flex items-center gap-1 backdrop-blur-md ${
                        isYT 
                          ? 'bg-red-950/80 text-red-300 border border-red-800/60' 
                          : 'bg-pink-950/80 text-pink-300 border border-pink-800/60'
                      }`}>
                        {isYT ? <Youtube className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                        <span>{item.platform}</span>
                      </span>
                    </div>

                    {item.category && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-slate-300 border border-white/10 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Watch Tutorial</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Creator Workflow Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1322] to-slate-900 border border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Creator Production Pipeline
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                From Raw Architecture to Production App & Video
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Every project I build goes through a documented design and development cycle: Figma prototyping → VS Code & Android Studio implementation → Screen recording & walkthrough → Video editing → Open source or client release.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all"
              >
                <Youtube className="w-4 h-4" />
                <span>Join Bug Creator Community</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400">{selectedVideo.platform} • {selectedVideo.category}</span>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </div>
            <h3 className="text-lg font-bold text-white">{selectedVideo.title}</h3>
            <p className="text-xs text-slate-300">{selectedVideo.description}</p>
            <div className="pt-2 flex justify-end gap-3">
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md"
              >
                <span>Open Video Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

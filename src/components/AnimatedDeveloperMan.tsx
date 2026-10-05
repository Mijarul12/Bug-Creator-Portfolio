import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  Bug, 
  CheckCircle2, 
  Zap, 
  Flame, 
  Smartphone, 
  Layers,
  Heart,
  Smile
} from 'lucide-react';

interface AnimatedDeveloperManProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBubble?: boolean;
  showTokens?: boolean;
  initialLaughing?: boolean;
}

export const AnimatedDeveloperMan: React.FC<AnimatedDeveloperManProps> = ({ 
  className = '',
  size = 'lg',
  showBubble = true,
  showTokens = true,
  initialLaughing = true
}) => {
  const [isLaughing, setIsLaughing] = useState<boolean>(initialLaughing);
  const [bubbleText, setBubbleText] = useState<string>("Hahaha! 😄 Welcome to Bug Creator!");
  const [isWaving, setIsWaving] = useState(false);
  const [activeCodeTag, setActiveCodeTag] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);

  const laughingQuotes = [
    "Hahaha! That code compiled on the first try! 😂",
    "Haha! 0 Bugs found in production! 🎉",
    "Hahaha! Squashing bugs all day is so fun! 🐛💥",
    "Haha! Blazing fast 60FPS React 19! ⚡",
    "Hahaha! Android Compose animations look sick! 🚀",
    "Haha! Thanks for checking out Bug Creator! 😄"
  ];

  const floatingTokens = isLaughing ? [
    { text: 'Hahaha! 😂', color: 'text-amber-300 border-amber-500/40 bg-amber-950/80', top: '8%', left: '-10%' },
    { text: 'Bug Squashed! 🐛', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80', top: '22%', right: '-12%' },
    { text: 'LOL xD', color: 'text-pink-400 border-pink-500/40 bg-pink-950/80', bottom: '28%', left: '-12%' },
    { text: '<HappyCoding />', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/80', bottom: '15%', right: '-8%' },
    { text: '100% Fun ✨', color: 'text-purple-400 border-purple-500/40 bg-purple-950/80', top: '-6%', right: '15%' },
  ] : [
    { text: '<React />', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/70', top: '10%', left: '-8%' },
    { text: 'Android.kt', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/70', top: '22%', right: '-12%' },
    { text: 'Firebase 🔥', color: 'text-amber-400 border-amber-500/40 bg-amber-950/70', bottom: '26%', left: '-12%' },
    { text: 'TypeScript', color: 'text-blue-400 border-blue-500/40 bg-blue-950/70', bottom: '15%', right: '-8%' },
    { text: 'const bug = null;', color: 'text-purple-400 border-purple-500/40 bg-purple-950/70', top: '-6%', right: '20%' },
  ];

  const dimensionsClass = size === 'sm' 
    ? 'w-48 h-48 sm:w-56 sm:h-56' 
    : size === 'md' 
    ? 'w-full max-w-[280px] aspect-square' 
    : 'w-64 sm:w-72 md:w-80 h-72 sm:h-80';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCodeTag(prev => (prev + 1) % laughingQuotes.length);
      setBubbleText(laughingQuotes[Math.floor(Math.random() * laughingQuotes.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClickCharacter = () => {
    setIsWaving(true);
    setClickCount(prev => prev + 1);
    const compliments = [
      "Hahaha! Bug Squashed! 🐛💥",
      "Haha! You found the laughing developer! 😄",
      "Hahaha! High-five! ✋✨",
      "Haha! Deploying laughter to production! 🚀",
      "Hahaha! Coding with joy! ❤️"
    ];
    setBubbleText(compliments[clickCount % compliments.length]);
    setTimeout(() => setIsWaving(false), 1200);
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* Ambient Rotating Glowing Platform Rings */}
      <div className="absolute -bottom-6 w-56 h-12 bg-gradient-to-r from-amber-500/30 via-cyan-500/30 to-purple-500/30 rounded-full blur-xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-5 w-48 h-8 border border-cyan-500/30 rounded-full animate-spin-slow pointer-events-none" />

      {/* Floating Interactive Speech Bubble */}
      {showBubble && (
        <div 
          className="absolute -top-10 sm:-top-12 z-30 px-3 py-1.5 rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-xl shadow-cyan-950/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 max-w-[260px] sm:max-w-xs animate-float"
        >
          <Smile className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-bounce" />
          <span className="truncate">{bubbleText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 border-r border-b border-cyan-500/50 rotate-45" />
        </div>
      )}

      {/* Floating Laughter / Holographic Tech Tags */}
      {showTokens && floatingTokens.map((token, i) => (
        <div
          key={i}
          className={`absolute hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono shadow-lg backdrop-blur-md pointer-events-none z-20 ${
            i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'
          } ${token.color}`}
          style={{
            top: token.top,
            bottom: token.bottom,
            left: token.left,
            right: token.right,
            animationDelay: `${i * 0.6}s`
          }}
        >
          <span>{token.text}</span>
        </div>
      ))}

      {/* Main Animated Laughing Boy Character */}
      <div 
        onClick={handleClickCharacter}
        className="relative z-10 cursor-pointer group transition-transform duration-300 hover:scale-105"
        title="Click the laughing boy to chuckle!"
      >
        <div className={`relative ${dimensionsClass} flex items-center justify-center`}>
          
          {/* Cyber Halo / Backdrop Glow */}
          <div className="absolute inset-4 bg-gradient-to-tr from-cyan-600/20 via-amber-600/20 to-purple-600/20 rounded-full blur-2xl animate-pulse-glow" />

          {/* SVG Laughing Boy Developer Artwork */}
          <svg
            viewBox="0 0 320 340"
            className="w-full h-full drop-shadow-[0_10px_25px_rgba(6,182,212,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Hologram Hexagons */}
            <g opacity="0.4" className="animate-spin-slow origin-center">
              <polygon points="160,30 230,70 230,150 160,190 90,150 90,70" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <polygon points="160,15 250,65 250,165 160,215 70,165 70,65" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="6 6" fill="none" opacity="0.6" />
            </g>

            {/* Sparkles of Laughter & Cyber Particles */}
            <circle cx="65" cy="110" r="3" fill="#fbbf24" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="255" cy="95" r="2.5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="270" cy="190" r="2" fill="#34d399" className="animate-pulse" />
            <circle cx="50" cy="220" r="2" fill="#f43f5e" className="animate-pulse" />

            {/* LAUGHING DEVELOPER BOY BODY */}
            <g className={isLaughing ? "animate-laughing" : "animate-float"}>
              
              {/* Hoodie Back / Shoulders */}
              <path
                d="M80 300 C90 230, 110 210, 160 210 C210 210, 230 230, 240 300 Z"
                fill="url(#hoodieGradient)"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Cyber Jacket Trims & Bug Creator Neon Stripes */}
              <path d="M125 220 L115 300" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
              <path d="M195 220 L205 300" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
              <path d="M160 230 L160 300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />

              {/* Bug Creator Chest Badge */}
              <rect x="145" y="240" width="30" height="20" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
              <path d="M152 250 L156 254 L168 245" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />

              {/* NECK */}
              <rect x="145" y="175" width="30" height="38" rx="6" fill="#e0a97a" />
              <path d="M145 175 C150 185, 170 185, 175 175 L175 188 C170 193, 150 193, 145 188 Z" fill="#c68a5c" />

              {/* HEAD & FACE */}
              <ellipse cx="160" cy="140" rx="44" ry="48" fill="#eab389" />

              {/* Modern Developer Dark Hairstyle with energetic bounce */}
              <path
                d="M112 135 C110 98, 130 72, 160 70 C192 69, 212 92, 208 135 C204 110, 195 88, 160 86 C130 84, 116 110, 112 135 Z"
                fill="#18181b"
              />
              <path
                d="M120 102 C140 68, 185 68, 202 94 C206 80, 190 68, 160 66 C135 64, 120 83, 120 102 Z"
                fill="#27272a"
              />
              {/* Front Bangs */}
              <path d="M130 90 Q150 100 165 94 Q178 102 192 96 C185 86 150 80 130 90 Z" fill="#09090b" />

              {/* EARS */}
              <ellipse cx="114" cy="142" rx="7" ry="11" fill="#e0a97a" />
              <ellipse cx="206" cy="142" rx="7" ry="11" fill="#e0a97a" />
              {/* Sleek Earbuds */}
              <circle cx="113" cy="144" r="3.5" fill="#06b6d4" className="animate-pulse" />
              <circle cx="207" cy="144" r="3.5" fill="#06b6d4" className="animate-pulse" />

              {/* HAPPY LAUGHING EYEBROWS (Arching upwards with laughter) */}
              <path d="M130 118 Q142 110 152 116" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
              <path d="M168 116 Q178 110 190 118" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />

              {/* SMART CYBER GLASSES / SPECTACLES */}
              <rect x="126" y="121" width="28" height="20" rx="5" fill="#082f49" fillOpacity="0.35" stroke="#22d3ee" strokeWidth="2.5" />
              <rect x="166" y="121" width="28" height="20" rx="5" fill="#082f49" fillOpacity="0.35" stroke="#22d3ee" strokeWidth="2.5" />
              <path d="M154 129 L166 129" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M115 129 L126 129" stroke="#22d3ee" strokeWidth="2" />
              <path d="M194 129 L205 129" stroke="#22d3ee" strokeWidth="2" />

              {/* JOYFUL LAUGHING SQUINT EYES (^ ^ Anime/Pixar laughter style) */}
              {isLaughing ? (
                <g>
                  {/* Left Laughing Eye Arc */}
                  <path d="M132 133 Q140 123 148 133" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M134 135 Q140 126 146 135" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  
                  {/* Right Laughing Eye Arc */}
                  <path d="M172 133 Q180 123 188 133" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M174 135 Q180 126 186 135" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                  {/* Sparkle Tears of Joy / Laughter at outer eye corners */}
                  <path d="M125 133 Q123 129 126 127 Q128 131 125 133 Z" fill="#38bdf8" />
                  <path d="M195 133 Q197 129 194 127 Q192 131 195 133 Z" fill="#38bdf8" />
                </g>
              ) : (
                /* Focused Open Eyes */
                <g>
                  <ellipse cx="140" cy="132" rx="4" ry="4" fill="#0f172a" />
                  <ellipse cx="180" cy="132" rx="4" ry="4" fill="#0f172a" />
                  <circle cx="141" cy="131" r="1.5" fill="#ffffff" />
                  <circle cx="181" cy="131" r="1.5" fill="#ffffff" />
                </g>
              )}

              {/* ROSY BLUSHING CHEEKS (Smiling / Laughing Cheerful Blush) */}
              <ellipse cx="126" cy="145" rx="8" ry="4" fill="#f43f5e" fillOpacity="0.4" />
              <ellipse cx="194" cy="145" rx="8" ry="4" fill="#f43f5e" fillOpacity="0.4" />

              {/* NOSE */}
              <path d="M159 135 L157 145 L163 145" stroke="#c68a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {/* BIG JOYFUL LAUGHING MOUTH (:D with white teeth & tongue) */}
              {isLaughing ? (
                <g className="animate-laughing-mouth origin-center">
                  {/* Open Laughing Mouth Cave */}
                  <path
                    d="M144 153 Q160 178 176 153 C173 151, 147 151, 144 153 Z"
                    fill="#881337"
                    stroke="#4c0519"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Top White Teeth */}
                  <path
                    d="M146 153 Q160 157 174 153 L172 158 Q160 161 148 158 Z"
                    fill="#ffffff"
                  />
                  {/* Happy Tongue */}
                  <ellipse cx="160" cy="168" rx="8" ry="5" fill="#fb7185" />
                  {/* Smile Corner dimples */}
                  <path d="M142 152 Q144 150 144 155" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <path d="M178 152 Q176 150 176 155" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                </g>
              ) : (
                /* Subtle Smile */
                <path d="M150 156 Q160 164 170 156" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              )}

              {/* HOLOGRAPHIC LAPTOP IN FRONT */}
              <g className="animate-typing">
                {/* Laptop Base */}
                <polygon points="100,280 220,280 245,315 75,315" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="130" y="295" width="60" height="15" rx="3" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" opacity="0.8" />

                {/* Glowing Trackpad & Keyboard Backlight */}
                <rect x="110" y="284" width="100" height="9" rx="1.5" fill="#082f49" />
                <rect x="145" y="303" width="30" height="9" rx="2" fill="#0284c7" opacity="0.6" />

                {/* Laptop Screen (Semi-transparent Holographic) */}
                <polygon points="110,215 210,215 220,280 100,280" fill="url(#screenGradient)" stroke="#06b6d4" strokeWidth="2" opacity="0.9" />

                {/* Bug Creator Logo on Screen */}
                <circle cx="160" cy="245" r="12" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
                <path d="M156 245 L159 249 L166 242" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />

                {/* Holographic Rays from Laptop */}
                <line x1="120" y1="215" x2="90" y2="180" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                <line x1="200" y1="215" x2="230" y2="180" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                <line x1="160" y1="215" x2="160" y2="170" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
              </g>

              {/* HANDS (Typing enthusiastically on keyboard) */}
              <ellipse cx="118" cy="285" rx="11" ry="8" fill="#e0a97a" className="animate-typing" />
              <ellipse cx="202" cy="285" rx="11" ry="8" fill="#e0a97a" className="animate-typing" style={{ animationDelay: '0.4s' }} />

              {/* WAVING ARM (Appears on click interaction) */}
              {isWaving && (
                <g className="origin-bottom-left" style={{ animation: 'wave-arm 1s ease-in-out' }}>
                  <path d="M225 240 Q250 190 255 160" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" />
                  <ellipse cx="258" cy="155" rx="12" ry="10" fill="#eab389" />
                  <path d="M250 148 L254 138" stroke="#eab389" strokeWidth="4" strokeLinecap="round" />
                  <path d="M256 146 L262 136" stroke="#eab389" strokeWidth="4" strokeLinecap="round" />
                  <path d="M263 147 L270 139" stroke="#eab389" strokeWidth="4" strokeLinecap="round" />
                </g>
              )}

            </g>

            {/* GRADIENT DEFINITIONS */}
            <defs>
              <linearGradient id="hoodieGradient" x1="80" y1="210" x2="240" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0f172a" />
                <stop offset="0.5" stopColor="#1e1b4b" />
                <stop offset="1" stopColor="#090d16" />
              </linearGradient>

              <linearGradient id="screenGradient" x1="110" y1="215" x2="210" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#082f49" stopOpacity="0.85" />
                <stop offset="0.5" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="1" stopColor="#1e1b4b" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Laughter Switcher Pill on bottom */}
          <div className="absolute -bottom-2 right-4 flex items-center gap-1.5 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLaughing(!isLaughing);
                if (!isLaughing) {
                  setBubbleText("Hahaha! 😂 Laughing mode active!");
                }
              }}
              className="px-2.5 py-1 rounded-full bg-slate-900/95 border border-amber-500/50 hover:border-amber-400 text-[10px] font-mono text-amber-300 shadow-md flex items-center gap-1 transition-all cursor-pointer hover:scale-105"
            >
              <Smile className="w-3 h-3 text-amber-400 animate-spin" />
              <span>{isLaughing ? "Laughing Boy 😄" : "Smile"}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

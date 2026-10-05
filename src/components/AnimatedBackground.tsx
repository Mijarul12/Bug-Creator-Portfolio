import React, { useEffect, useState } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingSymbols = [
    { text: '{ ...props }', top: '15%', left: '8%', delay: '0s', dur: '12s' },
    { text: '</>', top: '35%', right: '10%', delay: '2s', dur: '10s' },
    { text: 'async/await', top: '65%', left: '5%', delay: '4s', dur: '14s' },
    { text: '01001011', top: '80%', right: '8%', delay: '1s', dur: '11s' },
    { text: 'Bug.fix()', top: '45%', left: '15%', delay: '3s', dur: '13s' },
    { text: 'git push origin main', top: '25%', right: '18%', delay: '5s', dur: '15s' },
    { text: 'Firestore.sync()', top: '90%', left: '20%', delay: '2.5s', dur: '16s' },
    { text: 'Compose.kt', top: '55%', right: '22%', delay: '1.5s', dur: '12s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Interactive Mouse Glow Spotlight */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px] transition-all duration-300 ease-out pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Floating Code Snippets across the page */}
      {floatingSymbols.map((item, index) => (
        <div
          key={index}
          className="absolute hidden md:block text-[11px] font-mono text-cyan-400/[0.12] select-none animate-float pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDuration: item.dur,
            animationDelay: item.delay,
          }}
        >
          {item.text}
        </div>
      ))}

      {/* Top Left Cyan Aurora */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/[0.08] rounded-full blur-[140px] animate-pulse-glow" />

      {/* Bottom Right Indigo Aurora */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/[0.08] rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

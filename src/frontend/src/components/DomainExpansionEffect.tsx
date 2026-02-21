import { useEffect } from 'react';
import type { DomainExpansion } from '../backend';

interface DomainExpansionEffectProps {
  domainExpansion: DomainExpansion;
  characterName: string;
  onComplete: () => void;
}

export default function DomainExpansionEffect({ domainExpansion, characterName, onComplete }: DomainExpansionEffectProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-500">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-pulse"
        style={{
          backgroundImage: 'url(/assets/generated/domain-overlay.dim_1920x1080.png)',
          animation: 'domainPulse 2s ease-in-out infinite',
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-purple-950/60 backdrop-blur-sm" />
      
      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 animate-in zoom-in duration-700">
        <div className="space-y-2">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            {domainExpansion.name}
          </h2>
          <p className="text-2xl text-purple-200">{characterName}</p>
        </div>
        
        <div className="max-w-2xl mx-auto p-6 rounded-lg bg-black/50 border-2 border-purple-500/50 backdrop-blur">
          <p className="text-xl text-purple-100">{domainExpansion.effect}</p>
        </div>

        <div className="flex justify-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-purple-950/80 border border-purple-500/50">
            <div className="text-sm text-purple-300">Power Boost</div>
            <div className="text-2xl font-bold text-purple-400">+{domainExpansion.powerBoost.toString()}</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-purple-950/80 border border-purple-500/50">
            <div className="text-sm text-purple-300">Defense Boost</div>
            <div className="text-2xl font-bold text-purple-400">+{domainExpansion.defenseBoost.toString()}</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-purple-950/80 border border-purple-500/50">
            <div className="text-sm text-purple-300">Damage Reduction</div>
            <div className="text-2xl font-bold text-purple-400">{domainExpansion.damageReduction.toString()}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

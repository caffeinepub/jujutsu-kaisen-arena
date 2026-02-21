import { useEffect } from 'react';

interface BlackFlashEffectProps {
  targetX: number;
  onComplete: () => void;
}

export default function BlackFlashEffect({ targetX, onComplete }: BlackFlashEffectProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed z-40 pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${targetX}px), -50%)`,
      }}
    >
      {/* Main impact effect */}
      <div className="relative w-64 h-64 animate-in zoom-in duration-300">
        <img
          src="/assets/generated/blackflash-effect.dim_512x512.png"
          alt="Black Flash"
          className="w-full h-full object-contain animate-spin-slow"
          style={{
            animation: 'blackFlashSpin 0.5s ease-out, blackFlashFade 1.5s ease-out',
          }}
        />
        
        {/* Energy burst particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ef4444 0%, #000000 100%)',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`,
              animation: `blackFlashParticle 1s ease-out ${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Screen flash - split into two divs for separate animations */}
      <div className="fixed inset-0 bg-red-500/30 animate-in fade-in duration-100" />
      <div className="fixed inset-0 bg-red-500/30 animate-out fade-out duration-500" style={{ animationDelay: '100ms' }} />
      
      {/* Text indicator */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="text-4xl font-bold text-red-500 animate-in zoom-in duration-300">
          BLACK FLASH!
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

export interface KeyboardState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  g: boolean;
  n: boolean;
  h: boolean;
  k: boolean;
}

export function useKeyboardControls(enabled: boolean = true) {
  const [keys, setKeys] = useState<KeyboardState>({
    w: false,
    a: false,
    s: false,
    d: false,
    g: false,
    n: false,
    h: false,
    k: false,
  });

  const cooldownRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const validKeys = ['w', 'a', 's', 'd', 'g', 'n', 'h', 'k'];
      
      if (validKeys.includes(key)) {
        e.preventDefault();
        
        // Check cooldown (300ms)
        const now = Date.now();
        if (cooldownRef.current[key] && now - cooldownRef.current[key] < 300) {
          return;
        }
        
        cooldownRef.current[key] = now;
        setKeys((prev) => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const validKeys = ['w', 'a', 's', 'd', 'g', 'n', 'h', 'k'];
      
      if (validKeys.includes(key)) {
        setKeys((prev) => ({ ...prev, [key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled]);

  return keys;
}

import { useState, useCallback } from 'react';

export type Stance = 'standing' | 'jumping' | 'crouching';

export interface CharacterPosition {
  x: number;
  stance: Stance;
  isAnimating: boolean;
}

export function useCharacterMovement(initialX: number = 0) {
  const [position, setPosition] = useState<CharacterPosition>({
    x: initialX,
    stance: 'standing',
    isAnimating: false,
  });

  const moveForward = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      x: Math.min(prev.x + 50, 200),
    }));
  }, []);

  const moveBackward = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      x: Math.max(prev.x - 50, -200),
    }));
  }, []);

  const jump = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      stance: 'jumping',
      isAnimating: true,
    }));

    setTimeout(() => {
      setPosition((prev) => ({
        ...prev,
        stance: 'standing',
        isAnimating: false,
      }));
    }, 600);
  }, []);

  const crouch = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      stance: 'crouching',
      isAnimating: true,
    }));

    setTimeout(() => {
      setPosition((prev) => ({
        ...prev,
        stance: 'standing',
        isAnimating: false,
      }));
    }, 400);
  }, []);

  const getDistance = useCallback((otherX: number) => {
    return Math.abs(position.x - otherX);
  }, [position.x]);

  return {
    position,
    moveForward,
    moveBackward,
    jump,
    crouch,
    getDistance,
  };
}

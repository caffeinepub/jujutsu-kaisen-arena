import type { Character } from '../backend';
import type { CharacterPosition } from '../hooks/useCharacterMovement';

interface CharacterSpriteProps {
  character: Character;
  position: CharacterPosition;
  imageUrl: string;
  isPlayer1: boolean;
}

export default function CharacterSprite({ character, position, imageUrl, isPlayer1 }: CharacterSpriteProps) {
  const getTransform = () => {
    let transform = `translateX(${position.x}px)`;
    
    if (position.stance === 'jumping') {
      transform += ' translateY(-80px)';
    } else if (position.stance === 'crouching') {
      transform += ' translateY(20px) scaleY(0.8)';
    }
    
    return transform;
  };

  const getAnimationClass = () => {
    if (position.stance === 'jumping') return 'animate-jump';
    if (position.stance === 'crouching') return 'animate-crouch';
    return '';
  };

  return (
    <div
      className={`relative transition-transform duration-300 ${getAnimationClass()}`}
      style={{
        transform: getTransform(),
      }}
    >
      <img
        src={imageUrl}
        alt={character.name}
        className={`w-32 h-40 object-cover rounded-lg border-2 shadow-lg ${
          isPlayer1
            ? 'border-red-500 shadow-red-500/50'
            : 'border-blue-500 shadow-blue-500/50'
        }`}
      />
      {position.stance === 'jumping' && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/30 rounded-full blur-sm" />
      )}
    </div>
  );
}

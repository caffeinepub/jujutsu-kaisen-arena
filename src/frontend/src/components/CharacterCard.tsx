import type { Character } from '../backend';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Swords, Shield, Zap } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  imageUrl: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function CharacterCard({ character, imageUrl, isSelected, isDisabled, onClick }: CharacterCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 overflow-hidden ${
        isSelected
          ? 'border-2 border-primary shadow-lg shadow-primary/50 scale-105'
          : isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-primary/50 hover:scale-105'
      }`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="relative">
        <img src={imageUrl} alt={character.name} className="w-full h-48 object-cover" />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <Badge className="text-lg px-4 py-2">SELECTED</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg truncate">{character.name}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Swords className="w-3 h-3" />
              ATK
            </span>
            <span className="font-semibold">{character.attack.toString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Shield className="w-3 h-3" />
              DEF
            </span>
            <span className="font-semibold">{character.defense.toString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Zap className="w-3 h-3" />
              CE
            </span>
            <span className="font-semibold">{character.cursedEnergy.toString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

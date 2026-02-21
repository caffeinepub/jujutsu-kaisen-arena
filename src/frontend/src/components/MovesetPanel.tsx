import type { Character } from '../backend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Zap, Swords, Shield } from 'lucide-react';

interface MovesetPanelProps {
  character: Character;
  onClose: () => void;
}

export default function MovesetPanel({ character, onClose }: MovesetPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-purple-950/90 to-card/90 border-purple-500/50">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {character.name}'s Moveset
          </CardTitle>
          <CardDescription>Complete list of abilities and techniques</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/30 border border-red-500/30">
              <Swords className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-xs text-muted-foreground">Attack</div>
                <div className="font-bold">{character.attack.toString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-950/30 border border-blue-500/30">
              <Shield className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-muted-foreground">Defense</div>
                <div className="font-bold">{character.defense.toString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-950/30 border border-purple-500/30">
              <Zap className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-xs text-muted-foreground">Energy</div>
                <div className="font-bold">{character.cursedEnergy.toString()}</div>
              </div>
            </div>
          </div>

          {/* Basic Moves */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Basic Moves</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Punch</span>
                  <Badge variant="outline">G</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Basic physical attack</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="destructive">Damage: {character.attack.toString()}</Badge>
                  <Badge variant="secondary">Energy: 0</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Abilities</h3>
            <div className="space-y-2">
              {character.abilities.map((ability, index) => (
                <div key={index} className="p-3 rounded-lg bg-card/50 border border-border">
                  <span className="font-semibold">{ability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moveset */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Special Techniques</h3>
            <div className="space-y-2">
              {character.moveset.map((move, index) => (
                <div key={index} className="p-3 rounded-lg bg-card/50 border border-border">
                  <span className="font-semibold">{move}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ultimate */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Ultimate Technique</h3>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/50">
              <span className="font-semibold text-purple-300">{character.ultimate}</span>
            </div>
          </div>

          {/* Domain Expansion */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Domain Expansion</h3>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-950/70 to-pink-950/70 border-2 border-purple-500/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-purple-300">{character.domainExpansion.name}</span>
                <Badge variant="outline">N</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{character.domainExpansion.effect}</p>
              <div className="flex gap-2 flex-wrap mt-2">
                <Badge variant="default">Power: +{character.domainExpansion.powerBoost.toString()}</Badge>
                <Badge variant="default">Defense: +{character.domainExpansion.defenseBoost.toString()}</Badge>
                <Badge variant="default">Damage Reduction: {character.domainExpansion.damageReduction.toString()}%</Badge>
              </div>
            </div>
          </div>

          {/* Black Flash */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-400">Special Moves</h3>
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-950/50 to-black border border-red-500/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-red-300">Black Flash</span>
                <Badge variant="outline">H</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Critical hit dealing 2.5x damage</p>
              <Badge variant="destructive" className="mt-2">Damage: {(Number(character.attack) * 2.5).toFixed(0)}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

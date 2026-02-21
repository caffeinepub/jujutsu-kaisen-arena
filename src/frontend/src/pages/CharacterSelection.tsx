import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Character } from '../backend';
import { Swords, Shield, Zap } from 'lucide-react';

export default function CharacterSelection() {
  const navigate = useNavigate();
  const { data: characters, isLoading } = useCharacters();
  const [selectedPlayer1, setSelectedPlayer1] = useState<number | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<number | null>(null);

  const handleStartBattle = () => {
    if (selectedPlayer1 !== null && selectedPlayer2 !== null) {
      navigate({
        to: '/arena',
        search: { p1: selectedPlayer1, p2: selectedPlayer2 },
      });
    }
  };

  const getCharacterImage = (index: number) => {
    const images = [
      '/assets/generated/yuji-portrait.dim_300x400.png',
      '/assets/generated/megumi-portrait.dim_300x400.png',
      '/assets/generated/nobara-portrait.dim_300x400.png',
      '/assets/generated/maki-portrait.dim_300x400.png',
    ];
    return images[index] || images[0];
  };

  const selectedChar1 = selectedPlayer1 !== null && characters ? characters[selectedPlayer1] : null;
  const selectedChar2 = selectedPlayer2 !== null && characters ? characters[selectedPlayer2] : null;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Select Your Fighters
        </h1>
        <p className="text-xl text-muted-foreground">Choose two characters to enter the Culling Games arena</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Player 1 Selection */}
        <Card className="border-2 border-red-500/30 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">Player 1</CardTitle>
            <CardDescription>Select your first fighter</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {characters?.map((char, index) => (
                  <CharacterCard
                    key={index}
                    character={char}
                    imageUrl={getCharacterImage(index)}
                    isSelected={selectedPlayer1 === index}
                    isDisabled={selectedPlayer2 === index}
                    onClick={() => setSelectedPlayer1(index)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Player 2 Selection */}
        <Card className="border-2 border-blue-500/30 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-500">Player 2</CardTitle>
            <CardDescription>Select your second fighter</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {characters?.map((char, index) => (
                  <CharacterCard
                    key={index}
                    character={char}
                    imageUrl={getCharacterImage(index)}
                    isSelected={selectedPlayer2 === index}
                    isDisabled={selectedPlayer1 === index}
                    onClick={() => setSelectedPlayer2(index)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Character Preview */}
      {(selectedChar1 || selectedChar2) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {selectedChar1 && (
            <Card className="border-red-500/50 bg-gradient-to-br from-red-950/30 to-card">
              <CardHeader>
                <CardTitle className="text-red-500">{selectedChar1.name}</CardTitle>
                <CardDescription>Player 1 Fighter Stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Swords className="w-4 h-4 text-red-500" />
                    Attack
                  </span>
                  <span className="font-bold">{selectedChar1.attack.toString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Defense
                  </span>
                  <span className="font-bold">{selectedChar1.defense.toString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-purple-500" />
                    Cursed Energy
                  </span>
                  <span className="font-bold">{selectedChar1.cursedEnergy.toString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedChar2 && (
            <Card className="border-blue-500/50 bg-gradient-to-br from-blue-950/30 to-card">
              <CardHeader>
                <CardTitle className="text-blue-500">{selectedChar2.name}</CardTitle>
                <CardDescription>Player 2 Fighter Stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Swords className="w-4 h-4 text-red-500" />
                    Attack
                  </span>
                  <span className="font-bold">{selectedChar2.attack.toString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Defense
                  </span>
                  <span className="font-bold">{selectedChar2.defense.toString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-purple-500" />
                    Cursed Energy
                  </span>
                  <span className="font-bold">{selectedChar2.cursedEnergy.toString()}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Start Battle Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={selectedPlayer1 === null || selectedPlayer2 === null}
          onClick={handleStartBattle}
          className="text-lg px-8 py-6 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 shadow-lg shadow-purple-500/50"
        >
          Enter the Arena
        </Button>
      </div>
    </div>
  );
}

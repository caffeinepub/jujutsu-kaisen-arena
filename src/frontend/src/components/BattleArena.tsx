import { useState } from 'react';
import type { Match } from '../backend';
import HealthBar from './HealthBar';
import CursedEnergyMeter from './CursedEnergyMeter';
import TurnIndicator from './TurnIndicator';
import ActionPanel from './ActionPanel';
import { Card } from '@/components/ui/card';

interface BattleArenaProps {
  match: Match;
  matchId: bigint;
}

export default function BattleArena({ match, matchId }: BattleArenaProps) {
  const [player1Health, setPlayer1Health] = useState(Number(match.player1.health));
  const [player2Health, setPlayer2Health] = useState(Number(match.player2.health));
  const [player1Energy, setPlayer1Energy] = useState(Number(match.player1.cursedEnergy));
  const [player2Energy, setPlayer2Energy] = useState(Number(match.player2.cursedEnergy));

  const getCharacterImage = (name: string) => {
    const imageMap: Record<string, string> = {
      'Yuji Itadori': '/assets/generated/yuji-portrait.dim_300x400.png',
      'Megumi Fushiguro': '/assets/generated/megumi-portrait.dim_300x400.png',
      'Nobara Kugisaki': '/assets/generated/nobara-portrait.dim_300x400.png',
      'Maki Zenin': '/assets/generated/maki-portrait.dim_300x400.png',
    };
    return imageMap[name] || imageMap['Yuji Itadori'];
  };

  return (
    <div
      className="relative min-h-[600px] rounded-lg overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/arena-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Battle Content */}
      <div className="relative z-10 p-8 space-y-8">
        {/* Turn Indicator */}
        <TurnIndicator currentTurn={Number(match.currentTurn)} score={Number(match.score)} />

        {/* Battle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player 1 */}
          <Card className="bg-gradient-to-br from-red-950/80 to-card/80 backdrop-blur border-red-500/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={getCharacterImage(match.player1.name)}
                alt={match.player1.name}
                className="w-24 h-32 object-cover rounded-lg border-2 border-red-500 shadow-lg shadow-red-500/50"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-red-500">{match.player1.name}</h3>
                <HealthBar current={player1Health} max={Number(match.player1.health)} />
                <CursedEnergyMeter current={player1Energy} max={Number(match.player1.cursedEnergy)} />
              </div>
            </div>
          </Card>

          {/* Player 2 */}
          <Card className="bg-gradient-to-br from-blue-950/80 to-card/80 backdrop-blur border-blue-500/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={getCharacterImage(match.player2.name)}
                alt={match.player2.name}
                className="w-24 h-32 object-cover rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/50"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-blue-500">{match.player2.name}</h3>
                <HealthBar current={player2Health} max={Number(match.player2.health)} />
                <CursedEnergyMeter current={player2Energy} max={Number(match.player2.cursedEnergy)} />
              </div>
            </div>
          </Card>
        </div>

        {/* Action Panel */}
        <ActionPanel
          matchId={matchId}
          currentTurn={Number(match.currentTurn)}
          player1={match.player1}
          player2={match.player2}
          onActionComplete={(damage, energyCost, targetPlayer) => {
            if (targetPlayer === 1) {
              setPlayer1Health((prev) => Math.max(0, prev - damage));
            } else {
              setPlayer2Health((prev) => Math.max(0, prev - damage));
            }

            // Deduct energy from current player
            if (Number(match.currentTurn) === 1) {
              setPlayer1Energy((prev) => Math.max(0, prev - energyCost));
            } else {
              setPlayer2Energy((prev) => Math.max(0, prev - energyCost));
            }
          }}
        />
      </div>
    </div>
  );
}

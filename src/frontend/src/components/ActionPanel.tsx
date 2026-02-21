import { useState } from 'react';
import type { Character } from '../backend';
import AbilityButton from './AbilityButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface ActionPanelProps {
  matchId: bigint;
  currentTurn: number;
  player1: Character;
  player2: Character;
  onActionComplete: (damage: number, energyCost: number, targetPlayer: number) => void;
}

export default function ActionPanel({ currentTurn, player1, player2, onActionComplete }: ActionPanelProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlayer = currentTurn === 1 ? player1 : player2;
  const targetPlayer = currentTurn === 1 ? 2 : 1;

  const handleAction = (actionType: string, damage: number, energyCost: number) => {
    if (isProcessing) return;

    setIsProcessing(true);

    // Simulate action processing
    setTimeout(() => {
      onActionComplete(damage, energyCost, targetPlayer);
      toast.success(`${currentPlayer.name} used ${actionType}!`, {
        description: `Dealt ${damage} damage!`,
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <Card className="bg-card/90 backdrop-blur border-primary/30">
      <CardHeader>
        <CardTitle className="text-center">
          <span className={currentTurn === 1 ? 'text-red-500' : 'text-blue-500'}>
            {currentPlayer.name}'s Turn
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AbilityButton
            name="Attack"
            description="Basic physical attack"
            energyCost={0}
            damage={Number(currentPlayer.attack)}
            isDisabled={isProcessing}
            onClick={() => handleAction('Attack', Number(currentPlayer.attack), 0)}
          />
          <AbilityButton
            name="Defend"
            description="Reduce incoming damage"
            energyCost={5}
            damage={0}
            isDisabled={isProcessing}
            onClick={() => handleAction('Defend', 0, 5)}
          />
          <AbilityButton
            name="Cursed Technique"
            description="Powerful cursed energy attack"
            energyCost={10}
            damage={Number(currentPlayer.attack) + Number(currentPlayer.cursedEnergy) / 2}
            isDisabled={isProcessing}
            onClick={() =>
              handleAction(
                'Cursed Technique',
                Number(currentPlayer.attack) + Number(currentPlayer.cursedEnergy) / 2,
                10
              )
            }
          />
          <AbilityButton
            name="Special Move"
            description="Ultimate technique"
            energyCost={20}
            damage={Number(currentPlayer.attack) * 2}
            isDisabled={isProcessing}
            onClick={() => handleAction('Special Move', Number(currentPlayer.attack) * 2, 20)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

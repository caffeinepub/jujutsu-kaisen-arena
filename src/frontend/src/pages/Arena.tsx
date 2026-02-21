import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import BattleArena from '../components/BattleArena';
import { useCombat } from '../hooks/useCombat';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Arena() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/arena' }) as { p1?: number; p2?: number };
  const [battleId, setBattleId] = useState<bigint | null>(null);

  const { createBattle, battle, isCreating } = useCombat(battleId);

  useEffect(() => {
    if (search.p1 !== undefined && search.p2 !== undefined && !battleId) {
      createBattle(BigInt(search.p1), BigInt(search.p2)).then((id) => {
        setBattleId(id);
      });
    }
  }, [search.p1, search.p2, battleId, createBattle]);

  const handleBackToSelection = () => {
    navigate({ to: '/' });
  };

  if (!search.p1 || !search.p2) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Invalid Battle Configuration</h2>
        <p className="text-muted-foreground">Please select characters first</p>
        <Button onClick={handleBackToSelection}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Character Selection
        </Button>
      </div>
    );
  }

  if (isCreating || !battle) {
    return (
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            Preparing the Arena...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBackToSelection}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>
      </div>

      <BattleArena battle={battle} battleId={battleId!} />
    </div>
  );
}

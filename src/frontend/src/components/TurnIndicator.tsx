import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface TurnIndicatorProps {
  currentTurn: number;
  score: number;
}

export default function TurnIndicator({ currentTurn, score }: TurnIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Badge variant="outline" className="text-lg px-6 py-3 bg-card/80 backdrop-blur">
        Turn: <span className={currentTurn === 1 ? 'text-red-500 ml-2' : 'text-blue-500 ml-2'}>Player {currentTurn}</span>
      </Badge>
      <Badge variant="outline" className="text-lg px-6 py-3 bg-card/80 backdrop-blur">
        <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
        Score: {score}
      </Badge>
    </div>
  );
}

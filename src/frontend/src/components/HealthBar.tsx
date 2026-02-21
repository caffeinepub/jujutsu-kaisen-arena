import { Progress } from '@/components/ui/progress';
import { Heart } from 'lucide-react';

interface HealthBarProps {
  current: number;
  max: number;
}

export default function HealthBar({ current, max }: HealthBarProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Heart className="w-4 h-4 text-red-500" />
          Health
        </span>
        <span className="font-bold">
          {current} / {max}
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-red-950/50">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

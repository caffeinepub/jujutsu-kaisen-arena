import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KeyboardControlsIndicatorProps {
  isPlayerTurn: boolean;
  hasEnoughEnergy: boolean;
}

export default function KeyboardControlsIndicator({ isPlayerTurn, hasEnoughEnergy }: KeyboardControlsIndicatorProps) {
  const controls = [
    { key: 'W', action: 'Jump', available: isPlayerTurn },
    { key: 'A', action: 'Move Back', available: isPlayerTurn },
    { key: 'S', action: 'Crouch', available: isPlayerTurn },
    { key: 'D', action: 'Move Forward', available: isPlayerTurn },
    { key: 'G', action: 'Punch', available: isPlayerTurn },
    { key: 'N', action: 'Domain Expansion', available: isPlayerTurn && hasEnoughEnergy },
    { key: 'H', action: 'Black Flash', available: isPlayerTurn },
    { key: 'K', action: 'Show Moveset', available: true },
  ];

  return (
    <Card className="bg-card/80 backdrop-blur border-primary/30">
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {controls.map((control) => (
            <div
              key={control.key}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                control.available
                  ? 'bg-primary/20 border border-primary/50'
                  : 'bg-muted/20 border border-muted/30 opacity-50'
              }`}
            >
              <Badge
                variant={control.available ? 'default' : 'secondary'}
                className="font-mono font-bold"
              >
                {control.key}
              </Badge>
              <span className="text-xs text-center">{control.action}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

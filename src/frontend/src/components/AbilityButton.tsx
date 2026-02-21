import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AbilityButtonProps {
  name: string;
  description: string;
  energyCost: number;
  damage: number;
  isDisabled: boolean;
  onClick: () => void;
}

export default function AbilityButton({ name, description, energyCost, damage, isDisabled, onClick }: AbilityButtonProps) {
  return (
    <Card className="hover:border-primary/50 transition-all">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm">{name}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1">
            <img src="/assets/generated/cursed-energy-icon.dim_64x64.png" alt="CE" className="w-3 h-3" />
            Cost
          </span>
          <span className="font-bold">{energyCost}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Damage</span>
          <span className="font-bold text-red-500">{Math.round(damage)}</span>
        </div>
        <Button size="sm" className="w-full" disabled={isDisabled} onClick={onClick}>
          Use
        </Button>
      </CardContent>
    </Card>
  );
}

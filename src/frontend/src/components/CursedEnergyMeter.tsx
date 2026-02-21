interface CursedEnergyMeterProps {
  current: number;
  max: number;
}

export default function CursedEnergyMeter({ current, max }: CursedEnergyMeterProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <img src="/assets/generated/cursed-energy-icon.dim_64x64.png" alt="CE" className="w-4 h-4" />
          Cursed Energy
        </span>
        <span className="font-bold">
          {current} / {max}
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-purple-950/50">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

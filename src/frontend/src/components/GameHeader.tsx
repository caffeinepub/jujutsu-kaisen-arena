export default function GameHeader() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <img
            src="/assets/generated/game-logo.dim_400x150.png"
            alt="Jujutsu Kaisen Arena"
            className="h-16 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
        </div>
      </div>
    </header>
  );
}

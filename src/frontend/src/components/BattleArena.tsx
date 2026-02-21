import { useState, useEffect } from 'react';
import type { Battle, Character } from '../backend';
import HealthBar from './HealthBar';
import CursedEnergyMeter from './CursedEnergyMeter';
import TurnIndicator from './TurnIndicator';
import ActionPanel from './ActionPanel';
import CharacterSprite from './CharacterSprite';
import KeyboardControlsIndicator from './KeyboardControlsIndicator';
import MovesetPanel from './MovesetPanel';
import DomainExpansionEffect from './DomainExpansionEffect';
import BlackFlashEffect from './BlackFlashEffect';
import { Card } from '@/components/ui/card';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useCharacterMovement } from '../hooks/useCharacterMovement';
import { useDomainExpansion } from '../hooks/useCombat';
import { toast } from 'sonner';

interface BattleArenaProps {
  battle: Battle;
  battleId: bigint;
}

export default function BattleArena({ battle, battleId }: BattleArenaProps) {
  const [player1Health, setPlayer1Health] = useState(Number(battle.player1.health));
  const [player2Health, setPlayer2Health] = useState(Number(battle.player2.health));
  const [player1Energy, setPlayer1Energy] = useState(Number(battle.player1.cursedEnergy));
  const [player2Energy, setPlayer2Energy] = useState(Number(battle.player2.cursedEnergy));
  const [showMovesetPanel, setShowMovesetPanel] = useState(false);
  const [showDomainExpansion, setShowDomainExpansion] = useState(false);
  const [showBlackFlash, setShowBlackFlash] = useState(false);
  const [blackFlashTarget, setBlackFlashTarget] = useState(0);

  const currentTurn = Number(battle.currentTurn);
  const currentPlayer = currentTurn === 1 ? battle.player1 : battle.player2;
  const isPlayer1Turn = currentTurn === 1;

  const keys = useKeyboardControls(true);
  const player1Movement = useCharacterMovement(-150);
  const player2Movement = useCharacterMovement(150);

  const { executeDomainExpansion } = useDomainExpansion();

  const getCharacterImage = (name: string) => {
    const imageMap: Record<string, string> = {
      'Yuji Itadori': '/assets/generated/yuji-portrait.dim_300x400.png',
      'Gojo': '/assets/generated/gojo-portrait.dim_400x400.png',
      'Sukuna': '/assets/generated/sukuna-portrait.dim_400x400.png',
      'Inumaki': '/assets/generated/inumaki-portrait.dim_400x400.png',
      'Maki': '/assets/generated/maki-portrait.dim_400x400.png',
      'Maki Zenin': '/assets/generated/maki-portrait.dim_400x400.png',
      'Toge': '/assets/generated/inumaki-portrait.dim_400x400.png',
      'Aoi Todo': '/assets/generated/todo-portrait.dim_400x400.png',
      'Megumi': '/assets/generated/megumi-portrait.dim_300x400.png',
      'Megumi Fushiguro': '/assets/generated/megumi-portrait.dim_300x400.png',
      'Nobara': '/assets/generated/nobara-portrait.dim_300x400.png',
      'Nobara Kugisaki': '/assets/generated/nobara-portrait.dim_300x400.png',
    };
    return imageMap[name] || '/assets/generated/yuji-portrait.dim_300x400.png';
  };

  // Handle keyboard inputs
  useEffect(() => {
    if (!isPlayer1Turn) return;

    if (keys.w && !player1Movement.position.isAnimating) {
      player1Movement.jump();
      toast.info('Jump!');
    }
    if (keys.a) {
      player1Movement.moveBackward();
    }
    if (keys.s && !player1Movement.position.isAnimating) {
      player1Movement.crouch();
      toast.info('Crouch!');
    }
    if (keys.d) {
      player1Movement.moveForward();
    }
    if (keys.k) {
      setShowMovesetPanel((prev) => !prev);
    }
  }, [keys, isPlayer1Turn, player1Movement]);

  const handleDomainExpansion = async () => {
    const currentEnergy = isPlayer1Turn ? player1Energy : player2Energy;
    const requiredEnergy = 30;

    if (currentEnergy < requiredEnergy) {
      toast.error('Not enough cursed energy!', {
        description: `Need ${requiredEnergy} energy for Domain Expansion`,
      });
      return;
    }

    try {
      const result = await executeDomainExpansion(battleId, BigInt(currentTurn));
      setShowDomainExpansion(true);
      
      if (isPlayer1Turn) {
        setPlayer1Energy((prev) => Math.max(0, prev - requiredEnergy));
      } else {
        setPlayer2Energy((prev) => Math.max(0, prev - requiredEnergy));
      }

      toast.success('Domain Expansion Activated!', {
        description: result,
      });
    } catch (error) {
      toast.error('Failed to execute Domain Expansion');
    }
  };

  const handleBlackFlash = () => {
    const targetX = isPlayer1Turn ? player2Movement.position.x : player1Movement.position.x;
    setBlackFlashTarget(targetX);
    setShowBlackFlash(true);

    const damage = Math.floor(Number(currentPlayer.attack) * 2.5);
    
    if (isPlayer1Turn) {
      setPlayer2Health((prev) => Math.max(0, prev - damage));
    } else {
      setPlayer1Health((prev) => Math.max(0, prev - damage));
    }

    toast.success('BLACK FLASH!', {
      description: `Critical hit! Dealt ${damage} damage!`,
    });
  };

  // Handle N key for domain expansion
  useEffect(() => {
    if (keys.n && isPlayer1Turn) {
      handleDomainExpansion();
    }
  }, [keys.n]);

  // Handle H key for black flash
  useEffect(() => {
    if (keys.h && isPlayer1Turn) {
      handleBlackFlash();
    }
  }, [keys.h]);

  return (
    <div
      className="relative min-h-[700px] rounded-lg overflow-hidden"
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
        <TurnIndicator currentTurn={currentTurn} score={Number(battle.score)} />

        {/* Character Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player 1 */}
          <Card className="bg-gradient-to-br from-red-950/80 to-card/80 backdrop-blur border-red-500/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-red-500">{battle.player1.name}</h3>
                <HealthBar current={player1Health} max={Number(battle.player1.health)} />
                <CursedEnergyMeter current={player1Energy} max={Number(battle.player1.cursedEnergy)} />
              </div>
            </div>
          </Card>

          {/* Player 2 */}
          <Card className="bg-gradient-to-br from-blue-950/80 to-card/80 backdrop-blur border-blue-500/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-blue-500">{battle.player2.name}</h3>
                <HealthBar current={player2Health} max={Number(battle.player2.health)} />
                <CursedEnergyMeter current={player2Energy} max={Number(battle.player2.cursedEnergy)} />
              </div>
            </div>
          </Card>
        </div>

        {/* Battle Stage with Character Sprites */}
        <div className="relative h-64 flex items-end justify-center">
          <div className="absolute left-1/4">
            <CharacterSprite
              character={battle.player1}
              position={player1Movement.position}
              imageUrl={getCharacterImage(battle.player1.name)}
              isPlayer1={true}
            />
          </div>
          <div className="absolute right-1/4">
            <CharacterSprite
              character={battle.player2}
              position={player2Movement.position}
              imageUrl={getCharacterImage(battle.player2.name)}
              isPlayer1={false}
            />
          </div>
        </div>

        {/* Keyboard Controls Indicator */}
        <KeyboardControlsIndicator
          isPlayerTurn={isPlayer1Turn}
          hasEnoughEnergy={player1Energy >= 30}
        />

        {/* Action Panel */}
        <ActionPanel
          battleId={battleId}
          currentTurn={currentTurn}
          player1={battle.player1}
          player2={battle.player2}
          onActionComplete={(damage, energyCost, targetPlayer) => {
            if (targetPlayer === 1) {
              setPlayer1Health((prev) => Math.max(0, prev - damage));
            } else {
              setPlayer2Health((prev) => Math.max(0, prev - damage));
            }

            if (currentTurn === 1) {
              setPlayer1Energy((prev) => Math.max(0, prev - energyCost));
            } else {
              setPlayer2Energy((prev) => Math.max(0, prev - energyCost));
            }
          }}
          onPunch={() => {}}
          onDomainExpansion={handleDomainExpansion}
          onBlackFlash={handleBlackFlash}
        />
      </div>

      {/* Moveset Panel */}
      {showMovesetPanel && (
        <MovesetPanel
          character={currentPlayer}
          onClose={() => setShowMovesetPanel(false)}
        />
      )}

      {/* Domain Expansion Effect */}
      {showDomainExpansion && (
        <DomainExpansionEffect
          domainExpansion={currentPlayer.domainExpansion}
          characterName={currentPlayer.name}
          onComplete={() => setShowDomainExpansion(false)}
        />
      )}

      {/* Black Flash Effect */}
      {showBlackFlash && (
        <BlackFlashEffect
          targetX={blackFlashTarget}
          onComplete={() => setShowBlackFlash(false)}
        />
      )}
    </div>
  );
}

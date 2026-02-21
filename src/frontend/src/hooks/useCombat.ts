import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Battle } from '../backend';

export function useCombat(battleId: bigint | null) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const battleQuery = useQuery<Battle | null>({
    queryKey: ['battle', battleId?.toString()],
    queryFn: async () => {
      if (!actor || !battleId) return null;
      return actor.getBattle(battleId);
    },
    enabled: !!actor && battleId !== null,
  });

  const createBattleMutation = useMutation({
    mutationFn: async ({ player1Index, player2Index }: { player1Index: bigint; player2Index: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createBattle(player1Index, player2Index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['battle'] });
    },
  });

  return {
    battle: battleQuery.data,
    isLoading: battleQuery.isLoading,
    createBattle: (p1: bigint, p2: bigint) => createBattleMutation.mutateAsync({ player1Index: p1, player2Index: p2 }),
    isCreating: createBattleMutation.isPending,
  };
}

export function useDomainExpansion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const domainExpansionMutation = useMutation({
    mutationFn: async ({ battleId, playerId }: { battleId: bigint; playerId: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.executeDomainExpansion(battleId, playerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['battle'] });
    },
  });

  return {
    executeDomainExpansion: (battleId: bigint, playerId: bigint) =>
      domainExpansionMutation.mutateAsync({ battleId, playerId }),
    isExecuting: domainExpansionMutation.isPending,
  };
}

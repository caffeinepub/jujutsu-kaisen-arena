import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Match } from '../backend';

export function useCombat(matchId: bigint | null) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const matchQuery = useQuery<Match | null>({
    queryKey: ['match', matchId?.toString()],
    queryFn: async () => {
      if (!actor || !matchId) return null;
      return actor.getMatch(matchId);
    },
    enabled: !!actor && matchId !== null,
  });

  const createMatchMutation = useMutation({
    mutationFn: async ({ player1Index, player2Index }: { player1Index: bigint; player2Index: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createMatch(player1Index, player2Index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['match'] });
    },
  });

  return {
    match: matchQuery.data,
    isLoading: matchQuery.isLoading,
    createMatch: (p1: bigint, p2: bigint) => createMatchMutation.mutateAsync({ player1Index: p1, player2Index: p2 }),
    isCreating: createMatchMutation.isPending,
  };
}

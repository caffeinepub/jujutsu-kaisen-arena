import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Character } from '../backend';

export function useGetCharacters() {
  const { actor, isFetching } = useActor();

  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCharactersByEnergy();
    },
    enabled: !!actor && !isFetching,
  });
}

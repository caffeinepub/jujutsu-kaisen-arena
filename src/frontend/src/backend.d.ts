import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Match {
    score: bigint;
    currentTurn: bigint;
    player1: Character;
    player2: Character;
}
export interface Character {
    name: string;
    defense: bigint;
    cursedEnergy: bigint;
    attack: bigint;
    health: bigint;
}
export interface backendInterface {
    createMatch(player1Index: bigint, player2Index: bigint): Promise<bigint>;
    getCharactersByAttack(): Promise<Array<Character>>;
    getCharactersByDefense(): Promise<Array<Character>>;
    getCharactersByEnergy(): Promise<Array<Character>>;
    getMatch(matchId: bigint): Promise<Match>;
}

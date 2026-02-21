import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DomainExpansion {
    name: string;
    defenseBoost: bigint;
    effect: string;
    powerBoost: bigint;
    damageReduction: bigint;
}
export interface Battle {
    score: bigint;
    currentTurn: bigint;
    player1: Character;
    player2: Character;
}
export interface Character {
    elementalResistances: {
        fire: bigint;
        wind: bigint;
        lightning: bigint;
    };
    name: string;
    moveset: Array<string>;
    virusType?: string;
    speed: bigint;
    defense: bigint;
    cursedEnergy: bigint;
    ultimate: string;
    personalBest: bigint;
    abilities: Array<string>;
    attack: bigint;
    domainExpansion: DomainExpansion;
    health: bigint;
    elementalAffinity: string;
}
export interface backendInterface {
    createBattle(player1Index: bigint, player2Index: bigint): Promise<bigint>;
    executeDomainExpansion(battleId: bigint, playerId: bigint): Promise<string>;
    getAllCharacters(): Promise<Array<Character>>;
    getBattle(battleId: bigint): Promise<Battle>;
    getCharacterByName(name: string): Promise<Character>;
    getCharactersByAttack(): Promise<Array<Character>>;
    getCharactersByDefense(): Promise<Array<Character>>;
    getCharactersByEnergy(): Promise<Array<Character>>;
}

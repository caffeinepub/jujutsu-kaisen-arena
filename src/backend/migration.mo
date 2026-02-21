import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type OldDomainExpansion = {
    name : Text;
    effect : Text;
    powerBoost : Nat;
    damageReduction : Nat;
    defenseBoost : Nat;
  };

  type OldCharacter = {
    name : Text;
    health : Nat;
    attack : Nat;
    defense : Nat;
    cursedEnergy : Nat;
    speed : Nat;
    elementalAffinity : Text;
    virusType : ?Text;
    abilities : [Text];
    moveset : [Text];
    ultimate : Text;
    elementalResistances : { fire : Nat; lightning : Nat; wind : Nat };
    domainExpansion : OldDomainExpansion;
    personalBest : Nat;
  };

  type OldActor = {
    battles : Map.Map<Nat, { player1 : OldCharacter; player2 : OldCharacter; currentTurn : Nat; score : Nat }>;
    nextBattleId : Nat;
    characters : [OldCharacter];
  };

  type NewDomainExpansion = {
    name : Text;
    effect : Text;
    powerBoost : Nat;
    damageReduction : Nat;
    defenseBoost : Nat;
  };

  type NewCharacter = {
    name : Text;
    health : Nat;
    attack : Nat;
    defense : Nat;
    cursedEnergy : Nat;
    speed : Nat;
    elementalAffinity : Text;
    virusType : ?Text;
    abilities : [Text];
    moveset : [Text];
    ultimate : Text;
    elementalResistances : { fire : Nat; lightning : Nat; wind : Nat };
    domainExpansion : NewDomainExpansion;
    personalBest : Nat;
  };

  type NewActor = {
    battles : Map.Map<Nat, { player1 : NewCharacter; player2 : NewCharacter; currentTurn : Nat; score : Nat }>;
    nextBattleId : Nat;
    characters : [NewCharacter];
  };

  public func run(old : OldActor) : OldActor {
    old;
  };
};

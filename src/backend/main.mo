import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Character = {
    name : Text;
    health : Nat;
    attack : Nat;
    defense : Nat;
    cursedEnergy : Nat;
  };

  module Character {
    public func compareByEnergy(char1 : Character, char2 : Character) : Order.Order {
      switch (Nat.compare(char1.cursedEnergy, char2.cursedEnergy)) {
        case (#equal) { compareByAttack(char1, char2) };
        case (order) { order };
      };
    };

    public func compareByAttack(char1 : Character, char2 : Character) : Order.Order {
      switch (Nat.compare(char1.attack, char2.attack)) {
        case (#equal) { compareByDefense(char1, char2) };
        case (order) { order };
      };
    };

    public func compareByDefense(char1 : Character, char2 : Character) : Order.Order {
      Nat.compare(char1.defense, char2.defense);
    };
  };

  type Action = {
    #attack : Nat;
    #defend : Nat;
    #cursedTechnique : Nat;
    #specialMove : Nat;
  };

  type Match = {
    player1 : Character;
    player2 : Character;
    currentTurn : Nat;
    score : Nat;
  };

  let matches = Map.empty<Nat, Match>();
  var nextMatchId = 0;

  let characters = [
    {
      name = "Yuji Itadori";
      health = 100;
      attack = 20;
      defense = 15;
      cursedEnergy = 25;
    },
    {
      name = "Megumi Fushiguro";
      health = 95;
      attack = 18;
      defense = 17;
      cursedEnergy = 30;
    },
    {
      name = "Nobara Kugisaki";
      health = 90;
      attack = 22;
      defense = 14;
      cursedEnergy = 28;
    },
    {
      name = "Maki Zenin";
      health = 110;
      attack = 25;
      defense = 20;
      cursedEnergy = 18;
    },
  ];

  public query ({ caller }) func getCharactersByEnergy() : async [Character] {
    characters.sort(Character.compareByEnergy);
  };

  public query ({ caller }) func getCharactersByAttack() : async [Character] {
    characters.sort(Character.compareByAttack);
  };

  public query ({ caller }) func getCharactersByDefense() : async [Character] {
    characters.sort(Character.compareByDefense);
  };

  public shared ({ caller }) func createMatch(player1Index : Nat, player2Index : Nat) : async Nat {
    if (player1Index >= characters.size() or player2Index >= characters.size()) {
      Runtime.trap("Invalid character selection");
    };

    let match = {
      player1 = characters[player1Index];
      player2 = characters[player2Index];
      currentTurn = 1;
      score = 0;
    };

    let matchId = nextMatchId;
    nextMatchId += 1;
    matches.add(matchId, match);
    matchId;
  };

  public query ({ caller }) func getMatch(matchId : Nat) : async Match {
    switch (matches.get(matchId)) {
      case (null) { Runtime.trap("Match not found") };
      case (?match) { match };
    };
  };
};

import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  type DomainExpansion = {
    name : Text;
    effect : Text;
    powerBoost : Nat;
    damageReduction : Nat;
    defenseBoost : Nat;
  };

  type Character = {
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
    domainExpansion : DomainExpansion;
    personalBest : Nat;
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

  type Battle = {
    player1 : Character;
    player2 : Character;
    currentTurn : Nat;
    score : Nat;
  };

  let battles = Map.empty<Nat, Battle>();

  var nextBattleId = 0;

  let characters = [
    {
      name = "Tyson";
      health = 95;
      attack = 25;
      defense = 20;
      cursedEnergy = 30;
      speed = 18;
      elementalAffinity = "Fire";
      virusType = ?"None";
      abilities = ["Raw Power", "Intimidation"];
      moveset = ["Devastating Hook", "Animal Fury", "Quick Charge"];
      ultimate = "Feral Strike";
      elementalResistances = { fire = 6; lightning = 3; wind = 4 };
      domainExpansion = {
        name = "Domain Expansion: Ironclad";
        effect = "Boosts defense and attack power";
        powerBoost = 15;
        damageReduction = 11;
        defenseBoost = 18;
      };
      personalBest = 0;
    },
    {
      name = "Peter";
      health = 84;
      attack = 13;
      defense = 20;
      cursedEnergy = 10;
      speed = 10;
      elementalAffinity = "None";
      virusType = ?"None";
      abilities = ["Speed Attacks"];
      moveset = ["Quick Stab", "Surprise Attacks"];
      ultimate = "Needle Point";
      elementalResistances = { fire = 3; lightning = 1; wind = 3 };
      domainExpansion = {
        name = "Domain Expansion: Sharp Pincer";
        effect = "Amplifies speed and piercing attacks";
        powerBoost = 13;
        damageReduction = 21;
        defenseBoost = 17;
      };
      personalBest = 0;
    },
    {
      name = "Dustin";
      health = 60;
      attack = 18;
      defense = 12;
      cursedEnergy = 15;
      speed = 12;
      elementalAffinity = "Fire";
      virusType = ?"Fire";
      abilities = ["Hand Attacks", "Combo Techniques"];
      moveset = ["Slap Combo", "Rapid Strikes"];
      ultimate = "Battle Frenzy";
      elementalResistances = { fire = 6; lightning = 5; wind = 6 };
      domainExpansion = {
        name = "Domain Expansion: Rapid Fire";
        effect = "Increases speed and attack variety";
        powerBoost = 18;
        damageReduction = 7;
        defenseBoost = 14;
      };
      personalBest = 0;
    },
    {
      name = "Corey";
      health = 77;
      attack = 13;
      defense = 18;
      cursedEnergy = 8;
      speed = 13;
      elementalAffinity = "Speed";
      virusType = ?"Speed";
      abilities = ["Quick Maneuvers"];
      moveset = ["Fast Strikes", "Agile Dodges"];
      ultimate = "Swift Vengeance";
      elementalResistances = { fire = 10; lightning = 10; wind = 10 };
      domainExpansion = {
        name = "Domain Expansion: Wind Charge";
        effect = "Amplifies speed and movement";
        powerBoost = 14;
        damageReduction = 13;
        defenseBoost = 12;
      };
      personalBest = 0;
    },
    {
      name = "Michael";
      health = 66;
      attack = 11;
      defense = 17;
      cursedEnergy = 7;
      speed = 8;
      elementalAffinity = "None";
      virusType = ?"None";
      abilities = ["Fear Transformation", "Surprise Maneuvers"];
      moveset = ["Power Attacks", "Fear Induction"];
      ultimate = "Fear Mastery";
      elementalResistances = { fire = 7; lightning = 4; wind = 8 };
      domainExpansion = {
        name = "Domain Expansion: Fear Control";
        effect = "Amplifies mental attacks";
        powerBoost = 11;
        damageReduction = 17;
        defenseBoost = 16;
      };
      personalBest = 0;
    },
    {
      name = "Gary Math Teacher";
      health = 85;
      attack = 14;
      defense = 13;
      cursedEnergy = 10;
      speed = 8;
      elementalAffinity = "Mind";
      virusType = ?"Mind";
      abilities = ["Mathematical Techniques", "Precision Attacks"];
      moveset = ["Calculation Strikes", "Counter Attacks"];
      ultimate = "Focus Attack";
      elementalResistances = { fire = 2; lightning = 9; wind = 3 };
      domainExpansion = {
        name = "Domain Expansion: Analytical Edge";
        effect = "Enhances strategic thinking";
        powerBoost = 15;
        damageReduction = 16;
        defenseBoost = 10;
      };
      personalBest = 0;
    },
    {
      name = "Funny Bartender Joey";
      health = 55;
      attack = 20;
      defense = 13;
      cursedEnergy = 9;
      speed = 13;
      elementalAffinity = "Chaos";
      virusType = ?"None";
      abilities = ["Unpredictable Moves", "Alcohol Attacks"];
      moveset = ["Random Strikes", "Dizzying Moves"];
      ultimate = "Raging Bartender";
      elementalResistances = { fire = 3; lightning = 10; wind = 10 };
      domainExpansion = {
        name = "Domain Expansion: Drunk Fury";
        effect = "Increases unpredictability";
        powerBoost = 12;
        damageReduction = 10;
        defenseBoost = 10;
      };
      personalBest = 0;
    },
    {
      name = "Rodney The Rat";
      health = 60;
      attack = 20;
      defense = 14;
      cursedEnergy = 13;
      speed = 13;
      elementalAffinity = "Stealth";
      virusType = ?"None";
      abilities = ["Stealth Attacks", "Quick Escapes"];
      moveset = ["Surprise Attacks", "Rapid Movements"];
      ultimate = "Rat Fury";
      elementalResistances = { fire = 7; lightning = 4; wind = 9 };
      domainExpansion = {
        name = "Domain Expansion: Shadow Pounce";
        effect = "Amplifies stealth and attack";
        powerBoost = 13;
        damageReduction = 21;
        defenseBoost = 17;
      };
      personalBest = 0;
    },
    {
      name = "The Fox";
      health = 45;
      attack = 17;
      defense = 12;
      cursedEnergy = 9;
      speed = 14;
      elementalAffinity = "Illusion";
      virusType = ?"None";
      abilities = ["Illusion Techniques", "Misdirection"];
      moveset = ["Quick Strikes", "Confusing Moves"];
      ultimate = "Spirit Mastery";
      elementalResistances = { fire = 10; lightning = 10; wind = 10 };
      domainExpansion = {
        name = "Domain Expansion: Illusionary Domain";
        effect = "Amplifies manipulation abilities";
        powerBoost = 14;
        damageReduction = 13;
        defenseBoost = 12;
      };
      personalBest = 0;
    },
    {
      name = "Hammerhead";
      health = 63;
      attack = 11;
      defense = 15;
      cursedEnergy = 8;
      speed = 8;
      elementalAffinity = "Water";
      virusType = ?"None";
      abilities = ["Water Techniques", "Headbutt Attacks"];
      moveset = ["Water Attacks", "Strong Defense"];
      ultimate = "Water Surge";
      elementalResistances = { fire = 7; lightning = 4; wind = 8 };
      domainExpansion = {
        name = "Domain Expansion: Water Shield";
        effect = "Amplifies defense";
        powerBoost = 11;
        damageReduction = 17;
        defenseBoost = 16;
      };
      personalBest = 0;
    },
    {
      name = "Peter From The Pier";
      health = 95;
      attack = 13;
      defense = 13;
      cursedEnergy = 18;
      speed = 11;
      elementalAffinity = "Sea";
      virusType = ?"Water";
      abilities = ["Sea Attacks", "Water Manipulation"];
      moveset = ["Manipulation Attacks", "Surprise Techniques"];
      ultimate = "Sea Mastery";
      elementalResistances = { fire = 8; lightning = 7; wind = 4 };
      domainExpansion = {
        name = "Domain Expansion: Oceanic Domain";
        effect = "Enhances water-based techniques";
        powerBoost = 17;
        damageReduction = 9;
        defenseBoost = 13;
      };
      personalBest = 0;
    },
    {
      name = "Smokin Guapo";
      health = 75;
      attack = 9;
      defense = 9;
      cursedEnergy = 8;
      speed = 9;
      elementalAffinity = "Smoke";
      virusType = ?"None";
      abilities = ["Smoke Manipulation", "Quick Attacks"];
      moveset = ["Manipulation Attacks", "Energy Surges"];
      ultimate = "Smoke Mastery";
      elementalResistances = { fire = 7; lightning = 7; wind = 7 };
      domainExpansion = {
        name = "Domain Expansion: Smoke Screen";
        effect = "Enhances smoke-based techniques";
        powerBoost = 11;
        damageReduction = 10;
        defenseBoost = 14;
      };
      personalBest = 0;
    },
    {
      name = "The Boxer";
      health = 72;
      attack = 17;
      defense = 19;
      cursedEnergy = 17;
      speed = 16;
      elementalAffinity = "Physical";
      virusType = ?"None";
      abilities = ["Boxing Techniques", "Quick Strikes"];
      moveset = ["Flame Burst", "Energy Surges"];
      ultimate = "Scorching Assault";
      elementalResistances = { fire = 17; lightning = 9; wind = 9 };
      domainExpansion = {
        name = "Domain Expansion: Boxing Mastery";
        effect = "Enhances boxing techniques";
        powerBoost = 14;
        damageReduction = 17;
        defenseBoost = 18;
      };
      personalBest = 0;
    },
    {
      name = "The Snapper";
      health = 95;
      attack = 25;
      defense = 20;
      cursedEnergy = 30;
      speed = 18;
      elementalAffinity = "Snap";
      virusType = ?"None";
      abilities = ["Quick Snap Attacks", "Focus Techniques"];
      moveset = ["Devastating Hook", "Snap Attacks", "Quick Charge"];
      ultimate = "Snap Strike";
      elementalResistances = { fire = 6; lightning = 3; wind = 4 };
      domainExpansion = {
        name = "Domain Expansion: Focused Fury";
        effect = "Boosts snap attacks";
        powerBoost = 15;
        damageReduction = 11;
        defenseBoost = 18;
      };
      personalBest = 0;
    },
    {
      name = "Counterfeiter";
      health = 60;
      attack = 18;
      defense = 12;
      cursedEnergy = 15;
      speed = 12;
      elementalAffinity = "Deception";
      virusType = ?"None";
      abilities = ["Deceptive Techniques", "Rapid Strikes"];
      moveset = ["Combo Attacks", "Surprise Moves"];
      ultimate = "Deceptive Mastery";
      elementalResistances = { fire = 6; lightning = 5; wind = 6 };
      domainExpansion = {
        name = "Domain Expansion: Deceptive Power";
        effect = "Increases speed and deception variety";
        powerBoost = 12;
        damageReduction = 10;
        defenseBoost = 10;
      };
      personalBest = 0;
    },
    {
      name = "Mighty Max";
      health = 77;
      attack = 13;
      defense = 18;
      cursedEnergy = 8;
      speed = 13;
      elementalAffinity = "Muscle";
      virusType = ?"None";
      abilities = ["Weightlifting Techniques", "Power Moves"];
      moveset = ["Surprise Attacks", "Movement Techniques"];
      ultimate = "Weightlifting Mastery";
      elementalResistances = { fire = 10; lightning = 10; wind = 10 };
      domainExpansion = {
        name = "Domain Expansion: Strength Mastery";
        effect = "Amplifies muscle powers";
        powerBoost = 14;
        damageReduction = 13;
        defenseBoost = 12;
      };
      personalBest = 0;
    },
    {
      name = "Black Panther";
      health = 60;
      attack = 20;
      defense = 14;
      cursedEnergy = 13;
      speed = 13;
      elementalAffinity = "Stealth";
      virusType = ?"None";
      abilities = ["Stealth Attacks", "Spirit Manipulation"];
      moveset = ["Surprise Attacks", "Rapid Movements"];
      ultimate = "Panther Fury";
      elementalResistances = { fire = 7; lightning = 4; wind = 9 };
      domainExpansion = {
        name = "Domain Expansion: Panther Domain";
        effect = "Amplifies stealth and spirit techniques";
        powerBoost = 13;
        damageReduction = 21;
        defenseBoost = 17;
      };
      personalBest = 0;
    },
    {
      name = "The Rooster";
      health = 77;
      attack = 13;
      defense = 18;
      cursedEnergy = 8;
      speed = 13;
      elementalAffinity = "Time";
      virusType = ?"None";
      abilities = ["Time Defense", "Peck Attacks"];
      moveset = ["Surprise Attacks", "Time Tricks"];
      ultimate = "Time Peck";
      elementalResistances = { fire = 10; lightning = 10; wind = 10 };
      domainExpansion = {
        name = "Domain Expansion: Timed Defense";
        effect = "Amplifies time manipulation";
        powerBoost = 14;
        damageReduction = 13;
        defenseBoost = 12;
      };
      personalBest = 0;
    },
    {
      name = "Thunder God";
      health = 60;
      attack = 20;
      defense = 14;
      cursedEnergy = 13;
      speed = 13;
      elementalAffinity = "Lightning";
      virusType = ?"Wind";
      abilities = ["Lightning Manipulation", "Power Attacks"];
      moveset = ["Lightning Attacks", "Wind Manipulation"];
      ultimate = "Thunder Surge";
      elementalResistances = { fire = 7; lightning = 4; wind = 9 };
      domainExpansion = {
        name = "Domain Expansion: Lightning Domain";
        effect = "Amplifies lightning and wind attacks";
        powerBoost = 13;
        damageReduction = 21;
        defenseBoost = 17;
      };
      personalBest = 0;
    },
    {
      name = "The Bulldog";
      health = 110;
      attack = 25;
      defense = 18;
      cursedEnergy = 11;
      speed = 15;
      elementalAffinity = "Earth";
      virusType = ?"Earth";
      abilities = ["Nature Manipulation", "Strong Defense"];
      moveset = ["Nature Attacks", "Stealth Techniques"];
      ultimate = "Earth Resonance Mastery";
      elementalResistances = { fire = 17; lightning = 17; wind = 11 };
      domainExpansion = {
        name = "Domain Expansion: Nature`s Fury";
        effect = "Amplifies earth-based techniques";
        powerBoost = 21;
        damageReduction = 19;
        defenseBoost = 8;
      };
      personalBest = 0;
    },
    {
      name = "Sheldon Slapper";
      health = 105;
      attack = 30;
      defense = 15;
      cursedEnergy = 15;
      speed = 14;
      elementalAffinity = "Water";
      virusType = ?"Water";
      abilities = ["Water Attacks", "Speed Attacks"];
      moveset = ["Agility Surges", "Power Attacks"];
      ultimate = "Slap Mastery";
      elementalResistances = { fire = 8; lightning = 7; wind = 7 };
      domainExpansion = {
        name = "Domain Expansion: Water and Wind";
        effect = "Amplifies water and wind techniques";
        powerBoost = 14;
        damageReduction = 17;
        defenseBoost = 18;
      };
      personalBest = 0;
    },
    {
      name = "Joey The Janitor";
      health = 115;
      attack = 18;
      defense = 16;
      cursedEnergy = 6;
      speed = 15;
      elementalAffinity = "None";
      virusType = ?"None";
      abilities = ["Cleaning Tools', 'Precision Attacks"];
      moveset = ["Cleaning Tool Attacks", "Stealth Techniques"];
      ultimate = "Super Clean";
      elementalResistances = { fire = 9; lightning = 6; wind = 12 };
      domainExpansion = {
        name = "Domain Expansion: Electric Power Clean";
        effect = "Randomized power boosts and attacks";
        powerBoost = 12;
        damageReduction = 12;
        defenseBoost = 25;
      };
      personalBest = 0;
    },
    {
      name = "Mad Scientist";
      health = 105;
      attack = 30;
      defense = 15;
      cursedEnergy = 15;
      speed = 14;
      elementalAffinity = "Electric";
      virusType = ?"Electric";
      abilities = ["Electric Manipulation", "Experiment Attacks"];
      moveset = ["Agility Surges", "Power Attacks"];
      ultimate = "Electric Mastery";
      elementalResistances = { fire = 8; lightning = 7; wind = 7 };
      domainExpansion = {
        name = "Domain Expansion: Electrified Lab";
        effect = "Amplifies water and electric techniques";
        powerBoost = 14;
        damageReduction = 17;
        defenseBoost = 18;
      };
      personalBest = 0;
    },
    {
      name = "Bosco & Frisky";
      health = 43;
      attack = 23;
      defense = 8;
      cursedEnergy = 5;
      speed = 13;
      elementalAffinity = "Mystic";
      virusType = ?"None";
      abilities = ["Cursed Mystic Energy", "Stealth Attacks"];
      moveset = ["Spiritual Attacks", "Dual Attacks"];
      ultimate = "Mystic Dual Strike";
      elementalResistances = { fire = 4; lightning = 3; wind = 5 };
      domainExpansion = {
        name = "Domain Expansion: Mystic Dual Fury";
        effect = "Amplifies mystic and stealth attacks";
        powerBoost = 16;
        damageReduction = 11;
        defenseBoost = 8;
      };
      personalBest = 0;
    },
    {
      name = "Doves";
      health = 72;
      attack = 17;
      defense = 19;
      cursedEnergy = 17;
      speed = 16;
      elementalAffinity = "Peace";
      virusType = ?"None";
      abilities = ["Flight", "Team Attacks"];
      moveset = ["Team Attacks", "Spiritual Attacks"];
      ultimate = "Peace Surge";
      elementalResistances = { fire = 17; lightning = 9; wind = 9 };
      domainExpansion = {
        name = "Domain Expansion: Team Harmony";
        effect = "Manipulates team energy for powerful attacks";
        powerBoost = 19;
        damageReduction = 21;
        defenseBoost = 8;
      };
      personalBest = 0;
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

  public query ({ caller }) func getCharacterByName(name : Text) : async Character {
    for (character in characters.values()) {
      if (character.name == name) {
        return character;
      };
    };
    Runtime.trap("Character not found");
  };

  public query ({ caller }) func getAllCharacters() : async [Character] {
    characters;
  };

  public shared ({ caller }) func executeDomainExpansion(battleId : Nat, playerId : Nat) : async Text {
    let battle = switch (battles.get(battleId)) {
      case (?match) { match };
      case (null) { Runtime.trap("Battle not found") };
    };

    let currentPlayer = if (playerId == 1) { battle.player1 } else { battle.player2 };

    let domainExpansion = currentPlayer.domainExpansion;

    let updatedBattle = {
      battle with player1 = battle.player1;
      player2 = battle.player2;
    };

    battles.add(battleId, updatedBattle);

    "Executing " # currentPlayer.name # "'s " # domainExpansion.name # " with effect: " # domainExpansion.effect;
  };

  public shared ({ caller }) func createBattle(player1Index : Nat, player2Index : Nat) : async Nat {
    if (player1Index >= characters.size() or player2Index >= characters.size()) {
      Runtime.trap("Invalid character selection");
    };

    let battle = {
      player1 = characters[player1Index];
      player2 = characters[player2Index];
      currentTurn = 1;
      score = 0;
    };

    let battleId = nextBattleId;
    nextBattleId += 1;
    battles.add(battleId, battle);
    battleId;
  };

  public query ({ caller }) func getBattle(battleId : Nat) : async Battle {
    switch (battles.get(battleId)) {
      case (null) { Runtime.trap("Battle not found") };
      case (?battle) {
        battle;
      };
    };
  };
};

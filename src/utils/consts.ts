export const pickerSelector = [
  { value: "generations", label: "Generations" },
  { value: "types", label: "Types" },
  { value: "both", label: "Both" },
];

export const pokemonStatusVersion = [
  { value: "normal", label: "Normal" },
  { value: "shiny", label: "Shiny" },
  { value: "both", label: "Both" },
];

export const pokemonsOptions = [
  { value: "starters", label: "Starters" },
  { value: "regionalBird", label: "Regional Bird" },
  { value: "regionalMammal", label: "Regional Mammal" },
  { value: "bug", label: "Regional Bug" },
  { value: "fossil", label: "Fossil" },
  { value: "babyPokemon", label: "Babies" },
  { value: "pikachuClone", label: "Pikachu Clone" },
  { value: "eeveeForm", label: "Eeveelutions" },
  { value: "regionalForm", label: "Regional Variants" },
  { value: "newEvolutionForms", label: "New Evolution" },
  { value: "megaEvolutions", label: "Mega Evolutions" },
  { value: "gigantamaxPokemon", label: "Gigantamax Pokémon" },
  { value: "pseudoLegend", label: "Pseudo Legend" },
  { value: "ultraBeasts", label: "Ultra Beasts" },
  { value: "paradox", label: "Paradox" },
  { value: "boxLegendary", label: "Box Legendary" },
  { value: "legendary", label: "Legendary" },
  { value: "mythicals", label: "Mythicals" },
];

export const SelectRoster = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const GENERATIONS = [
  {
    name: "Generation I",
    start: 1,
    end: 151,
  },
  {
    name: "Generation II",
    start: 152,
    end: 251,
  },

  {
    name: "Generation III",
    start: 252,
    end: 386,
  },
  {
    name: "Generation IV",
    start: 387,
    end: 493,
  },
  {
    name: "Generation V",
    start: 494,
    end: 649,
  },
  {
    name: "Generation VI",
    start: 650,
    end: 721,
  },
  {
    name: "Generation VII",
    start: 722,
    end: 809,
  },
  {
    name: "Generation VIII",
    start: 810,
    end: 905,
  },
  {
    name: "Generation IX",
    start: 906,
    end: 1025,
  },
];

export const regionalBird = [
  { name: "Pidgey", id: 16 },
  { name: "Spearow", id: 21 },
  { name: "Hoothoot", id: 163 },
  { name: "Taillow", id: 276 },
  { name: "Wingull", id: 278 },
  { name: "Starly", id: 396 },
  { name: "Pidove", id: 519 },
  { name: "Fletchling", id: 661 },
  { name: "Pikipek", id: 731 },
  { name: "Rookidee", id: 821 },
  { name: "Squawkabilly", id: 931 },
  { name: "Wattrel", id: 940 },
];

export const regionalMammal = [
  { name: "Rattata", id: 19 },
  { name: "Sentret", id: 161 },
  { name: "Zigzagoon", id: 263 },
  { name: "Bidoof", id: 399 },
  { name: "Patrat", id: 504 },
  { name: "Bunnelby", id: 659 },
  { name: "Yungoos", id: 734 },
  { name: "Rattata (Alola)", id: 10091 },
  { name: "Skwovet", id: 819 },
  { name: "Zigzagoon (Galar)", id: 10174 },
  { name: "Lechonk", id: 915 },
];

export const bug = [
  { name: "Caterpie", id: 10 },
  { name: "Weedle", id: 13 },
  { name: "Ledyba", id: 165 },
  { name: "Spinarak", id: 167 },
  { name: "Wurmple", id: 265 },
  { name: "Kricketot", id: 401 },
  { name: "Sewaddle", id: 540 },
  { name: "Venipede", id: 543 },
  { name: "Scatterbug", id: 664 },
  { name: "Grubbin", id: 736 },
  { name: "Blipbug", id: 824 },
  { name: "Tarountula", id: 917 },
  { name: "Nymble", id: 919 },
];

export const pseudoLegend = [
  { name: "Dragonite", id: 149 },
  { name: "Tyranitar", id: 248 },
  { name: "Salamence", id: 373 },
  { name: "Metagross", id: 376 },
  { name: "Garchomp", id: 445 },
  { name: "Hydreigon", id: 635 },
  { name: "Goodra", id: 706 },
  { name: "Kommo-o", id: 784 },
  { name: "Dragapult", id: 887 },
  { name: "Goodra (Hisui)", id: 10242 },
  { name: "Baxcalibur", id: 998 },
  { name: "Tyranitar (Mega)", id: 10049 },
  { name: "Salamence (Mega)", id: 10089 },
  { name: "Metagross (Mega)", id: 10076 },
  { name: "Garchomp (Mega)", id: 10058 },
];

export const pikachuClone = [
  { name: "Pichu", id: 172 },
  { name: "Pichu (Spiky-eared)", id: 172 }, // Same base form
  { name: "Pichu (Notched)", id: 172 }, // Same base form
  { name: "Pikachu", id: 25 },
  { name: "Raichu", id: 26 },
  { name: "Raichu (Alola)", id: 10100 },
  { name: "Pikachu (Gigantamax)", id: 10199 },
  { name: "Plusle", id: 311 },
  { name: "Minun", id: 312 },
  { name: "Pachirisu", id: 417 },
  { name: "Emolga", id: 587 },
  { name: "Dedenne", id: 702 },
  { name: "Togedemaru", id: 777 },
  { name: "Mimikyu", id: 778 },
  { name: "Mimikyu (Busted)", id: 10143 },
  { name: "Morpeko", id: 877 },
  { name: "Morpeko (Hangry)", id: 10187 },
  { name: "Pawmi", id: 921 },
  { name: "Pawmo", id: 922 },
  { name: "Pawmot", id: 923 },
  { name: "Pikachu (Rock Star)", id: 10080 },
  { name: "Pikachu (Belle)", id: 10081 },
  { name: "Pikachu (Pop Star)", id: 10082 },
  { name: "Pikachu (PhD)", id: 10083 },
  { name: "Pikachu (Libre)", id: 10084 },
  { name: "Pikachu (Cosplay)", id: 10085 },
  { name: "Pikachu (Original Cap)", id: 10094 },
  { name: "Pikachu (Hoenn Cap)", id: 10095 },
  { name: "Pikachu (Sinnoh Cap)", id: 10096 },
  { name: "Pikachu (Unova Cap)", id: 10097 },
  { name: "Pikachu (Kalos Cap)", id: 10098 },
  { name: "Pikachu (Alola Cap)", id: 10099 },
  { name: "Pikachu (Partner Cap)", id: 10148 },
  { name: "Pikachu (World Cap)", id: 10160 },
  { name: "Pikachu (Starter)", id: 10158 },
];

export const eeveeForm = [
  { name: "Eevee", id: 133 },
  { name: "Vaporeon", id: 134 },
  { name: "Jolteon", id: 135 },
  { name: "Flareon", id: 136 },
  { name: "Espeon", id: 196 },
  { name: "Umbreon", id: 197 },
  { name: "Leafeon", id: 470 },
  { name: "Glaceon", id: 471 },
  { name: "Sylveon", id: 700 },
  { name: "Eevee (Gigantamax)", id: 10205 },
];

export const fossil = [
  { name: "Omanyte", id: 138 },
  { name: "Omastar", id: 139 },
  { name: "Kabuto", id: 140 },
  { name: "Kabutops", id: 141 },
  { name: "Aerodactyl", id: 142 },
  { name: "Aerodactyl (Mega)", id: 10042 },
  { name: "Lileep", id: 345 },
  { name: "Cradily", id: 346 },
  { name: "Anorith", id: 347 },
  { name: "Armaldo", id: 348 },
  { name: "Cranidos", id: 408 },
  { name: "Rampardos", id: 409 },
  { name: "Shieldon", id: 410 },
  { name: "Bastiodon", id: 411 },
  { name: "Tirtouga", id: 564 },
  { name: "Carracosta", id: 565 },
  { name: "Archen", id: 566 },
  { name: "Archeops", id: 567 },
  { name: "Tyrunt", id: 696 },
  { name: "Tyrantrum", id: 697 },
  { name: "Amaura", id: 698 },
  { name: "Aurorus", id: 699 },
  { name: "Dracozolt", id: 880 },
  { name: "Arctozolt", id: 881 },
  { name: "Dracovish", id: 882 },
  { name: "Arctovish", id: 883 },
];

export const regionalForm = [
  { name: "Rattata (Alola)", id: 10091 },
  { name: "Raticate (Alola)", id: 10092 },
  { name: "Raichu (Alola)", id: 10100 },
  { name: "Sandshrew (Alola)", id: 10101 },
  { name: "Sandslash (Alola)", id: 10102 },
  { name: "Vulpix (Alola)", id: 10103 },
  { name: "Ninetales (Alola)", id: 10104 },
  { name: "Diglett (Alola)", id: 10105 },
  { name: "Dugtrio (Alola)", id: 10106 },
  { name: "Meowth (Alola)", id: 10107 },
  { name: "Meowth (Galar)", id: 10161 },
  { name: "Persian (Alola)", id: 10108 },
  { name: "Geodude (Alola)", id: 10109 },
  { name: "Graveler (Alola)", id: 10110 },
  { name: "Golem (Alola)", id: 10111 },
  { name: "Ponyta (Galar)", id: 10162 },
  { name: "Rapidash (Galar)", id: 10163 },
  { name: "Slowpoke (Galar)", id: 10164 },
  { name: "Slowbro (Galar)", id: 10165 },
  { name: "Farfetch'd (Galar)", id: 10166 },
  { name: "Grimer (Alola)", id: 10112 },
  { name: "Muk (Alola)", id: 10113 },
  { name: "Exeggutor (Alola)", id: 10114 },
  { name: "Marowak (Alola)", id: 10115 },
  { name: "Weezing (Galar)", id: 10167 },
  { name: "Mr. Mime (Galar)", id: 10168 },
  { name: "Articuno (Galar)", id: 10169 },
  { name: "Zapdos (Galar)", id: 10170 },
  { name: "Moltres (Galar)", id: 10171 },
  { name: "Slowking (Galar)", id: 10172 },
  { name: "Corsola (Galar)", id: 10173 },
  { name: "Zigzagoon (Galar)", id: 10174 },
  { name: "Linoone (Galar)", id: 10175 },
  { name: "Darumaka (Galar)", id: 10176 },
  { name: "Darmanitan (Galar)", id: 10177 },
  { name: "Darmanitan (Galar Zen)", id: 10178 },
  { name: "Yamask (Galar)", id: 10179 },
  { name: "Stunfisk (Galar)", id: 10180 },
  { name: "Growlithe (Hisui)", id: 10229 },
  { name: "Arcanine (Hisui)", id: 10230 },
  { name: "Voltorb (Hisui)", id: 10231 },
  { name: "Electrode (Hisui)", id: 10232 },
  { name: "Typhlosion (Hisui)", id: 10233 },
  { name: "Qwilfish (Hisui)", id: 10234 },
  { name: "Sneasel (Hisui)", id: 10235 },
  { name: "Samurott (Hisui)", id: 10236 },
  { name: "Lilligant (Hisui)", id: 10237 },
  { name: "Zorua (Hisui)", id: 10238 },
  { name: "Zoroark (Hisui)", id: 10239 },
  { name: "Basculin (White-Striped)", id: 10247 },
  { name: "Braviary (Hisui)", id: 10240 },
  { name: "Sliggoo (Hisui)", id: 10241 },
  { name: "Goodra (Hisui)", id: 10242 },
  { name: "Avalugg (Hisui)", id: 10243 },
  { name: "Decidueye (Hisui)", id: 10244 },
  { name: "Wooper (Paldea)", id: 10253 },
  { name: "Tauros (Paldea Combat)", id: 10250 },
  { name: "Tauros (Paldea Blaze)", id: 10251 },
  { name: "Tauros (Paldea Aqua)", id: 10252 },
];

export const gigantamaxForms = [
  { name: "Venusaur (Gigantamax)", id: 10195 },
  { name: "Charizard (Gigantamax)", id: 10196 },
  { name: "Blastoise (Gigantamax)", id: 10197 },
  { name: "Butterfree (Gigantamax)", id: 10198 },
  { name: "Pikachu (Gigantamax)", id: 10199 },
  { name: "Meowth (Gigantamax)", id: 10200 },
  { name: "Machamp (Gigantamax)", id: 10201 },
  { name: "Gengar (Gigantamax)", id: 10202 },
  { name: "Kingler (Gigantamax)", id: 10203 },
  { name: "Lapras (Gigantamax)", id: 10204 },
  { name: "Eevee (Gigantamax)", id: 10205 },
  { name: "Snorlax (Gigantamax)", id: 10206 },
  { name: "Garbodor (Gigantamax)", id: 10207 },
  { name: "Melmetal (Gigantamax)", id: 10208 },
  { name: "Rillaboom (Gigantamax)", id: 10209 },
  { name: "Cinderace (Gigantamax)", id: 10210 },
  { name: "Inteleon (Gigantamax)", id: 10211 },
  { name: "Corviknight (Gigantamax)", id: 10212 },
  { name: "Orbeetle (Gigantamax)", id: 10213 },
  { name: "Drednaw (Gigantamax)", id: 10214 },
  { name: "Coalossal (Gigantamax)", id: 10215 },
  { name: "Appletun (Gigantamax)", id: 10217 },
  { name: "Sandaconda (Gigantamax)", id: 10218 },
  { name: "Toxtricity (Gigantamax)", id: 10219 },
  { name: "Centiskorch (Gigantamax)", id: 10220 },
  { name: "Hatterene (Gigantamax)", id: 10221 },
  { name: "Grimmsnarl (Gigantamax)", id: 10222 },
  { name: "Alcremie (Gigantamax)", id: 10223 },
  { name: "Copperajah (Gigantamax)", id: 10224 },
  { name: "Duraludon (Gigantamax)", id: 10225 },
  { name: "Eternatus (Eternamax)", id: 10190 },
  { name: "Urshifu Single Strike (Gigantamax)", id: 10226 },
  { name: "Urshifu Rapid Strike (Gigantamax)", id: 10227 },
];

export const boxLegendary = [
  { name: "Ho-Oh", id: 250 },
  { name: "Lugia", id: 249 },
  { name: "Suicune", id: 245 },
  { name: "Groudon", id: 383 },
  { name: "Kyogre", id: 382 },
  { name: "Rayquaza", id: 384 },
  { name: "Lugia (Shadow)", id: 249 }, // Same ID as regular Lugia
  { name: "Dialga", id: 483 },
  { name: "Palkia", id: 484 },
  { name: "Giratina (Origin)", id: 10007 },
  { name: "Reshiram", id: 643 },
  { name: "Zekrom", id: 644 },
  { name: "Kyurem (Black)", id: 10022 },
  { name: "Kyurem (White)", id: 10023 },
  { name: "Xerneas", id: 716 },
  { name: "Yveltal", id: 717 },
  { name: "Groudon (Primal)", id: 10078 },
  { name: "Kyogre (Primal)", id: 10077 },
  { name: "Solgaleo", id: 791 },
  { name: "Lunala", id: 792 },
  { name: "Necrozma (Dusk Mane)", id: 10155 },
  { name: "Necrozma (Dawn Wings)", id: 10156 },
  { name: "Zacian (Crowned)", id: 10188 },
  { name: "Zamazenta (Crowned)", id: 10189 },
  { name: "Arceus", id: 493 },
  { name: "Koraidon", id: 1007 },
  { name: "Miraidon", id: 1008 },
];

export const mythical = [
  { name: "Mew", id: 151 },
  { name: "Celebi", id: 251 },
  { name: "Jirachi", id: 385 },
  { name: "Deoxys", id: 386 },
  { name: "Deoxys (Attack)", id: 10001 },
  { name: "Deoxys (Defense)", id: 10002 },
  { name: "Deoxys (Speed)", id: 10003 },
  { name: "Phione", id: 489 },
  { name: "Manaphy", id: 490 },
  { name: "Darkrai", id: 491 },
  { name: "Shaymin", id: 492 },
  { name: "Shaymin (Sky)", id: 10006 },
  { name: "Arceus", id: 493 },
  { name: "Victini", id: 494 },
  { name: "Keldeo", id: 647 },
  { name: "Keldeo (Resolute)", id: 10024 },
  { name: "Meloetta", id: 648 },
  { name: "Meloetta (Pirouette)", id: 10018 },
  { name: "Genesect", id: 649 },
  { name: "Diancie", id: 719 },
  { name: "Diancie (Mega)", id: 10075 },
  { name: "Hoopa", id: 720 },
  { name: "Hoopa (Unbound)", id: 10086 },
  { name: "Volcanion", id: 721 },
  { name: "Magearna", id: 801 },
  { name: "Magearna (Original)", id: 10147 },
  { name: "Marshadow", id: 802 },
  { name: "Marshadow (Zenith)", id: 802 }, // Same ID
  { name: "Zeraora", id: 807 },
  { name: "Meltan", id: 808 },
  { name: "Melmetal", id: 809 },
  { name: "Melmetal (Gigantamax)", id: 10208 },
  { name: "Zarude", id: 893 },
  { name: "Zarude (Dada)", id: 10192 },
  { name: "Pecharunt", id: 1025 },
];

export const ultraBeast = [
  { name: "Nihilego", id: 793 },
  { name: "Buzzwole", id: 794 },
  { name: "Pheromosa", id: 795 },
  { name: "Xurkitree", id: 796 },
  { name: "Celesteela", id: 797 },
  { name: "Kartana", id: 798 },
  { name: "Guzzlord", id: 799 },
  { name: "Poipole", id: 803 },
  { name: "Naganadel", id: 804 },
  { name: "Stakataka", id: 805 },
  { name: "Blacephalon", id: 806 },
];

export const paradox = [
  { name: "Great Tusk", id: 984 },
  { name: "Scream Tail", id: 985 },
  { name: "Brute Bonnet", id: 986 },
  { name: "Flutter Mane", id: 987 },
  { name: "Slither Wing", id: 988 },
  { name: "Sandy Shocks", id: 989 },
  { name: "Roaring Moon", id: 1005 },
  { name: "Koraidon", id: 1007 },
  { name: "Iron Treads", id: 990 },
  { name: "Iron Bundle", id: 991 },
  { name: "Iron Hands", id: 992 },
  { name: "Iron Jugulis", id: 993 },
  { name: "Iron Moth", id: 994 },
  { name: "Iron Thorns", id: 995 },
  { name: "Iron Valiant", id: 1006 },
  { name: "Miraidon", id: 1008 },
  { name: "Walking Wake", id: 1009 },
  { name: "Iron Leaves", id: 1010 },
  { name: "Gouging Fire", id: 1020 },
  { name: "Raging Bolt", id: 1021 },
  { name: "Iron Boulder", id: 1022 },
  { name: "Iron Crown", id: 1023 },
];

export const starters = [
  // Generation 1 - Kanto
  { name: "Bulbasaur", id: 1 },
  { name: "Ivysaur", id: 2 },
  { name: "Venusaur", id: 3 },
  { name: "Charmander", id: 4 },
  { name: "Charmeleon", id: 5 },
  { name: "Charizard", id: 6 },
  { name: "Squirtle", id: 7 },
  { name: "Wartortle", id: 8 },
  { name: "Blastoise", id: 9 },

  // Generation 2 - Johto
  { name: "Chikorita", id: 152 },
  { name: "Bayleef", id: 153 },
  { name: "Meganium", id: 154 },
  { name: "Cyndaquil", id: 155 },
  { name: "Quilava", id: 156 },
  { name: "Typhlosion", id: 157 },
  { name: "Totodile", id: 158 },
  { name: "Croconaw", id: 159 },
  { name: "Feraligatr", id: 160 },

  // Generation 3 - Hoenn
  { name: "Treecko", id: 252 },
  { name: "Grovyle", id: 253 },
  { name: "Sceptile", id: 254 },
  { name: "Torchic", id: 255 },
  { name: "Combusken", id: 256 },
  { name: "Blaziken", id: 257 },
  { name: "Mudkip", id: 258 },
  { name: "Marshtomp", id: 259 },
  { name: "Swampert", id: 260 },

  // Generation 4 - Sinnoh
  { name: "Turtwig", id: 387 },
  { name: "Grotle", id: 388 },
  { name: "Torterra", id: 389 },
  { name: "Chimchar", id: 390 },
  { name: "Monferno", id: 391 },
  { name: "Infernape", id: 392 },
  { name: "Piplup", id: 393 },
  { name: "Prinplup", id: 394 },
  { name: "Empoleon", id: 395 },

  // Generation 5 - Unova
  { name: "Snivy", id: 495 },
  { name: "Servine", id: 496 },
  { name: "Serperior", id: 497 },
  { name: "Tepig", id: 498 },
  { name: "Pignite", id: 499 },
  { name: "Emboar", id: 500 },
  { name: "Oshawott", id: 501 },
  { name: "Dewott", id: 502 },
  { name: "Samurott", id: 503 },

  // Generation 6 - Kalos
  { name: "Chespin", id: 650 },
  { name: "Quilladin", id: 651 },
  { name: "Chesnaught", id: 652 },
  { name: "Fennekin", id: 653 },
  { name: "Braixen", id: 654 },
  { name: "Delphox", id: 655 },
  { name: "Froakie", id: 656 },
  { name: "Frogadier", id: 657 },
  { name: "Greninja", id: 658 },

  // Generation 7 - Alola
  { name: "Rowlet", id: 722 },
  { name: "Dartrix", id: 723 },
  { name: "Decidueye", id: 724 },
  { name: "Litten", id: 725 },
  { name: "Torracat", id: 726 },
  { name: "Incineroar", id: 727 },
  { name: "Popplio", id: 728 },
  { name: "Brionne", id: 729 },
  { name: "Primarina", id: 730 },

  // Generation 8 - Galar
  { name: "Grookey", id: 810 },
  { name: "Thwackey", id: 811 },
  { name: "Rillaboom", id: 812 },
  { name: "Scorbunny", id: 813 },
  { name: "Raboot", id: 814 },
  { name: "Cinderace", id: 815 },
  { name: "Sobble", id: 816 },
  { name: "Drizzile", id: 817 },
  { name: "Inteleon", id: 818 },

  // Generation 9 - Paldea
  { name: "Sprigatito", id: 906 },
  { name: "Floragato", id: 907 },
  { name: "Meowscarada", id: 908 },
  { name: "Fuecoco", id: 909 },
  { name: "Crocalor", id: 910 },
  { name: "Skeledirge", id: 911 },
  { name: "Quaxly", id: 912 },
  { name: "Quaxwell", id: 913 },
  { name: "Quaquaval", id: 914 },

  // Regional Variants
  { name: "Typhlosion (Hisui)", id: 10233 },
  { name: "Samurott (Hisui)", id: 10236 },
  { name: "Decidueye (Hisui)", id: 10244 },

  // Mega Evolutions
  { name: "Venusaur (Mega)", id: 10033 },
  { name: "Charizard (Mega X)", id: 10034 },
  { name: "Charizard (Mega Y)", id: 10035 },
  { name: "Blastoise (Mega)", id: 10036 },
  { name: "Sceptile (Mega)", id: 10065 },
  { name: "Blaziken (Mega)", id: 10050 },
  { name: "Swampert (Mega)", id: 10064 },

  // Gigantamax Forms
  { name: "Venusaur (Gigantamax)", id: 10195 },
  { name: "Charizard (Gigantamax)", id: 10196 },
  { name: "Blastoise (Gigantamax)", id: 10197 },
  { name: "Rillaboom (Gigantamax)", id: 10209 },
  { name: "Cinderace (Gigantamax)", id: 10210 },
  { name: "Inteleon (Gigantamax)", id: 10211 },

  // Special Forms
  { name: "Greninja (Ash)", id: 10117 },
  { name: "Greninja (Battle Bond)", id: 10116 },
];

export const newEvolutionForms = [
  // Generation 2 additions for Generation 1 Pokémon
  { name: "Crobat", id: 169 }, // Evolution of Golbat (Gen 1)
  { name: "Bellossom", id: 182 }, // Alternate evolution of Gloom (Gen 1)
  { name: "Politoed", id: 186 }, // Alternate evolution of Poliwhirl (Gen 1)
  { name: "Espeon", id: 196 }, // New Eevee evolution (Gen 1)
  { name: "Umbreon", id: 197 }, // New Eevee evolution (Gen 1)
  { name: "Slowking", id: 199 }, // Alternate evolution of Slowpoke (Gen 1)
  { name: "Steelix", id: 208 }, // Evolution of Onix (Gen 1)
  { name: "Scizor", id: 212 }, // Evolution of Scyther (Gen 1)
  { name: "Kingdra", id: 230 }, // Evolution of Seadra (Gen 1)
  { name: "Porygon2", id: 233 }, // Evolution of Porygon (Gen 1)
  { name: "Blissey", id: 242 }, // Evolution of Chansey (Gen 1)

  // Generation 4 additions for earlier generation Pokémon
  { name: "Roserade", id: 407 }, // Evolution of Roselia (Gen 3)
  { name: "Ambipom", id: 424 }, // Evolution of Aipom (Gen 2)
  { name: "Mismagius", id: 429 }, // Evolution of Misdreavus (Gen 2)
  { name: "Honchkrow", id: 430 }, // Evolution of Murkrow (Gen 2)
  { name: "Weavile", id: 461 }, // Evolution of Sneasel (Gen 1)
  { name: "Magnezone", id: 462 }, // Evolution of Magneton (Gen 1)
  { name: "Lickilicky", id: 463 }, // Evolution of Lickitung (Gen 1)
  { name: "Rhyperior", id: 464 }, // Evolution of Rhydon (Gen 1)
  { name: "Tangrowth", id: 465 }, // Evolution of Tangela (Gen 1)
  { name: "Electivire", id: 466 }, // Evolution of Electabuzz (Gen 1)
  { name: "Magmortar", id: 467 }, // Evolution of Magmar (Gen 1)
  { name: "Togekiss", id: 468 }, // Evolution of Togetic (Gen 2)
  { name: "Yanmega", id: 469 }, // Evolution of Yanma (Gen 2)
  { name: "Leafeon", id: 470 }, // New Eevee evolution (Gen 1)
  { name: "Glaceon", id: 471 }, // New Eevee evolution (Gen 1)
  { name: "Gliscor", id: 472 }, // Evolution of Gligar (Gen 2)
  { name: "Mamoswine", id: 473 }, // Evolution of Piloswine (Gen 2)
  { name: "Porygon-Z", id: 474 }, // Evolution of Porygon2 (Gen 2)
  { name: "Gallade", id: 475 }, // Evolution of Kirlia (Gen 3, male only)
  { name: "Probopass", id: 476 }, // Evolution of Nosepass (Gen 3)
  { name: "Dusknoir", id: 477 }, // Evolution of Dusclops (Gen 3)
  { name: "Froslass", id: 478 }, // Evolution of Snorunt (Gen 3, female only)

  // Generation 6 additions
  { name: "Sylveon", id: 700 }, // New Eevee evolution (Gen 1)

  // Generation 8 additions for regional variants
  { name: "Obstagoon", id: 862 }, // Evolution of Galarian Linoone
  { name: "Perrserker", id: 863 }, // Evolution of Galarian Meowth
  { name: "Cursola", id: 864 }, // Evolution of Galarian Corsola
  { name: "Sirfetch'd", id: 865 }, // Evolution of Galarian Farfetch'd
  { name: "Mr. Rime", id: 866 }, // Evolution of Galarian Mr. Mime
  { name: "Runerigus", id: 867 }, // Evolution of Galarian Yamask

  // Legends Arceus additions (Generation 8 DLC)
  { name: "Wyrdeer", id: 899 }, // Evolution of Stantler (Gen 2)
  { name: "Kleavor", id: 900 }, // Evolution of Scyther (Gen 1)
  { name: "Ursaluna", id: 901 }, // Evolution of Ursaring (Gen 2)
  { name: "Basculegion", id: 902 }, // Evolution of White-Striped Basculin
  { name: "Sneasler", id: 903 }, // Evolution of Hisuian Sneasel
  { name: "Overqwil", id: 904 }, // Evolution of Hisuian Qwilfish

  // Generation 9 additions
  { name: "Annihilape", id: 979 }, // Evolution of Primeape (Gen 1)
  { name: "Clodsire", id: 980 }, // Evolution of Paldean Wooper
  { name: "Farigiraf", id: 981 }, // Evolution of Girafarig (Gen 2)
  { name: "Dudunsparce", id: 982 }, // Evolution of Dunsparce (Gen 2)
  { name: "Kingambit", id: 983 }, // Evolution of Bisharp (Gen 5)
  { name: "Gholdengo", id: 1000 }, // Evolution of Gimmighoul (Gen 9)

  // Generation 9 DLC additions
  { name: "Archaludon", id: 1018 }, // Evolution of Duraludon (Gen 8)
  { name: "Hydrapple", id: 1019 }, // Evolution of Dipplin (which evolves from Applin)

  // Regional variant evolutions
  { name: "Basculegion (Female)", id: 10248 }, // Female form
  { name: "Ursaluna (Bloodmoon)", id: 10272 }, // Special form
];

export const babyPokemon = [
  // Generation 2 babies
  { name: "Pichu", id: 172 },
  { name: "Cleffa", id: 173 },
  { name: "Igglybuff", id: 174 },
  { name: "Togepi", id: 175 },
  { name: "Tyrogue", id: 236 },
  { name: "Smoochum", id: 238 },
  { name: "Elekid", id: 239 },
  { name: "Magby", id: 240 },

  // Generation 3 babies
  { name: "Azurill", id: 298 },
  { name: "Wynaut", id: 360 },

  // Generation 4 babies
  { name: "Budew", id: 406 },
  { name: "Chingling", id: 433 },
  { name: "Bonsly", id: 438 },
  { name: "Mime Jr.", id: 439 },
  { name: "Happiny", id: 440 },
  { name: "Munchlax", id: 446 },
  { name: "Riolu", id: 447 },
  { name: "Mantyke", id: 458 },

  // Regional variants
  { name: "Pichu (Spiky-eared)", id: 172 }, // Same ID as regular Pichu
];

export const legendaryPokemon = [
  // Generation 1
  { name: "Articuno", id: 144 },
  { name: "Zapdos", id: 145 },
  { name: "Moltres", id: 146 },
  { name: "Mewtwo", id: 150 },
  { name: "Mew", id: 151 },

  // Generation 2
  { name: "Raikou", id: 243 },
  { name: "Entei", id: 244 },
  { name: "Suicune", id: 245 },
  { name: "Lugia", id: 249 },
  { name: "Ho-Oh", id: 250 },
  { name: "Celebi", id: 251 },

  // Generation 3
  { name: "Regirock", id: 377 },
  { name: "Regice", id: 378 },
  { name: "Registeel", id: 379 },
  { name: "Latias", id: 380 },
  { name: "Latios", id: 381 },
  { name: "Kyogre", id: 382 },
  { name: "Groudon", id: 383 },
  { name: "Rayquaza", id: 384 },
  { name: "Jirachi", id: 385 },
  { name: "Deoxys", id: 386 },

  // Generation 4
  { name: "Uxie", id: 480 },
  { name: "Mesprit", id: 481 },
  { name: "Azelf", id: 482 },
  { name: "Dialga", id: 483 },
  { name: "Palkia", id: 484 },
  { name: "Heatran", id: 485 },
  { name: "Regigigas", id: 486 },
  { name: "Giratina", id: 487 },
  { name: "Cresselia", id: 488 },
  { name: "Phione", id: 489 },
  { name: "Manaphy", id: 490 },
  { name: "Darkrai", id: 491 },
  { name: "Shaymin", id: 492 },
  { name: "Arceus", id: 493 },

  // Generation 5
  { name: "Victini", id: 494 },
  { name: "Cobalion", id: 638 },
  { name: "Terrakion", id: 639 },
  { name: "Virizion", id: 640 },
  { name: "Tornadus", id: 641 },
  { name: "Thundurus", id: 642 },
  { name: "Reshiram", id: 643 },
  { name: "Zekrom", id: 644 },
  { name: "Landorus", id: 645 },
  { name: "Kyurem", id: 646 },
  { name: "Keldeo", id: 647 },
  { name: "Meloetta", id: 648 },
  { name: "Genesect", id: 649 },

  // Generation 6
  { name: "Xerneas", id: 716 },
  { name: "Yveltal", id: 717 },
  { name: "Zygarde", id: 718 },
  { name: "Diancie", id: 719 },
  { name: "Hoopa", id: 720 },
  { name: "Volcanion", id: 721 },

  // Generation 7
  { name: "Tapu Koko", id: 785 },
  { name: "Tapu Lele", id: 786 },
  { name: "Tapu Bulu", id: 787 },
  { name: "Tapu Fini", id: 788 },
  { name: "Cosmog", id: 789 },
  { name: "Cosmoem", id: 790 },
  { name: "Solgaleo", id: 791 },
  { name: "Lunala", id: 792 },
  { name: "Necrozma", id: 800 },
  { name: "Magearna", id: 801 },
  { name: "Marshadow", id: 802 },
  { name: "Zeraora", id: 807 },
  { name: "Meltan", id: 808 },
  { name: "Melmetal", id: 809 },

  // Generation 8
  { name: "Zacian", id: 888 },
  { name: "Zamazenta", id: 889 },
  { name: "Eternatus", id: 890 },
  { name: "Kubfu", id: 891 },
  { name: "Urshifu", id: 892 },
  { name: "Zarude", id: 893 },
  { name: "Regieleki", id: 894 },
  { name: "Regidrago", id: 895 },
  { name: "Glastrier", id: 896 },
  { name: "Spectrier", id: 897 },
  { name: "Calyrex", id: 898 },
  { name: "Enamorus", id: 905 },

  // Generation 9
  { name: "Wo-Chien", id: 1001 },
  { name: "Chien-Pao", id: 1002 },
  { name: "Ting-Lu", id: 1003 },
  { name: "Chi-Yu", id: 1004 },
  { name: "Koraidon", id: 1007 },
  { name: "Miraidon", id: 1008 },
  { name: "Okidogi", id: 1014 },
  { name: "Munkidori", id: 1015 },
  { name: "Fezandipiti", id: 1016 },
  { name: "Ogerpon", id: 1017 },
  { name: "Terapagos", id: 1024 },
  { name: "Pecharunt", id: 1025 },
];

export const megaEvolutions = [
  { name: "Venusaur (Mega)", id: 10033 },
  { name: "Charizard (Mega X)", id: 10034 },
  { name: "Charizard (Mega Y)", id: 10035 },
  { name: "Blastoise (Mega)", id: 10036 },
  { name: "Alakazam (Mega)", id: 10037 },
  { name: "Gengar (Mega)", id: 10038 },
  { name: "Kangaskhan (Mega)", id: 10039 },
  { name: "Pinsir (Mega)", id: 10040 },
  { name: "Gyarados (Mega)", id: 10041 },
  { name: "Aerodactyl (Mega)", id: 10042 },
  { name: "Mewtwo (Mega X)", id: 10043 },
  { name: "Mewtwo (Mega Y)", id: 10044 },
  { name: "Ampharos (Mega)", id: 10045 },
  { name: "Scizor (Mega)", id: 10046 },
  { name: "Heracross (Mega)", id: 10047 },
  { name: "Houndoom (Mega)", id: 10048 },
  { name: "Tyranitar (Mega)", id: 10049 },
  { name: "Blaziken (Mega)", id: 10050 },
  { name: "Gardevoir (Mega)", id: 10051 },
  { name: "Mawile (Mega)", id: 10052 },
  { name: "Aggron (Mega)", id: 10053 },
  { name: "Medicham (Mega)", id: 10054 },
  { name: "Manectric (Mega)", id: 10055 },
  { name: "Banette (Mega)", id: 10056 },
  { name: "Absol (Mega)", id: 10057 },
  { name: "Garchomp (Mega)", id: 10058 },
  { name: "Lucario (Mega)", id: 10059 },
  { name: "Abomasnow (Mega)", id: 10060 },
  { name: "Latias (Mega)", id: 10062 },
  { name: "Latios (Mega)", id: 10063 },
  { name: "Swampert (Mega)", id: 10064 },
  { name: "Sceptile (Mega)", id: 10065 },
  { name: "Sableye (Mega)", id: 10066 },
  { name: "Altaria (Mega)", id: 10067 },
  { name: "Gallade (Mega)", id: 10068 },
  { name: "Audino (Mega)", id: 10069 },
  { name: "Sharpedo (Mega)", id: 10070 },
  { name: "Slowbro (Mega)", id: 10071 },
  { name: "Steelix (Mega)", id: 10072 },
  { name: "Pidgeot (Mega)", id: 10073 },
  { name: "Glalie (Mega)", id: 10074 },
  { name: "Diancie (Mega)", id: 10075 },
  { name: "Metagross (Mega)", id: 10076 },
  { name: "Kyogre (Primal)", id: 10077 },
  { name: "Groudon (Primal)", id: 10078 },
  { name: "Rayquaza (Mega)", id: 10079 },
  { name: "Camerupt (Mega)", id: 10087 },
  { name: "Lopunny (Mega)", id: 10088 },
  { name: "Salamence (Mega)", id: 10089 },
  { name: "Beedrill (Mega)", id: 10090 },
];

export const gigantamaxPokemon = [
  { name: "Venusaur (Gigantamax)", id: 10195 },
  { name: "Charizard (Gigantamax)", id: 10196 },
  { name: "Blastoise (Gigantamax)", id: 10197 },
  { name: "Butterfree (Gigantamax)", id: 10198 },
  { name: "Pikachu (Gigantamax)", id: 10199 },
  { name: "Meowth (Gigantamax)", id: 10200 },
  { name: "Machamp (Gigantamax)", id: 10201 },
  { name: "Gengar (Gigantamax)", id: 10202 },
  { name: "Kingler (Gigantamax)", id: 10203 },
  { name: "Lapras (Gigantamax)", id: 10204 },
  { name: "Eevee (Gigantamax)", id: 10205 },
  { name: "Snorlax (Gigantamax)", id: 10206 },
  { name: "Garbodor (Gigantamax)", id: 10207 },
  { name: "Melmetal (Gigantamax)", id: 10208 },
  { name: "Rillaboom (Gigantamax)", id: 10209 },
  { name: "Cinderace (Gigantamax)", id: 10210 },
  { name: "Inteleon (Gigantamax)", id: 10211 },
  { name: "Corviknight (Gigantamax)", id: 10212 },
  { name: "Orbeetle (Gigantamax)", id: 10213 },
  { name: "Drednaw (Gigantamax)", id: 10214 },
  { name: "Coalossal (Gigantamax)", id: 10215 },
  { name: "Flapple (Gigantamax)", id: 10216 },
  { name: "Appletun (Gigantamax)", id: 10217 },
  { name: "Sandaconda (Gigantamax)", id: 10218 },
  { name: "Toxtricity (Amped Gigantamax)", id: 10219 },
  { name: "Centiskorch (Gigantamax)", id: 10220 },
  { name: "Hatterene (Gigantamax)", id: 10221 },
  { name: "Grimmsnarl (Gigantamax)", id: 10222 },
  { name: "Alcremie (Gigantamax)", id: 10223 },
  { name: "Copperajah (Gigantamax)", id: 10224 },
  { name: "Duraludon (Gigantamax)", id: 10225 },
  { name: "Urshifu Single Strike (Gigantamax)", id: 10226 },
  { name: "Urshifu Rapid Strike (Gigantamax)", id: 10227 },
  { name: "Toxtricity Low Key (Gigantamax)", id: 10228 },
  { name: "Eternatus (Eternamax)", id: 10190 },
];
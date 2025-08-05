import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { extractPokemonIdFromUrl } from "@/utils/functions";
import {
  GENERATIONS,
  starters,
  regionalBird,
  regionalMammal,
  bug,
  fossil,
  babyPokemon,
  pikachuClone,
  eeveeForm,
  regionalForm,
  newEvolutionForms,
  megaEvolutions,
  gigantamaxPokemon,
  pseudoLegend,
  ultraBeast,
  paradox,
  boxLegendary,
  legendaryPokemon,
  mythical,
} from "@/utils/consts";
import type { PokeAPI } from "pokeapi-types";

interface PokemonCardListProps {
  data: PokeAPI.TypePokemon[] | PokeAPI.NamedAPIResource[] | any[];
  selector?: "types" | "generations" | "optionals" | "both";
  currentType?: string;
  currentGenerationIndex?: number;
  showId?: boolean;
  showGenerationBadge?: boolean;
  currentCategory?: string; // Nouvelle prop pour la catégorie actuelle
}

export function PokemonCardList({
  data,
  selector = "optionals",
  currentType,
  currentGenerationIndex = 0,
  showId = false,
  showGenerationBadge = false,
  currentCategory, // Nouvelle prop
}: PokemonCardListProps) {
  const search = useSearch({ from: "/" });
  const shiny = search.version;
  const step = search.step;

  const getCurrentGenerationName = () => {
    return GENERATIONS[currentGenerationIndex]?.name || "Inconnue";
  };

  // Fonction pour déterminer la catégorie d'un Pokémon basé sur son ID
  const getPokemonCategory = (pokemonId: number) => {
    const categories = [
      { key: "starters", data: starters },
      { key: "regionalBird", data: regionalBird },
      { key: "regionalMammal", data: regionalMammal },
      { key: "bug", data: bug },
      { key: "fossil", data: fossil },
      { key: "babyPokemon", data: babyPokemon },
      { key: "pikachuClone", data: pikachuClone },
      { key: "eeveeForm", data: eeveeForm },
      { key: "regionalForm", data: regionalForm },
      { key: "newEvolutionForms", data: newEvolutionForms },
      { key: "megaEvolutions", data: megaEvolutions },
      { key: "gigantamaxPokemon", data: gigantamaxPokemon },
      { key: "pseudoLegend", data: pseudoLegend },
      { key: "ultraBeasts", data: ultraBeast },
      { key: "paradox", data: paradox },
      { key: "boxLegendary", data: boxLegendary },
      { key: "legendary", data: legendaryPokemon },
      { key: "mythicals", data: mythical },
    ];

    for (const category of categories) {
      if (category.data?.some((pokemon: any) => pokemon.id === pokemonId)) {
        return category.key;
      }
    }
    return "unknown"; // Fallback si aucune catégorie n'est trouvée
  };

  const isPokemonSelected = (pokemon: any) => {
    if (selector === "types" && currentType) {
      return search.pokemons.includes(
        `${extractPokemonIdFromUrl(pokemon.pokemon?.url || pokemon.url)}-${currentType}`
      );
    } else if (selector === "generations") {
      const generationName = getCurrentGenerationName();
      return search.pokemons.includes(
        `${extractPokemonIdFromUrl(pokemon.url)}-${generationName}`
      );
    } else if (selector === "optionals" && currentCategory) {
      // Vérifier si ce Pokémon est sélectionné dans cette catégorie
      const pokemonEntry = `${getPokemonId(pokemon)}-${currentCategory}`;
      return search.OptionalPokemons?.includes(pokemonEntry) || false;
    }
    return false;
  };

  const getPokemonId = (pokemon: any) => {
    if (selector === "optionals") {
      return pokemon.id;
    }
    return extractPokemonIdFromUrl(pokemon.pokemon?.url || pokemon.url);
  };

  const getPokemonName = (pokemon: any) => {
    if (selector === "types") {
      return pokemon.pokemon?.name || pokemon.name;
    }
    return pokemon.name;
  };

  const getSearchParams = (pokemon: any) => {
    const pokemonId = getPokemonId(pokemon);

    if (selector === "types" && currentType) {
      return {
        ...search,
        pokemons: [
          ...[
            ...search.pokemons.filter(
              (p: string) => !p.endsWith(`-${currentType}`)
            ),
            `${pokemonId}-${currentType}`,
          ],
        ],
      };
    } else if (selector === "generations") {
      const generationName = getCurrentGenerationName();
      return {
        ...search,
        pokemons: [
          ...[
            ...search.pokemons.filter(
              (p: string) => !p.endsWith(`-${generationName}`)
            ),
            `${pokemonId}-${generationName}`,
          ],
        ],
      };
    } else if (selector === "optionals" && currentCategory) {
      const category = currentCategory;
      const newPokemonEntry = `${pokemonId.toString()}-${category}`;

      const filteredOptionalPokemons =
        search.OptionalPokemons?.filter(
          (p: string) => !p.endsWith(`-${category}`)
        ) || [];

      return {
        ...search,
        OptionalPokemons: [newPokemonEntry, ...filteredOptionalPokemons],
      };
    }

    return search;
  };

  return (
    <div className="space-y-6">
      <Separator className="my-4" />

      <div className="relative">
        <RadioGroup className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 p-6 rounded-lg border border-border/50">
          {data?.map((pokemon: any) => (
            <div
              key={`${getPokemonName(pokemon)}`}
              data-state={isPokemonSelected(pokemon) ? "checked" : "unchecked"}
              className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 shadow-sm outline-none hover:border-primary/50 hover:shadow-md hover:scale-[103%] active:scale-[98%] data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg"
            >
              <Link
                to="/"
                search={getSearchParams(pokemon)}
                className="w-full items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={
                      shiny === "shiny"
                        ? `/assets/sprites/shiny/${getPokemonId(pokemon)}.webp`
                        : `/assets/sprites/base/${getPokemonId(pokemon)}.webp`
                    }
                    layout="constrained"
                    width={70}
                    height={70}
                    alt={getPokemonName(pokemon)}
                    className="relative z-10 transition-transform group-hover:scale-110"
                  />
                </div>

                <div className="text-center space-y-1 mt-2">
                  <p className="font-medium text-sm capitalize text-foreground">
                    {getPokemonName(pokemon)}
                  </p>
                  {showId && (
                    <Badge variant="outline" className="text-xs">
                      #{getPokemonId(pokemon)}
                    </Badge>
                  )}
                  {showGenerationBadge && (
                    <Badge variant="secondary" className="text-xs">
                      {getCurrentGenerationName()}
                    </Badge>
                  )}
                </div>

                <RadioGroupItem
                  value={getPokemonName(pokemon)}
                  id={`${getPokemonName(pokemon)}-${getPokemonId(pokemon)}`}
                  className="absolute inset-0 opacity-0 cursor-pointer hidden"
                  checked={isPokemonSelected(pokemon)}
                />
              </Link>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

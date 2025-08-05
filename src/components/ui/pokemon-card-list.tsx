import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { extractPokemonIdFromUrl } from "@/utils/functions";
import { GENERATIONS } from "@/utils/consts";
import type { PokeAPI } from "pokeapi-types";

interface PokemonCardListProps {
  data: PokeAPI.TypePokemon[] | PokeAPI.NamedAPIResource[] | any[];
  selector?: "types" | "generations" | "optionals";
  currentType?: string;
  currentGenerationIndex?: number;
  showId?: boolean;
  showGenerationBadge?: boolean;
}

export function PokemonCardList({
  data,
  selector = "optionals",
  currentType,
  currentGenerationIndex = 0,
  showId = false,
  showGenerationBadge = false,
}: PokemonCardListProps) {
  const search = useSearch({ from: "/" });
  const shiny = search.version;

  const getCurrentGenerationName = () => {
    return GENERATIONS[currentGenerationIndex]?.name || "Inconnue";
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
    } else if (selector === "optionals") {
      // Pour les optionnels, on utilise l'ID directement
      return search.pokemons.includes(
        `${pokemon.id}-${getCurrentGenerationName()}`
      );
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
            ...search.pokemons.filter((p: string) => !p.endsWith(`-${currentType}`)),
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
            ...search.pokemons.filter((p: string) => !p.endsWith(`-${generationName}`)),
            `${pokemonId}-${generationName}`,
          ],
        ],
      };
    } else if (selector === "optionals") {
      const generationName = getCurrentGenerationName();
      return {
        ...search,
        pokemons: [
          ...[
            ...search.pokemons.filter((p: string) => !p.endsWith(`-${generationName}`)),
            `${pokemonId}-${generationName}`,
          ],
        ],
      };
    }
    
    return search;
  };

  return (
    <div className="space-y-6">
      <Separator className="my-4" />

      <div className="relative">
        <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 gap-4 p-6 rounded-lg border border-border/50">
          {data?.map((pokemon: any) => (
            <div
              key={`${getPokemonName(pokemon)}`}
              data-state={isPokemonSelected(pokemon) ? "checked" : "unchecked"}
              className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 shadow-sm outline-none transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:scale-[103%] active:scale-[98%] data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg"
            >
              <Link
                to="/"
                search={getSearchParams(pokemon)}
                className="w-full items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={
                      shiny === "shiny"
                        ? `/assets/sprites/shiny/${getPokemonId(pokemon)}.webp`
                        : `/assets/sprites/base/${getPokemonId(pokemon)}.webp`
                    }
                    layout="constrained"
                    width={120}
                    height={120}
                    alt={getPokemonName(pokemon)}
                    className="relative z-10 transition-transform duration-200 group-hover:scale-110"
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
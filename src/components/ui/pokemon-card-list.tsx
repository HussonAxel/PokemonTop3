import { useNavigate, useSearch } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { extractPokemonIdFromUrl } from "@/utils/functions";
import { useId } from "react";
import { GENERATIONS } from "@/utils/consts";
import type { PokeAPI } from "pokeapi-types";

interface PokemonCardListProps {
  data: PokeAPI.TypePokemon[] | PokeAPI.NamedAPIResource[] | any[];
  selector?: "types" | "generations" | "optionals" | "both";
  currentType?: string;
  currentGenerationIndex?: number;
  showId?: boolean;
  showGenerationBadge?: boolean;
  currentCategory?: string;
}

export function PokemonCardList({
  data,
  selector = "optionals",
  currentType,
  currentGenerationIndex = 0,
  showId = false,
  showGenerationBadge = false,
  currentCategory,
}: PokemonCardListProps) {
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const shiny = search.version;
  const id = useId();

  const getCurrentGenerationName = () => {
    return GENERATIONS[currentGenerationIndex]?.name || "Inconnue";
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

  const getPokemonValue = (pokemon: any) => {
    const pokemonId = getPokemonId(pokemon);

    if (selector === "types" && currentType) {
      return `${pokemonId}-${currentType}`;
    } else if (selector === "generations") {
      const generationName = getCurrentGenerationName();
      return `${pokemonId}-${generationName}`;
    } else if (selector === "optionals" && currentCategory) {
      return `${pokemonId}-${currentCategory}`;
    } else if (selector === "both" && currentType) {
      const generationName = getCurrentGenerationName();
      return `${pokemonId}-${currentType}-${generationName}`;
    }
    return `${pokemonId}`;
  };

  const getDefaultValue = () => {
    if (selector === "types" && currentType && search.pokemons?.length > 0) {
      return (
        search.pokemons.find((p: string) => p.endsWith(`-${currentType}`)) || ""
      );
    } else if (selector === "generations") {
      const generationName = getCurrentGenerationName();
      return (
        search.pokemons?.find((p: string) =>
          p.endsWith(`-${generationName}`)
        ) || ""
      );
    } else if (
      selector === "optionals" &&
      currentCategory &&
      search.OptionalPokemons?.length > 0
    ) {
      return (
        search.OptionalPokemons.find((p: string) =>
          p.endsWith(`-${currentCategory}`)
        ) || ""
      );
    } else if (
      selector === "both" &&
      currentType &&
      search.pokemons?.length > 0
    ) {
      const generationName = getCurrentGenerationName();
      return (
        search.pokemons.find(
          (p: string) =>
            p.endsWith(`-${currentType}`) && p.includes(`-${generationName}`)
        ) || ""
      );
    }
    return "";
  };

  const getSearchParams = (value: string) => {
    if (selector === "types" && currentType) {
      const filteredPokemons =
        search.pokemons?.filter(
          (p: string) => !p.endsWith(`-${currentType}`)
        ) || [];
      const newPokemons = value
        ? [...filteredPokemons, value]
        : filteredPokemons;

      return {
        ...search,
        pokemons: newPokemons,
      };
    } else if (selector === "generations") {
      const currentGenerationName = getCurrentGenerationName();
      const filteredPokemons =
        search.pokemons?.filter(
          (p: string) => !p.endsWith(`-${currentGenerationName}`)
        ) || [];
      const newPokemons = value
        ? [...filteredPokemons, value]
        : filteredPokemons;

      return {
        ...search,
        pokemons: newPokemons,
      };
    } else if (selector === "optionals" && currentCategory) {
      const filteredPokemons =
        search.OptionalPokemons?.filter(
          (p: string) => !p.endsWith(`-${currentCategory}`)
        ) || [];
      const newPokemons = value
        ? [...filteredPokemons, value]
        : filteredPokemons;

      return {
        ...search,
        OptionalPokemons: newPokemons,
      };
    } else if (selector === "both" && currentType) {
      const generationName = getCurrentGenerationName();
      const filteredPokemons =
        search.pokemons?.filter(
          (p: string) =>
            !(p.endsWith(`-${currentType}`) && p.includes(`-${generationName}`))
        ) || [];
      const newPokemons = value
        ? [...filteredPokemons, value]
        : filteredPokemons;

      return {
        ...search,
        pokemons: newPokemons,
      };
    }

    return search;
  };

  return (
    <div className="space-y-6">
      <Separator className="my-4" />

      <div className="relative">
        <RadioGroup
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 p-6 rounded-lg border border-border/50"
          defaultValue={getDefaultValue()}
          onValueChange={(value) => {
            const newSearch = getSearchParams(value);
            navigate({ to: "/", search: newSearch });
          }}
        >
          {data?.map((pokemon: any) => {
            const pokemonValue = getPokemonValue(pokemon);
            const pokemonId = getPokemonId(pokemon);
            const pokemonName = getPokemonName(pokemon);

            return (
              <div
                key={`${id}-${pokemonValue}`}
                className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col gap-3 rounded-lg border-2 p-4 shadow-sm outline-none hover:border-primary/50 hover:shadow-md hover:scale-[103%] active:scale-[98%] transition-all duration-200 ease-in-out"
              >
                <div className="flex justify-between items-start">
                  <RadioGroupItem
                    id={`${id}-${pokemonValue}`}
                    value={pokemonValue}
                    className="order-1 after:absolute after:inset-0 z-10"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={
                        shiny === "shiny"
                          ? `/assets/sprites/shiny/${pokemonId}.webp`
                          : `/assets/sprites/base/${pokemonId}.webp`
                      }
                      layout="constrained"
                      width={90}
                      height={90}
                      alt={pokemonName}
                      className="relative transition-transform duration-200 ease-in-out group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="text-center space-y-1 mt-2">
                  <p className="font-medium text-sm capitalize text-foreground">
                    {pokemonName}
                  </p>
                  {showId && (
                    <Badge variant="outline" className="text-xs">
                      #{pokemonId}
                    </Badge>
                  )}
                  {showGenerationBadge && (
                    <Badge variant="secondary" className="text-xs">
                      {getCurrentGenerationName()}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}

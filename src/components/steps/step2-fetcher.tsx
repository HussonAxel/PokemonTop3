import { useSearch } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetPokemonsPerType,
  useGetPokemonsPerGeneration,
} from "@/services/pokemons";
import { PokemonCardList } from "@/components/ui/pokemon-card-list";

import { Badge } from "@/components/ui/badge";

import { GENERATIONS } from "@/utils/consts";
import { extractPokemonIdFromUrl } from "@/utils/functions";
import BadgesSummary from "./badges-summary";

export default function Step2Fetcher() {
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const generation = search.generation;

  let pokemonsData;

  if (selector === "types") {
    pokemonsData = useGetPokemonsPerType(search.type || "").data;
  } else if (selector === "generations") {
    pokemonsData = useGetPokemonsPerGeneration(
      search.generation?.[1] || ""
    ).data?.results.slice(
      generation?.[0] ? parseInt(generation[0]) - 1 : 0,
      generation?.[1] ? parseInt(generation[1]) : 0
    );
  } else if (selector === "both") {
    const pokemonsDataTypes = useGetPokemonsPerType(search.type || "").data;
    const pokemonsDataGenerations = useGetPokemonsPerGeneration(
      search.generation?.[1] || ""
    ).data?.results.slice(
      generation?.[0] ? parseInt(generation[0]) - 1 : 0,
      generation?.[1] ? parseInt(generation[1]) : 0
    );

    if (pokemonsDataTypes?.pokemon && pokemonsDataGenerations) {
      const generationPokemonIds = pokemonsDataGenerations.map((pokemon: any) =>
        extractPokemonIdFromUrl(pokemon.url)
      );

      pokemonsData = pokemonsDataTypes.pokemon.filter((typePokemon: any) => {
        const pokemonId = extractPokemonIdFromUrl(typePokemon.pokemon.url);
        return generationPokemonIds.includes(pokemonId);
      });
    } else {
      pokemonsData = pokemonsDataTypes?.pokemon || [];
    }
  }

  const getCurrentGenerationIndex = () => {
    if (!search.generation || search.generation.length < 2) return 0;
    const currentEnd = parseInt(search.generation[1]);
    return GENERATIONS.findIndex((gen) => gen.end === currentEnd);
  };

  if (!pokemonsData) {
    return (
      <Card className="max-w-full mx-auto">
        <BadgesSummary />
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pokemonsData.error) {
    return (
      <Card className="max-w-full mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="secondary" className="text-sm font-medium">
              Étape {search.step}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sélection des Pokémon
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Erreur lors du chargement des données
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 text-center">
            Erreur: {pokemonsData.error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="max-w-full mx-auto">
        <BadgesSummary />

        <CardContent>
          {selector === "types" && (
            <PokemonCardList
              data={pokemonsData?.pokemon || []}
              selector="types"
              currentType={search.type}
              showGenerationBadge={false}
            />
          )}

          {selector === "generations" && (
            <PokemonCardList
              data={pokemonsData || []}
              selector="generations"
              currentGenerationIndex={getCurrentGenerationIndex()}
              showGenerationBadge={false}
            />
          )}

          {selector === "both" && (
            <PokemonCardList
              data={pokemonsData || []}
              selector="types"
              currentType={search.type}
              currentGenerationIndex={getCurrentGenerationIndex()}
              showGenerationBadge={false}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}

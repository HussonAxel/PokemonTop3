import { useSearch } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetPokemonsPerType,
  useGetPokemonsPerGeneration,
  useGetTypes,
} from "@/services/pokemons";
import { PokemonCardList } from "@/components/ui/pokemon-card-list";

import { Badge } from "@/components/ui/badge";

import { GENERATIONS } from "@/utils/consts";
import { extractPokemonIdFromUrl } from "@/utils/functions";
import BadgesSummary from "./badges-summary";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function Step2Fetcher() {
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const generation = search.generation;
  const navigate = useNavigate();

  const { data: typesData } = useGetTypes();
  const filteredTypes: string[] = useMemo(
    () =>
      typesData?.results
        ?.filter((t: any) => t.name !== "unknown" && t.name !== "stellar")
        .map((t: any) => t.name) || [],
    [typesData]
  );

  let pokemonsData: any;
  let isLoadingCurrent = false;

  if (selector === "types") {
    const typeQuery = useGetPokemonsPerType(search.type || "");
    pokemonsData = typeQuery.data;
    isLoadingCurrent = !!(typeQuery.isLoading || typeQuery.isFetching);
  } else if (selector === "generations") {
    const genQuery = useGetPokemonsPerGeneration(search.generation?.[1] || "");
    pokemonsData = genQuery.data?.results.slice(
      generation?.[0] ? parseInt(generation[0]) - 1 : 0,
      generation?.[1] ? parseInt(generation[1]) : 0
    );
    isLoadingCurrent = !!(genQuery.isLoading || genQuery.isFetching);
  } else if (selector === "both") {
    const typeQuery = useGetPokemonsPerType(search.type || "");
    const genQuery = useGetPokemonsPerGeneration(search.generation?.[1] || "");
    const pokemonsDataTypes = typeQuery.data;
    const pokemonsDataGenerations = genQuery.data?.results.slice(
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
      // Attendre que les deux datasets soient disponibles avant de décider si c'est vide
      pokemonsData = undefined;
    }
    isLoadingCurrent = !!(
      typeQuery.isLoading ||
      typeQuery.isFetching ||
      genQuery.isLoading ||
      genQuery.isFetching
    );
  }

  const getCurrentGenerationIndex = () => {
    if (!search.generation || search.generation.length < 2) return 0;
    const currentEnd = parseInt(search.generation[1]);
    return GENERATIONS.findIndex((gen) => gen.end === currentEnd);
  };

  // Helpers pour l'itération
  const getCurrentTypeIndex = () =>
    filteredTypes.findIndex((t) => t === search.type);
  const getNextType = () => {
    const i = getCurrentTypeIndex();
    const next = (i + 1) % (filteredTypes.length || 1);
    return filteredTypes[next];
  };
  const getFirstType = () => filteredTypes[0];
  const getNextGeneration = () => {
    const i = getCurrentGenerationIndex();
    const next = (i + 1) % GENERATIONS.length;
    return [
      GENERATIONS[next].start.toString(),
      GENERATIONS[next].end.toString(),
    ];
  };

  const arraysEqual = (a?: string[], b?: string[]) => {
    if (!a || !b) return false;
    return a.length === b.length && a.every((v, i) => v === b[i]);
  };

  // Redirection automatique si la liste est vide (et seulement quand ce n'est plus en chargement)
  useEffect(() => {
    if (isLoadingCurrent) return;

    if (selector === "types") {
      if (
        filteredTypes.length > 0 &&
        typeof search.type === "string" &&
        pokemonsData &&
        Array.isArray(pokemonsData.pokemon) &&
        pokemonsData.pokemon.length === 0
      ) {
        const nextType = getNextType();
        if (nextType && nextType !== search.type) {
          navigate({ to: "/", search: { ...search, type: nextType } });
        }
      }
    } else if (selector === "generations") {
      if (
        Array.isArray(pokemonsData) &&
        pokemonsData.length === 0 &&
        Array.isArray(search.generation) &&
        search.generation.length === 2
      ) {
        const nextGen = getNextGeneration();
        if (!arraysEqual(nextGen, search.generation)) {
          navigate({ to: "/", search: { ...search, generation: nextGen } });
        }
      }
    } else if (selector === "both") {
      if (
        Array.isArray(pokemonsData) &&
        pokemonsData.length === 0 &&
        filteredTypes.length > 0 &&
        typeof search.type === "string" &&
        Array.isArray(search.generation) &&
        search.generation.length === 2
      ) {
        const isLastType = getCurrentTypeIndex() === filteredTypes.length - 1;
        const nextType = isLastType ? getFirstType() : getNextType();
        const nextGen = isLastType ? getNextGeneration() : search.generation;
        const shouldNavigate =
          (nextType && nextType !== search.type) ||
          !arraysEqual(nextGen, search.generation);
        if (shouldNavigate && nextType) {
          navigate({
            to: "/",
            search: { ...search, type: nextType, generation: nextGen },
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selector,
    JSON.stringify(pokemonsData),
    filteredTypes.join("|"),
    search.type,
    search.generation?.[0],
    search.generation?.[1],
    isLoadingCurrent,
  ]);

  const lastPokemonsDataRef = useRef<any>(undefined);
  if (
    pokemonsData &&
    (Array.isArray(pokemonsData) ? pokemonsData.length > 0 : true)
  ) {
    lastPokemonsDataRef.current = pokemonsData;
  }
  const displayPokemonsData = pokemonsData ?? lastPokemonsDataRef.current;

  if (pokemonsData?.error) {
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
            Erreur: {pokemonsData.error?.message || "Erreur inconnue"}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!displayPokemonsData) {
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

  return (
    <>
      <Card className="max-w-full mx-auto">
        <BadgesSummary />

        <CardContent>
          {selector === "types" && (
            <PokemonCardList
              data={displayPokemonsData?.pokemon || []}
              selector="types"
              currentType={search.type}
              showGenerationBadge={false}
            />
          )}

          {selector === "generations" && (
            <PokemonCardList
              data={displayPokemonsData || []}
              selector="generations"
              currentGenerationIndex={getCurrentGenerationIndex()}
              showGenerationBadge={false}
            />
          )}

          {selector === "both" && (
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {GENERATIONS[getCurrentGenerationIndex()]?.name || "Inconnue"}
                </span>
                {" — "}
                <span className="capitalize">{search.type}</span>
              </div>
              <PokemonCardList
                data={displayPokemonsData || []}
                selector="both"
                currentType={search.type}
                currentGenerationIndex={getCurrentGenerationIndex()}
                showGenerationBadge={false}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

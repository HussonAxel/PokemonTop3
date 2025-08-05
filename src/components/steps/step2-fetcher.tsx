import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetPokemonsPerType,
  useGetPokemonsPerGeneration,
  useGetTypes,
} from "@/services/pokemons";
import { PokemonCardList } from "@/components/ui/pokemon-card-list";

import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Hash,
} from "lucide-react";

import { GENERATIONS } from "@/utils/consts";
import { extractPokemonIdFromUrl } from "@/utils/functions";

export default function Step2Fetcher() {
  let typeIsSelected, generationIsSelected;
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const type = search.type;
  const pokemons = search.pokemons;
  const generation = search.generation;

  const { data: types } = useGetTypes();
  const filteredTypes =
    types?.results
      ?.filter(
        (type: any) => type.name !== "unknown" && type.name !== "stellar"
      )
      .map((type: any) => type.name) || [];

      let pokemonsData;

  if (selector === "types") {
    pokemonsData = useGetPokemonsPerType(search.type || "").data

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
    console.log("Pokemons Data:", pokemonsData);
  }

  const getCurrentTypeIndex = () => {
    return filteredTypes.findIndex((type: string) => type === search.type);
  };

  const getNextType = () => {
    const currentIndex = getCurrentTypeIndex();
    const nextIndex = (currentIndex + 1) % filteredTypes.length;
    return filteredTypes[nextIndex];
  };

  const getPreviousType = () => {
    const currentIndex = getCurrentTypeIndex();
    const previousIndex =
      currentIndex === 0 ? filteredTypes.length - 1 : currentIndex - 1;
    return filteredTypes[previousIndex];
  };

  const getCurrentGenerationIndex = () => {
    if (!search.generation || search.generation.length < 2) return 0;
    const currentEnd = parseInt(search.generation[1]);
    return GENERATIONS.findIndex((gen) => gen.end === currentEnd);
  };

  const getNextGeneration = () => {
    const currentIndex = getCurrentGenerationIndex();
    const nextIndex = (currentIndex + 1) % GENERATIONS.length;
    return [
      GENERATIONS[nextIndex].start.toString(),
      GENERATIONS[nextIndex].end.toString(),
    ];
  };

  const getPreviousGeneration = () => {
    const currentIndex = getCurrentGenerationIndex();
    const previousIndex =
      currentIndex === 0 ? GENERATIONS.length - 1 : currentIndex - 1;
    return [
      GENERATIONS[previousIndex].start.toString(),
      GENERATIONS[previousIndex].end.toString(),
    ];
  };

  const navigateToNext = () => {
    if (type) {
      typeIsSelected = type
        ? pokemons.some((pokemon: string) => pokemon.endsWith(`-${type}`))
        : false;
      if (!typeIsSelected) return;
    }

    if (generation) {
      const currentGenerationName =
        GENERATIONS[getCurrentGenerationIndex()]?.name;
      generationIsSelected = currentGenerationName
        ? pokemons.some((pokemon: string) =>
            pokemon.endsWith(`-${currentGenerationName}`)
          )
        : false;

      if (!generationIsSelected) {
        const generationStart = parseInt(generation[0]);
        const generationEnd = parseInt(generation[1]);
        generationIsSelected = pokemons.some((pokemon: string) => {
          const pokemonId = parseInt(pokemon.split("-")[0]);
          return pokemonId >= generationStart && pokemonId <= generationEnd;
        });
      }

      if (!generationIsSelected) return;
    }

    if (
      (type && pokemons.length === 18) ||
      (generation && pokemons.length === 9)
    ) {
      navigate({
        to: "/",
        search: {
          ...search,
          step: search.step + 1,
        },
      });
      return;
    }

    const searchParams: any = { ...search };

    if (selector === "types") {
      searchParams.type = getNextType();
    } else if (selector === "generations") {
      searchParams.generation = getNextGeneration();
    } else if (selector === "both") {
      searchParams.type = getNextType();
      searchParams.generation = getNextGeneration();
    }

    navigate({ search: searchParams });
  };

  const navigateToPrevious = () => {
    const searchParams: any = { ...search };

    if (selector === "types") {
      searchParams.type = getPreviousType();
    } else if (selector === "generations") {
      searchParams.generation = getPreviousGeneration();
    } else if (selector === "both") {
      searchParams.type = getPreviousType();
      searchParams.generation = getPreviousGeneration();
    }

    navigate({ search: searchParams });
  };

  if (!pokemonsData) {
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
            Chargement des Pokémon...
          </p>
        </CardHeader>
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
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="secondary" className="text-sm font-medium">
              Étape {search.step}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sélection des Pokémon
          </CardTitle>

          <div className="flex gap-4 items-center justify-center mt-4">
            <Button
              variant="outline"
              onClick={navigateToPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </Button>

            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg border">
              <Hash className="w-4 h-4" />
              {selector === "types" && (
                <span>
                  Type:{" "}
                  <span className="capitalize font-semibold text-foreground">
                    {search.type}
                  </span>
                </span>
              )}
              {selector === "generations" && (
                <span>
                  <span className="font-semibold text-foreground">
                    {GENERATIONS[getCurrentGenerationIndex()]?.name ||
                      "Inconnue"}
                  </span>
                </span>
              )}
              {selector === "both" && (
                <span>
                  Type:{" "}
                  <span className="capitalize font-semibold text-foreground">
                    {search.type}
                  </span>{" "}
                  | Génération:{" "}
                  <span className="font-semibold text-foreground">
                    {GENERATIONS[getCurrentGenerationIndex()]?.name ||
                      "Inconnue"}
                  </span>
                </span>
              )}
            </div>

            <Button
              variant="outline"
              onClick={navigateToNext}
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

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

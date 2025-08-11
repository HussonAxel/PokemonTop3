import { Badge } from "../ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Hash } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { GENERATIONS } from "@/utils/consts";
import {
  fetchPokemonsPerGeneration,
  fetchPokemonsPerType,
  QUERY_KEYS,
  useGetTypes,
} from "@/services/pokemons";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function BadgesSummary() {
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const pokemons = search.pokemons || [];

  const step = search.step;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: types } = useGetTypes();

  const prefetchNextData = () => {
    if (selector === "types") {
      const nextType = getNextType();
      queryClient.ensureQueryData({
        queryKey: QUERY_KEYS.pokemonsPerTypes(nextType),
        queryFn: () => fetchPokemonsPerType(nextType),
      });
    } else if (selector === "generations") {
      const nextGeneration = getNextGeneration();
      queryClient.ensureQueryData({
        queryKey: QUERY_KEYS.pokemonsPerGenerations(nextGeneration[1]),
        queryFn: () => fetchPokemonsPerGeneration(nextGeneration[1]),
      });
    } else if (selector === "both") {
      const nextType = getNextType();
      const nextGeneration = getNextGeneration();
      queryClient.ensureQueryData({
        queryKey: QUERY_KEYS.pokemonsPerTypes(nextType),
        queryFn: () => fetchPokemonsPerType(nextType),
      });
      queryClient.ensureQueryData({
        queryKey: QUERY_KEYS.pokemonsPerGenerations(nextGeneration[1]),
        queryFn: () => fetchPokemonsPerGeneration(nextGeneration[1]),
      });
    }
  };
  const filteredTypes =
    types?.results
      ?.filter(
        (type: any) => type.name !== "unknown" && type.name !== "stellar"
      )
      .map((type: any) => type.name) || [];

  const getSelectionStatus = () => {
    if (selector === "types") {
      const selectedTypes = pokemons
        .map((p: string) => p.split("-")[1])
        .filter(Boolean);
      return `${selectedTypes.length}/${filteredTypes.length} types sélectionnés`;
    } else if (selector === "generations") {
      const selectedGenerations = pokemons
        .map((p: string) => p.split("-")[1])
        .filter(Boolean);
      return `${selectedGenerations.length}/${GENERATIONS.length} générations sélectionnées`;
    } else if (selector === "both") {
      return `${pokemons.length} Pokémon sélectionnés`;
    }
    return "";
  };

  const getCurrentTypeIndex = () => {
    return filteredTypes.findIndex((type: string) => type === search.type);
  };

  const getCurrentGenerationIndex = () => {
    if (!search.generation || search.generation.length < 2) return 0;
    const currentEnd = parseInt(search.generation[1]);
    return GENERATIONS.findIndex((gen) => gen.end === currentEnd);
  };
  const getPreviousType = () => {
    const currentIndex = getCurrentTypeIndex();
    const previousIndex =
      currentIndex === 0 ? filteredTypes.length - 1 : currentIndex - 1;
    return filteredTypes[previousIndex];
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

  const getNextType = () => {
    const currentIndex = getCurrentTypeIndex();
    const nextIndex = (currentIndex + 1) % filteredTypes.length;
    return filteredTypes[nextIndex];
  };

  const getNextGeneration = () => {
    const currentIndex = getCurrentGenerationIndex();
    const nextIndex = (currentIndex + 1) % GENERATIONS.length;
    return [
      GENERATIONS[nextIndex].start.toString(),
      GENERATIONS[nextIndex].end.toString(),
    ];
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

  const isCurrentTypeSelected = () => {
    if (selector === "types" && search.type) {
      return pokemons.some((pokemon: string) =>
        pokemon.endsWith(`-${search.type}`)
      );
    }
    return false;
  };

  const isCurrentGenerationSelected = () => {
    if (selector === "generations" && search.generation) {
      const currentGenerationName =
        GENERATIONS[getCurrentGenerationIndex()]?.name;
      if (currentGenerationName) {
        return pokemons.some((pokemon: string) =>
          pokemon.endsWith(`-${currentGenerationName}`)
        );
      }
      const generationStart = parseInt(search.generation[0]);
      const generationEnd = parseInt(search.generation[1]);
      return pokemons.some((pokemon: string) => {
        const pokemonId = parseInt(pokemon.split("-")[0]);
        return pokemonId >= generationStart && pokemonId <= generationEnd;
      });
    }
    return false;
  };

  const isCurrentBothSelected = () => {
    if (selector === "both" && search.type && search.generation) {
      const currentGenerationName =
        GENERATIONS[getCurrentGenerationIndex()]?.name;
      return pokemons.some(
        (pokemon: string) =>
          pokemon.endsWith(`-${search.type}`) &&
          pokemon.includes(`-${currentGenerationName}`)
      );
    }
    return false;
  };
  const navigateToNext = () => {
    let isSelected = false;

    if (selector === "types") {
      isSelected = isCurrentTypeSelected();
    } else if (selector === "generations") {
      isSelected = isCurrentGenerationSelected();
    } else if (selector === "both") {
      isSelected = isCurrentBothSelected();
    }

    if (!isSelected) {
      console.log("Aucun Pokémon sélectionné pour le type/génération actuel");
      return;
    }

    const totalTypes = filteredTypes.length;
    const totalGenerations = GENERATIONS.length;

    let shouldProceedToNextStep = false;

    if (selector === "types") {
      const selectedTypes = pokemons
        .map((p: string) => p.split("-")[1])
        .filter(Boolean);
      shouldProceedToNextStep = selectedTypes.length >= totalTypes;
    } else if (selector === "generations") {
      const selectedGenerations = pokemons
        .map((p: string) => p.split("-")[1])
        .filter(Boolean);
      shouldProceedToNextStep = selectedGenerations.length >= totalGenerations;
    } else if (selector === "both") {
      shouldProceedToNextStep =
        pokemons.length >= totalTypes * totalGenerations;
    }

    if (shouldProceedToNextStep) {
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

  return (
    <div>
      {step === 1 && (
        <div>
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm font-medium">
                Étape 1
              </Badge>
            </div>
            <CardTitle className="text-4xl font-bold">
              Configuration du Picker
            </CardTitle>
            <CardDescription className="text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Personnalisez votre expérience de sélection de Pokémon. Choisissez
              votre méthode de navigation, vos préférences visuelles et les
              options avancées.
            </CardDescription>
          </CardHeader>
        </div>
      )}
      {step === 2 && (
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="secondary" className="text-sm font-medium">
              Étape {search.step}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sélection des Pokémon
          </CardTitle>

          <div className="text-sm text-muted-foreground">
            {getSelectionStatus()}
          </div>

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
              onMouseEnter={prefetchNextData}
              className="flex items-center gap-2"
              disabled={
                (selector === "types" && !isCurrentTypeSelected()) ||
                (selector === "generations" &&
                  !isCurrentGenerationSelected()) ||
                (selector === "both" && !isCurrentBothSelected())
              }
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      )}
    </div>
  );
}

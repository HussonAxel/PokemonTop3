import { Badge } from "../ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const pokemonsOptions = search.pokemonsOptions || [];
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
      // Preload next type in current generation
      const currentIndex = getCurrentTypeIndex();
      const nextIndex = (currentIndex + 1) % filteredTypes.length;
      const nextType = filteredTypes[nextIndex];
      queryClient.ensureQueryData({
        queryKey: QUERY_KEYS.pokemonsPerTypes(nextType),
        queryFn: () => fetchPokemonsPerType(nextType),
      });
      // If we loop to first type, also preload next generation
      if (nextIndex === 0) {
        const nextGeneration = getNextGeneration();
        queryClient.ensureQueryData({
          queryKey: QUERY_KEYS.pokemonsPerGenerations(nextGeneration[1]),
          queryFn: () => fetchPokemonsPerGeneration(nextGeneration[1]),
        });
      }
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
      return `${selectedTypes.length}/${filteredTypes.length} types selected`;
    } else if (selector === "generations") {
      const selectedGenerations = pokemons
        .map((p: string) => p.split("-")[1])
        .filter(Boolean);
      return `${selectedGenerations.length}/${GENERATIONS.length} generations selected`;
    } else if (selector === "both") {
      return `${pokemons.length} Pokémon selected`;
    }
    return "";
  };

  const getFirstType = () => filteredTypes[0];

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
      const generationStart = parseInt(search.generation[0]);
      const generationEnd = parseInt(search.generation[1]);
      return pokemons.some((pokemon: string) => {
        const [idPart, typePart] = pokemon.split("-");
        const pokemonId = parseInt(idPart);
        return (
          typePart === search.type &&
          !Number.isNaN(pokemonId) &&
          pokemonId >= generationStart &&
          pokemonId <= generationEnd
        );
      });
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
      console.log("No Pokémon selected for current type/generation");
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
      // Ideally: 1 selection per type x generation combination
      shouldProceedToNextStep =
        pokemons.length >= totalTypes * totalGenerations;
    }

    if (shouldProceedToNextStep) {
      // End of journey, go to next step (3 or 4 depending on options)
      navigate({
        to: "/",
        search: {
          ...search,
          step: search.step + (pokemonsOptions.length === 0 ? 2 : 1),
        },
      });
      return;
    }

    // Continue journey in current mode
    const searchParams: any = { ...search };

    if (selector === "types") {
      searchParams.type = getNextType();
    } else if (selector === "generations") {
      searchParams.generation = getNextGeneration();
    } else if (selector === "both") {
      // Iteration: types first in current generation
      const currentTypeIndex = getCurrentTypeIndex();
      const isLastType = currentTypeIndex === filteredTypes.length - 1;
      if (isLastType) {
        // Go back to first type and move to next generation
        searchParams.type = getFirstType();
        searchParams.generation = getNextGeneration();
      } else {
        searchParams.type = getNextType();
      }
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
                Step 1
              </Badge>
            </div>
            <CardTitle className="text-4xl font-bold">
              Picker Configuration
            </CardTitle>
            <CardDescription className="text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Customize your Pokémon selection experience. Choose your navigation
              method, visual preferences and advanced options.
            </CardDescription>
          </CardHeader>
        </div>
      )}
      {step === 2 && (
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="secondary" className="text-sm font-medium">
              Step {search.step}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Pokémon Selection
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
              Previous
            </Button>
            
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
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      )}
    </div>
  );
}

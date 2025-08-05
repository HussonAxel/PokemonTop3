import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetPokemonsPerType,
  useGetPokemonsPerGeneration,
  useGetTypes,
} from "@/services/pokemons";
import { extractPokemonIdFromUrl } from "@/utils/functions";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

import { Image } from "@unpic/react";
import { Link } from "@tanstack/react-router";

import type { PokeAPI } from "pokeapi-types";
import { GENERATIONS } from "@/utils/consts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Sparkles,
  Layers,
  Type,
  Hash,
} from "lucide-react";

export default function Step2Fetcher() {
  let typeIsSelected, generationIsSelected;
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const shiny = search.version;
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

  const pokemonsData =
    selector === "types"
      ? useGetPokemonsPerType(search.type || "").data
      : useGetPokemonsPerGeneration(
          search.generation?.[1] || ""
        ).data?.results.slice(
          generation?.[0] ? parseInt(generation[0]) - 1 : 0,
          generation?.[1] ? parseInt(generation[1]) : 0
        );

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

        {selector === "types" && (
          <CardContent className="space-y-6">
            <Separator className="my-4" />

            <div className="relative">
              <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 gap-4 p-6 rounded-lg border border-border/50">
                {pokemonsData?.pokemon?.map(
                  (pokemonType: PokeAPI.TypePokemon) => (
                    <div
                      key={`${pokemonType.pokemon.name}`}
                      data-state={
                        search.pokemons.includes(
                          `${extractPokemonIdFromUrl(
                            pokemonType.pokemon.url
                          )}-${search.type}`
                        )
                          ? "checked"
                          : "unchecked"
                      }
                      className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 shadow-sm outline-none transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:scale-[103%] active:scale-[98%] data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg"
                    >
                      <Link
                        to="/"
                        search={{
                          ...search,
                          pokemons: [
                            ...[
                              ...search.pokemons.filter(
                                (p: string) => !p.endsWith(`-${search.type}`)
                              ),
                              `${extractPokemonIdFromUrl(
                                pokemonType.pokemon.url
                              )}-${search.type}`,
                            ],
                          ],
                        }}
                        className="w-full items-center"
                      >
                        <div className="relative">
                          <div className="absolute inset-0" />
                          <Image
                            src={
                              shiny === "shiny"
                                ? `/assets/sprites/shiny/${extractPokemonIdFromUrl(
                                    pokemonType.pokemon.url
                                  )}.webp`
                                : `/assets/sprites/base/${extractPokemonIdFromUrl(
                                    pokemonType.pokemon.url
                                  )}.webp`
                            }
                            layout="constrained"
                            width={120}
                            height={120}
                            alt={pokemonType.pokemon.name}
                            className="relative z-10"
                          />
                        </div>

                        <div className="text-center space-y-1 mt-2">
                          <p className="font-medium text-sm capitalize text-foreground">
                            {pokemonType.pokemon.name}
                          </p>
                        </div>

                        <RadioGroupItem
                          value={pokemonType.pokemon.name}
                          id={`${pokemonType.pokemon.name}-${pokemonType.pokemon.url}`}
                          className="absolute inset-0 opacity-0 cursor-pointer hidden"
                        />
                      </Link>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          </CardContent>
        )}

        {selector === "generations" && (
          <CardContent className="space-y-6">

            <Separator className="my-4" />

            <div className="relative">
              <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 gap-4 p-6 rounded-lg border border-border/50">                {pokemonsData?.map((pokemon: PokeAPI.NamedAPIResource) => (
                  <div
                    key={`${pokemon.name}`}
                    data-state={
                      search.pokemons.includes(
                        `${extractPokemonIdFromUrl(pokemon.url)}-${
                          GENERATIONS[getCurrentGenerationIndex()]?.name ||
                          "Inconnue"
                        }`
                      )
                        ? "checked"
                        : "unchecked"
                    }
                    className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 shadow-sm outline-none transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:scale-105 active:scale-[98%] data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg"
                  >
                    <Link
                      to="/"
                      search={{
                        ...search,
                        pokemons: [
                          ...[
                            ...search.pokemons.filter(
                              (p: string) =>
                                !p.endsWith(
                                  `-${
                                    GENERATIONS[getCurrentGenerationIndex()]
                                      ?.name
                                  }`
                                )
                            ),
                            `${extractPokemonIdFromUrl(pokemon.url)}-${
                              GENERATIONS[getCurrentGenerationIndex()]?.name
                            }`,
                          ],
                        ],
                      }}
                      className="w-full items-center"
                    >
                      <div className="relative">
                        <Image
                          src={
                            shiny === "shiny"
                              ? `/assets/sprites/shiny/${extractPokemonIdFromUrl(
                                  pokemon.url
                                )}.webp`
                              : `/assets/sprites/base/${extractPokemonIdFromUrl(
                                  pokemon.url
                                )}.webp`
                          }
                          layout="constrained"
                          width={120}
                          height={120}
                          alt={pokemon.name}
                          className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                        />
                      </div>

                      <div className="text-center space-y-1 mt-2">
                        <p className="font-medium text-sm capitalize text-foreground">
                          {pokemon.name}
                        </p>
                      </div>

                      <RadioGroupItem
                        value={pokemon.name}
                        id={`${pokemon.name}-${pokemon.url}`}
                        className="absolute inset-0 opacity-0 cursor-pointer hidden"
                        checked={search.pokemons.includes(
                          `${extractPokemonIdFromUrl(pokemon.url)}-${
                            GENERATIONS[getCurrentGenerationIndex()]?.name ||
                            "Inconnue"
                          }`
                        )}
                      />
                    </Link>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}

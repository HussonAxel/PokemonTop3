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

export default function Step2Fetcher() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const shiny = search.version;
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
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Step 2 - {selector}</CardTitle>
          <CardDescription>Chargement des Pokémon...</CardDescription>
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
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Step 2 - {selector}</CardTitle>
          <CardDescription>
            Erreur lors du chargement des données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">
            Erreur: {pokemonsData.error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-col gap-2 justify-center items-center">
          <CardTitle className="text-2xl font-bold">
            Step {search.step} - {selector}
          </CardTitle>
          <CardDescription>
            You have chosen to pick pokemons based on their {selector}. You will
            now have a multi step form to select your desired pokemons.
          </CardDescription>

          <div className="flex gap-4 items-center mt-4">
            <Button
              variant="outline"
              onClick={navigateToPrevious}
              className="flex items-center gap-2"
            >
              ← Précédent
            </Button>

            <div className="text-sm font-medium">
              {selector === "types" && <span>Type: {search.type}</span>}
              {selector === "generations" && (
                <span>
                  Génération:{" "}
                  {GENERATIONS[getCurrentGenerationIndex()]?.name || "Inconnue"}
                </span>
              )}
              {selector === "both" && (
                <span>
                  Type: {search.type} | Génération:{" "}
                  {GENERATIONS[getCurrentGenerationIndex()]?.name || "Inconnue"}
                </span>
              )}
            </div>

            <Button
              variant="outline"
              onClick={navigateToNext}
              className="flex items-center gap-2"
            >
              Suivant →
            </Button>
          </div>
        </CardHeader>
        {selector === "types" && (
          <CardContent className="border-[0.5px] border-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-4 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.pokemon?.map(
                (pokemonType: PokeAPI.TypePokemon) => (
                  <div
                    key={`${pokemonType.pokemon.name}`}
                    className={`border-input relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none hover:border-primary/50 transition-colors ${
                      search.pokemons.includes(
                        `${extractPokemonIdFromUrl(pokemonType.pokemon.url)}-${
                          search.type
                        }`
                      )
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
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
                    >
                      <div className="flex items-center align-center">
                        <RadioGroupItem
                          value={pokemonType.pokemon.name}
                          id={`${pokemonType.pokemon.name}-${pokemonType.pokemon.url}`}
                          className="order-1 after:absolute after:inset-0 hidden"
                        />
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
                          width={175}
                          height={175}
                          alt={pokemonType.pokemon.name}
                        />
                      </div>
                    </Link>
                  </div>
                )
              )}
            </RadioGroup>
          </CardContent>
        )}
        {selector === "generations" && (
          <CardContent className="border-[0.5px] border-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-4 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.map((pokemon: PokeAPI.NamedAPIResource) => (
                <div
                  key={`${pokemon.name}`}
                  data-state={
                    search.pokemons.includes(
                      `${extractPokemonIdFromUrl(pokemon.url)}-${GENERATIONS[getCurrentGenerationIndex()]?.name || "Inconnue"}`
                    )
                      ? "checked"
                      : "unchecked"
                  }
                  className="border-input relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none hover:border-primary/50 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
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
                                `-${GENERATIONS[getCurrentGenerationIndex()]?.name}`
                              )
                          ),
                          `${extractPokemonIdFromUrl(
                            pokemon.url
                          )}-${GENERATIONS[getCurrentGenerationIndex()]?.name}`,
                        ],
                      ],
                    }}
                  >
                    <div className="flex justify-center">
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
                        width={175}
                        height={175}
                        alt={pokemon.name}
                      />
                    </div>
                    <RadioGroupItem
                      value={pokemon.name}
                      id={`${pokemon.name}-${pokemon.url}`}
                      className="order-1 after:absolute after:inset-0 left-1 hidden"
                      checked={search.pokemons.includes(
                        `${extractPokemonIdFromUrl(pokemon.url)}-${GENERATIONS[getCurrentGenerationIndex()]?.name || "Inconnue"}`
                      )}
                    />
                  </Link>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        )}
      </Card>
    </>
  );
}

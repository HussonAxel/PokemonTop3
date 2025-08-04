import { useSearch } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StepperComponent from "./stepper";
import {
  useGetPokemonsPerType,
  useGetPokemonsPerGeneration,
} from "@/services/pokemons";
import {
  beautifyPokemonName,
  extractPokemonIdFromUrl,
} from "@/utils/functions";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Image } from "@unpic/react";

export default function Step2Fetcher() {
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const shiny = search.version;

  const pokemonsData =
    selector === "types"
      ? useGetPokemonsPerType(search.type || "")
      : useGetPokemonsPerGeneration(search.generation?.[1] || "");

  console.log(pokemonsData?.data?.results);

  if (pokemonsData.isLoading) {
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
        <CardHeader>
          <CardTitle>Step 2 - {selector}</CardTitle>
          <CardDescription>
            You have chosen to pick pokemons based on their {selector}. You will
            now have a multi step form to select your desired pokemons.
          </CardDescription>
          <CardDescription></CardDescription>
        </CardHeader>
        {selector === "types" && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-2 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.data?.pokemon?.map((pokemon) => (
                <div
                  key={`${pokemon.pokemon.name}`}
                  className="border-input has-data-[state=checked]:border-primary/50 relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
                >
                  <div className="flex justify-between gap-2">
                    <Checkbox
                      id={`${pokemon.pokemon.name}-${pokemon.pokemon.url}`}
                      value={pokemon.pokemon.name}
                      className="order-1 after:absolute after:inset-0"
                      defaultChecked={false}
                    />
                    <Image
                      src={
                        shiny === "shiny"
                          ? `/assets/sprites/shiny/${extractPokemonIdFromUrl(
                              pokemon.pokemon.url
                            )}.webp`
                          : `/assets/sprites/base/${extractPokemonIdFromUrl(
                              pokemon.pokemon.url
                            )}.webp`
                      }
                      layout="constrained"
                      width={150}
                      height={150}
                      alt="A lovely bath"
                    />
                  </div>
                  <Label
                    htmlFor={`${pokemon.pokemon.name}-${pokemon.pokemon.url}`}
                  >
                    {beautifyPokemonName(pokemon.pokemon.name)}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
        {selector === "generations" && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-2 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.data?.results?.map((pokemon) => (
                <div
                  key={`${pokemon.name}`}
                  className="border-input has-data-[state=checked]:border-primary/50 relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
                >
                  <div className="flex justify-between gap-2">
                    <Checkbox
                      id={`${pokemon.name}-${pokemon.url}`}
                      value={pokemon.name}
                      className="order-1 after:absolute after:inset-0"
                      defaultChecked={false}
                    />
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
                      width={150}
                      height={150}
                      alt="A lovely bath"
                    />
                  </div>
                  <Label htmlFor={`${pokemon.name}-${pokemon.url}`}>
                    {beautifyPokemonName(pokemon.name)}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
        <StepperComponent />
      </Card>
    </>
  );
}

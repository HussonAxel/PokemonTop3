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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Image } from "@unpic/react";
import { Link } from "@tanstack/react-router";

import type { PokeAPI } from "pokeapi-types";

export default function Step2Fetcher() {
  const search = useSearch({ from: "/" });
  const selector = search.selector;
  const shiny = search.version;

  const pokemonsData =
    selector === "types"
      ? useGetPokemonsPerType(search.type || "").data
      : useGetPokemonsPerGeneration(search.generation?.[1] || "").data;

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
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-2 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.pokemon?.map(
                (pokemonType: PokeAPI.TypePokemon) => (
                  <Link
                    to="/"
                    search={{
                      ...search,
                      pokemons: [
                        extractPokemonIdFromUrl(pokemonType.pokemon.url) || 0,
                      ],
                    }}
                  >
                    <div
                      key={`${pokemonType.pokemon.name}`}
                      className={`border-input relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none hover:border-primary/50 transition-colors ${
                        search.pokemons.includes(
                          extractPokemonIdFromUrl(pokemonType.pokemon.url) || 0
                        )
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between gap-2">
                        <RadioGroupItem
                          value={pokemonType.pokemon.name}
                          id={`${pokemonType.pokemon.name}-${pokemonType.pokemon.url}`}
                          className="order-1 after:absolute after:inset-0"
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
                          width={150}
                          height={150}
                          alt={pokemonType.pokemon.name}
                        />
                      </div>
                      <Label
                        htmlFor={`${pokemonType.pokemon.name}-${pokemonType.pokemon.url}`}
                      >
                        {beautifyPokemonName(pokemonType.pokemon.name)}
                      </Label>
                    </div>
                  </Link>
                )
              )}
            </RadioGroup>
          </CardContent>
        )}
        {selector === "generations" && (
          <CardContent>
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-x-2 gap-y-8 overflow-y-auto my-6 py-2">
              {pokemonsData?.results?.map(
                (pokemon: PokeAPI.NamedAPIResource) => (
                  <Link
                    to="/"
                    search={{
                      ...search,
                      pokemons: [extractPokemonIdFromUrl(pokemon.url) || 0],
                    }}
                  >
                    <div
                      key={`${pokemon.name}`}
                      data-state={
                        search.pokemons.includes(
                          extractPokemonIdFromUrl(pokemon.url) || 0
                        )
                          ? "checked"
                          : "unchecked"
                      }
                      className="border-input relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none hover:border-primary/50 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                    >
                      <div className="flex justify-between gap-2">
                        <RadioGroupItem
                          value={pokemon.name}
                          id={`${pokemon.name}-${pokemon.url}`}
                          className="order-1 after:absolute after:inset-0"
                          checked={search.pokemons.includes(
                            extractPokemonIdFromUrl(pokemon.url) || 0
                          )}
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
                          alt={pokemon.name}
                        />
                      </div>
                      <Label htmlFor={`${pokemon.name}-${pokemon.url}`}>
                        {beautifyPokemonName(pokemon.name)}
                      </Label>
                    </div>
                  </Link>
                )
              )}
            </RadioGroup>
          </CardContent>
        )}
        <StepperComponent />
      </Card>
    </>
  );
}

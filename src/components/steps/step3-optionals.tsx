import { useSearch } from "@tanstack/react-router";
import {
  starters,
  regionalBird,
  regionalMammal,
  bug,
  pseudoLegend,
  pikachuClone,
  eeveeForm,
  fossil,
  regionalForm,
  gigantamaxForms,
  boxLegendary,
  mythical,
  ultraBeast,
  paradox,
  GENERATIONS,
} from "@/utils/consts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Image } from "@unpic/react";
export default function Step3Optionals() {
  const search = useSearch({ from: "/" });
  const pokemonOptions = search.pokemonsOptions;
  console.log(pokemonOptions);
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 justify-center items-center">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Étape {search.step} - Sélection des Pokémons optionnels
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      {pokemonOptions.includes("starters") && (
        <CardContent className="border-[0.5px] border-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12 gap-x-4 gap-y-8 overflow-y-auto my-6 py-2">
            {starters?.map((pokemon) => (
              <div
                key={`${pokemon.name}`}
                data-state={
                  search.pokemons.includes(
                    `${pokemon.id}-${GENERATIONS[0]?.name}`
                  )
                    ? "checked"
                    : "unchecked"
                }
                className="border-input relative flex cursor-pointer flex-col gap-4 rounded-md border shadow-xs outline-none hover:border-primary/50 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 items-center"
              >
                <div className="flex justify-center items-center m-4">
                  <Image
                    src={`/assets/sprites/base/${pokemon.id}.webp`}
                    layout="constrained"
                    width={150}
                    height={150}
                    alt={pokemon.name}
                  />
                </div>
                <RadioGroupItem
                  value={pokemon.name}
                  id={`${pokemon.name}-${pokemon.id}`}
                  className="order-1 after:absolute after:inset-0 left-1 hidden"
                  checked={search.pokemons.includes(
                    `${pokemon.id}-${GENERATIONS[0]?.name}`
                  )}
                />
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      )}
    </Card>
  );
}

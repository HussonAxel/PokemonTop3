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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { Image } from "@unpic/react";

export default function Step3Optionals() {
  const search = useSearch({ from: "/" });
  const pokemonOptions = search.pokemonsOptions;
  console.log(pokemonOptions);

  return (
    <Card className="max-w-full lg:max-w-4xl mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Badge variant="secondary" className="text-sm font-medium">
            Étape {search.step}
          </Badge>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Sélection des Pokémons optionnels
        </CardTitle>
      </CardHeader>

      {pokemonOptions.includes("starters") && (
        <CardContent className="space-y-6">

          <Separator className="my-4" />

          <div className="relative">
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6 bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border/50">
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
                  className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 shadow-sm outline-none transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:scale-105 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={`/assets/sprites/base/${pokemon.id}.webp`}
                      layout="constrained"
                      width={120}
                      height={120}
                      alt={pokemon.name}
                      className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>

                  <div className="text-center space-y-1">
                    <p className="font-medium text-sm capitalize text-foreground">
                      {pokemon.name}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      #{pokemon.id}
                    </Badge>
                  </div>

                  <RadioGroupItem
                    value={pokemon.name}
                    id={`${pokemon.name}-${pokemon.id}`}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    checked={search.pokemons.includes(
                      `${pokemon.id}-${GENERATIONS[0]?.name}`
                    )}
                  />

                  {/* Indicateur de sélection */}
                  <div
                    className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-border transition-colors data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    data-state={
                      search.pokemons.includes(
                        `${pokemon.id}-${GENERATIONS[0]?.name}`
                      )
                        ? "checked"
                        : "unchecked"
                    }
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

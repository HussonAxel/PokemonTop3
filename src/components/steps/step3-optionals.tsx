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
  newEvolutionForms,
  babyPokemon,
  legendaryPokemon,
  megaEvolutions,
  gigantamaxPokemon,
} from "@/utils/consts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PokemonCardList } from "@/components/ui/pokemon-card-list";
import { Separator } from "@/components/ui/separator";

export default function Step3Optionals() {
  const search = useSearch({ from: "/" });
  const pokemonOptions = search.pokemonsOptions;

  // Configuration des catégories avec leurs titres
  const categories = [
    // Pokémon de base et populaires
    { key: "starters", data: starters, title: "Starter Pokémon" },
    { key: "regionalBird", data: regionalBird, title: "Regional Birds" },
    { key: "regionalMammal", data: regionalMammal, title: "Regional Mammals" },
    { key: "bug", data: bug, title: "Bug Pokémon" },
    { key: "fossil", data: fossil, title: "Fossil Pokémon" },
    { key: "babyPokemon", data: babyPokemon, title: "Baby Pokémon" },
    { key: "pikachuClone", data: pikachuClone, title: "Pikachu Clones" },
    { key: "eeveeForm", data: eeveeForm, title: "Eeveelutions" },

    // Pokémon régionaux
    { key: "regionalForm", data: regionalForm, title: "Regional Forms" },
    {
      key: "newEvolutionForms",
      data: newEvolutionForms,
      title: "New Evolution Forms",
    },
    { key: "megaEvolutions", data: megaEvolutions, title: "Mega Evolutions" },
    {
      key: "gigantamaxPokemon",
      data: gigantamaxPokemon,
      title: "Gigantamax Pokémon",
    },

    // Pokémon puissants et légendaires
    { key: "pseudoLegend", data: pseudoLegend, title: "Pseudo-Legendaries" },
    { key: "ultraBeasts", data: ultraBeast, title: "Ultra Beasts" },
    { key: "paradox", data: paradox, title: "Paradox Pokémon" },
    { key: "boxLegendary", data: boxLegendary, title: "Box Legendaries" },
    { key: "legendary", data: legendaryPokemon, title: "Legendary Pokémon" },
    { key: "mythicals", data: mythical, title: "Mythical Pokémon" },
  ];

  return (
    <Card className="max-w-full mx-auto">
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

      <CardContent className="space-y-8">
        {categories.map((category, index) => {
          if (!pokemonOptions.includes(category.key)) return null;
          
          return (
            <div key={category.key}>
              {index > 0 && <Separator className="my-6" />}
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
              </div>
              
              <PokemonCardList
                data={category.data}
                selector="optionals"
                currentGenerationIndex={0}
                showId={true}
                showGenerationBadge={false}
                currentCategory={category.key}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

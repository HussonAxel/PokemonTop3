import { useSearch } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Image } from "@unpic/react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

// Example mapping for Pokémon generations
const generationMap: Record<string, number> = {
  "001": 1, // Bulbasaur
  "004": 1, // Charmander
  "152": 2, // Chikorita
  // ... add more mappings
};

export default function Step4Screen() {
  const search = useSearch({ from: "/" });
  const pokemonsSelected = search.pokemons || [];
  const pokemonsOptions = search.pokemonsOptions || [];
  const OptionalPokemons = search.OptionalPokemons || [];
  const selector = search.selector || "optionals";

  const [sortMethod, setSortMethod] = useState<"generation" | "type">(
    "generation"
  );

  const getPokemonId = (pokemonString: string) => pokemonString.split("-")[0];

  const getPokemonType = (pokemonString: string) => {
    const parts = pokemonString.split("-");
    return parts.length > 1 ? parts[1] : null;
  };

  const getTypeColorClass = (type: string | null) => {
    if (!type || (selector !== "types" && selector !== "both")) return "";
    return `bg-${type.toLowerCase()}`;
  };

  const getPokemonName = (pokemonId: string) => `Pokémon #${pokemonId}`;

  const sortPokemons = (list: string[]) => {
    if (sortMethod === "generation") {
      return [...list].sort((a, b) => {
        const genA = generationMap[getPokemonId(a)] || 99;
        const genB = generationMap[getPokemonId(b)] || 99;
        return genA - genB;
      });
    }
    if (sortMethod === "type") {
      return [...list].sort((a, b) => {
        const typeA = getPokemonType(a) || "";
        const typeB = getPokemonType(b) || "";
        return typeA.localeCompare(typeB);
      });
    }
    return list;
  };

  const renderPokemonCard = (
    pokemon: string,
    index: number,
    keyPrefix: string
  ) => {
    const pokemonId = getPokemonId(pokemon);
    const pokemonType = getPokemonType(pokemon);

    return (
      <Card
        key={`${keyPrefix}-${index}`}
        className={`group relative overflow-hidden rounded-xl border border-white/10 hover:shadow-lg transition-all duration-200 ${getTypeColorClass(
          pokemonType
        )}`}
      >
        {(selector === "types" || selector === "both") && pokemonType && (
          <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
        )}
        <CardContent className="p-4 text-center relative z-10">
          <div className="relative mb-3">
            <Image
              src={`/assets/sprites/base/${pokemonId}.webp`}
              layout="constrained"
              width={175}
              height={175}
              alt={getPokemonName(pokemonId)}
              className="mx-auto drop-shadow-lg"
            />
          </div>
          <h4
            className={`font-semibold text-sm mb-2 ${
              (selector === "types" || selector === "both") && pokemonType
                ? "text-white drop-shadow"
                : "text-gray-900"
            }`}
          >
            {getPokemonName(pokemonId)}
          </h4>
          {pokemonType && keyPrefix === "optional" && (
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 rounded-full ${
                selector === "types" || selector === "both"
                  ? "bg-white/20 text-white border-white/40 backdrop-blur-sm"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {pokemonType}
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  const sortedSelected = useMemo(
    () => sortPokemons(pokemonsSelected),
    [pokemonsSelected, sortMethod]
  );
  const sortedOptional = useMemo(
    () => sortPokemons(OptionalPokemons),
    [OptionalPokemons, sortMethod]
  );

  return (
    <div className="space-y-8 p-6">
      {/* Sorting Controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={sortMethod === "generation" ? "default" : "outline"}
          onClick={() => setSortMethod("generation")}
        >
          Sort by Generation
        </Button>
        <Button
          variant={sortMethod === "type" ? "default" : "outline"}
          onClick={() => setSortMethod("type")}
        >
          Sort by Type
        </Button>
      </div>

      {sortedSelected.length > 0 && (
        <Card className="border-primary/20 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🎯</span>
              Pokémon Sélectionnés
            </CardTitle>
            <CardDescription>
              {sortedSelected.length} Pokémon choisis pour votre équipe
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {sortedSelected.map((p, i) =>
                renderPokemonCard(p, i, "selected")
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-8" />

      {sortedOptional.length > 0 && (
        <Card className="border-green-500/30 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <span className="text-2xl">🌟</span>
              Pokémon Optionnels
            </CardTitle>
            <CardDescription>
              {sortedOptional.length} Pokémon optionnels sélectionnés
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {sortedOptional.map((p, i) =>
                renderPokemonCard(p, i, "optional")
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {sortedSelected.length === 0 &&
        pokemonsOptions.length === 0 &&
        sortedOptional.length === 0 && (
          <Card className="border-dashed border-2 border-muted-foreground/30 rounded-xl">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2">
                Aucun Pokémon sélectionné
              </h3>
              <p className="text-muted-foreground">
                Commencez par sélectionner des Pokémon dans les étapes
                précédentes
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

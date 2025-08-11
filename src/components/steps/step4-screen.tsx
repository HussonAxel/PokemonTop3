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

export default function Step4Screen() {
  const search = useSearch({ from: "/" });
  const pokemonsSelected = search.pokemons || [];
  const pokemonsOptions = search.pokemonsOptions || [];
  const OptionalPokemons = search.OptionalPokemons || [];
  const selector = search.selector || "optionals";

  const getPokemonId = (pokemonString: string) => {
    return pokemonString.split("-")[0];
  };

  const getPokemonType = (pokemonString: string) => {
    const parts = pokemonString.split("-");
    return parts.length > 1 ? parts[1] : null;
  };

  const getTypeColorClass = (type: string | null) => {
    if (!type || selector !== "types") return "";

    // Convertir le type en classe CSS correspondante
    const typeClass = type.toLowerCase();
    return `bg-${typeClass} border-${typeClass}`;
  };

  const getPokemonName = (pokemonId: string) => {
    return `Pokémon #${pokemonId}`;
  };

  return (
    <div className="space-y-8 p-6">
      {pokemonsSelected.length > 0 && (
        <div>
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Pokémon Sélectionnés
              </CardTitle>
              <CardDescription>
                {pokemonsSelected.length} Pokémon choisis pour votre équipe
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {pokemonsSelected.map((pokemon, index) => {
                  const pokemonId = getPokemonId(pokemon);
                  const pokemonType = getPokemonType(pokemon);

                  return (
                    <Card
                      key={`selected-${index}`}
                      className={`hover:shadow-md transition-all duration-175 ${getTypeColorClass(pokemonType)}`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="relative mb-3">
                          <Image
                            src={`/assets/sprites/base/${pokemonId}.webp`}
                            layout="constrained"
                            width={175}
                            height={175}
                            alt={getPokemonName(pokemonId)}
                            className="mx-auto"
                          />
                        </div>
                        <h4
                          className={`font-semibold text-sm mb-2 ${selector === "types" && pokemonType ? "text-white" : ""}`}
                        >
                          {getPokemonName(pokemonId)}
                        </h4>
                        {pokemonType && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${selector === "types" ? "bg-white/20 text-white border-white/30" : ""}`}
                          >
                            {pokemonType}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Separator className="my-8" />

      {OptionalPokemons.length > 0 && (
        <div>
          <Card className="border-green-175 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                Pokémon Optionnels
              </CardTitle>
              <CardDescription>
                {OptionalPokemons.length} Pokémon optionnels sélectionnés
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {OptionalPokemons.map((option, index) => {
                  const pokemonId = getPokemonId(option);
                  const pokemonType = getPokemonType(option);

                  return (
                    <Card
                      key={`optional-${index}`}
                      className={`hover:shadow-md transition-all duration-175 ${getTypeColorClass(pokemonType)}`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="relative mb-3">
                          <Image
                            src={`/assets/sprites/base/${pokemonId}.webp`}
                            layout="constrained"
                            width={175}
                            height={175}
                            alt={getPokemonName(pokemonId)}
                            className="mx-auto"
                          />
                        </div>
                        <h4
                          className={`font-semibold text-sm mb-2 ${selector === "types" && pokemonType ? "text-white" : ""}`}
                        >
                          {getPokemonName(pokemonId)}
                        </h4>
                        {pokemonType && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${selector === "types" ? "bg-white/20 text-white border-white/30" : ""}`}
                          >
                            {pokemonType}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Message si aucun Pokémon */}
      {pokemonsSelected.length === 0 &&
        pokemonsOptions.length === 0 &&
        OptionalPokemons.length === 0 && (
          <Card className="border-dashed border-2 border-muted-foreground/30">
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

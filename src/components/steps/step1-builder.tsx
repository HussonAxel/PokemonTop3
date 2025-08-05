import { Link, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  pickerSelector,
  pokemonStatusVersion,
  pokemonsOptions,
  SelectRoster,
} from "@/utils/consts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  prefetchPokemonPerType,
  prefetchPokemonsPerGeneration,
  useGetTypes,
} from "@/services/pokemons";

import { GENERATIONS } from "@/utils/consts";

export default function Step1Builder({ search }: { search: any }) {
  const { data: types } = useGetTypes();
  const filteredTypes =
    types?.results
      ?.filter(
        (type: any) => type.name !== "unknown" && type.name !== "stellar"
      )
      .map((type: any) => type.name) || [];

  const firstType = filteredTypes[0];

  const id = useId();
  const navigate = useNavigate();

  const prefetchPokemons = prefetchPokemonPerType();
  const prefetchPokemonsGeneration = prefetchPokemonsPerGeneration();

  // Descriptions pour chaque option
  const optionDescriptions = {
    generations: "Parcourez les Pokémon par génération (Kanto, Johto, etc.)",
    types: "Explorez les Pokémon par types élémentaires (Feu, Eau, etc.)",
    both: "Combinez les critères de génération et de type",
    normal: "Use classic sugimori sprites",
    shiny: "Use shinies sprites instead of basic",
    yes: "Créer une équipe complète de 6 Pokémon",
    no: "Sélection libre sans contrainte d'équipe",
  };

  return (
    <div className="max-w-4xl mx-auto my-16">
      {/* En-tête avec gradient */}
      <Card className="overflow-hidden">
        <div>
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm font-medium">
                Étape 1
              </Badge>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Configuration du Picker
            </CardTitle>
            <CardDescription className="text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Personnalisez votre expérience de sélection de Pokémon. Choisissez
              votre méthode de navigation, vos préférences visuelles et les
              options avancées.
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-8 pb-8">
          {/* Sélecteur de méthode */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Méthode de sélection
                </h3>
                <p className="text-sm text-muted-foreground">
                  Comment souhaitez-vous parcourir les Pokémon ?
                </p>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pickerSelector.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, selector: item.value }}
                >
                  <div
                    className={`group relative flex flex-col gap-4 rounded-xl border-2 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[102%] ${
                      search.selector === item.value
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        id={`${id}-${item.value}`}
                        value={item.value}
                        checked={search.selector === item.value}
                        className="after:absolute after:inset-0"
                      />
                      <Label
                        htmlFor={`${id}-${item.value}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        optionDescriptions[
                          item.value as keyof typeof optionDescriptions
                        ]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Sélecteur de version */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Version des Pokémon
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choisissez l'apparence des Pokémon à afficher
                </p>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pokemonStatusVersion.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, version: item.value }}
                >
                  <div
                    className={`group relative flex flex-col gap-4 rounded-xl border-2 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[102%] ${
                      search.version === item.value
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        id={`${id}-version-${item.value}`}
                        value={item.value}
                        checked={search.version === item.value}
                        className="after:absolute after:inset-0"
                      />
                      <Label
                        htmlFor={`${id}-version-${item.value}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        optionDescriptions[
                          item.value as keyof typeof optionDescriptions
                        ]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Options de Pokémon */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Catégories optionnelles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les catégories spéciales de Pokémon à inclure
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pokemonsOptions.map((item) => {
                const isChecked = search.pokemonsOptions.includes(item.value);
                const newPokemonsOptions = isChecked
                  ? search.pokemonsOptions.filter(
                      (option: any) => option !== item.value
                    )
                  : [...search.pokemonsOptions, item.value];

                return (
                  <Link
                    key={`${id}-${item.value}`}
                    to={`/`}
                    search={{
                      ...search,
                      pokemonsOptions: newPokemonsOptions,
                    }}
                  >
                    <div
                      className={`group relative flex items-center gap-3 rounded-lg border-2 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[102%] ${
                        isChecked
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                    >
                      <Checkbox
                        id={`${id}-option-${item.value}`}
                        checked={isChecked}
                        value={item.value}
                        className="after:absolute after:inset-0"
                      />
                      <Label
                        htmlFor={`${id}-option-${item.value}`}
                        className="text-sm font-medium cursor-pointer leading-tight"
                      >
                        {item.label}
                      </Label>
                    </div>
                  </Link>
                );
              })}
            </div>

            {search.pokemonsOptions.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <span>
                  {search.pokemonsOptions.length} catégorie
                  {search.pokemonsOptions.length > 1 ? "s" : ""} sélectionnée
                  {search.pokemonsOptions.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* Configuration de l'équipe */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10"></div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Mode équipe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Souhaitez-vous créer une équipe complète ?
                  </p>
                </div>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SelectRoster.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, selectRoster: item.value }}
                >
                  <div
                    className={`group relative flex flex-col gap-4 rounded-xl border-2 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[102%] ${
                      search.selectRoster === item.value
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        id={`${id}-roster-${item.value}`}
                        value={item.value}
                        checked={search.selectRoster === item.value}
                        className="after:absolute after:inset-0"
                      />
                      <Label
                        htmlFor={`${id}-roster-${item.value}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        optionDescriptions[
                          item.value as keyof typeof optionDescriptions
                        ]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </RadioGroup>
          </div>
          {/* Bouton Start Picker modernisé */}
          <Button
            size="lg"
            className="flex items-center gap-3 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => {
              navigate({
                search: {
                  ...search,
                  step: search.step + 1,
                  ...(search.selector === "types" && { type: firstType }),
                  ...(search.selector === "generations" && {
                    generation: [
                      GENERATIONS[0].start.toString(),
                      GENERATIONS[0].end.toString(),
                    ],
                  }),
                  ...(search.selector === "both" && {
                    type: firstType,
                    generation: [
                      GENERATIONS[0].start.toString(),
                      GENERATIONS[0].end.toString(),
                    ],
                  }),
                },
              });
            }}
            onMouseEnter={() => {
              {
                search.selector === "types"
                  ? prefetchPokemons(firstType)
                  : prefetchPokemonsGeneration(GENERATIONS[0].end.toString());
              }
            }}
          >
            Commencer la sélection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

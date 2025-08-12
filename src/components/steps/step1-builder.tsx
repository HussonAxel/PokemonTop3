import { Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import {
  prefetchPokemonPerType,
  prefetchPokemonsPerGeneration,
  useGetTypes,
} from "@/services/pokemons";

import { GENERATIONS } from "@/utils/consts";
import BadgesSummary from "./badges-summary";

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

  // Descriptions for each option
  const optionDescriptions = {
    generations: "Browse Pokémon by generation (Kanto, Johto, etc.)",
    types: "Explore Pokémon by elemental types (Fire, Water, etc.)",
    both: "Combine generation and type criteria",
    normal: "Use classic sugimori sprites",
    shiny: "Use shinies sprites instead of basic",
    yes: "Create a complete team of 6 Pokémon",
    no: "Free selection without team constraints",
  };

  console.log(search);
  return (
    <div className="max-w-6xl mx-auto my-16">
      {/* Header with gradient */}
      <Card className="overflow-hidden border-none">
        <BadgesSummary />

        <CardContent className="space-y-8 pb-8">
          {/* Method selector */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Selection Method
                </h3>
                <p className="text-sm text-muted-foreground">
                  How would you like to browse Pokémon?
                </p>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pickerSelector.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, selector: item.value }}
                >
                  <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-4 py-6 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                    <RadioGroupItem
                      id={`${id}-${item.value}`}
                      value={item.value}
                      checked={search.selector === item.value}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {item.value === "generations"
                          ? "G"
                          : item.value === "types"
                            ? "T"
                            : "B"}
                      </span>
                    </div>
                    <label
                      htmlFor={`${id}-${item.value}`}
                      className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
                    >
                      {item.label}
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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

          {/* Version selector */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Pokémon Version
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose the appearance of Pokémon to display
                </p>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-2 gap-4">
              {pokemonStatusVersion.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, version: item.value }}
                >
                  <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-4 py-6 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                    <RadioGroupItem
                      id={`${id}-version-${item.value}`}
                      value={item.value}
                      checked={search.version === item.value}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {item.value === "normal" ? "N" : "S"}
                      </span>
                    </div>
                    <label
                      htmlFor={`${id}-version-${item.value}`}
                      className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
                    >
                      {item.label}
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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

          {/* Pokémon options */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Optional Categories
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select special Pokémon categories to include
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
                    <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-2 rounded-md border px-3 py-8 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                      <Checkbox
                        id={`${id}-option-${item.value}`}
                        checked={isChecked}
                        value={item.value}
                        className="sr-only"
                      />
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">
                          {item.value.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <label
                        htmlFor={`${id}-option-${item.value}`}
                        className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
                      >
                        {item.label}
                      </label>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Team configuration */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10"></div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Team Mode
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Would you like to create a complete team?
                  </p>
                </div>
              </div>
            </div>

            <RadioGroup className="grid grid-cols-2 gap-4">
              {SelectRoster.map((item) => (
                <Link
                  key={item.value}
                  to={`/`}
                  search={{ ...search, selectRoster: item.value }}
                >
                  <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-4 py-6 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] h-full">
                    <RadioGroupItem
                      id={`${id}-roster-${item.value}`}
                      value={item.value}
                      checked={search.selectRoster === item.value}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {item.value === "yes" ? "6" : "∞"}
                      </span>
                    </div>
                    <label
                      htmlFor={`${id}-roster-${item.value}`}
                      className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
                    >
                      {item.label}
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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

          {/* Modernized Start Picker button */}
          <Button
            size="lg"
            className="flex items-center w-full py-6 text-lg font-semibold shadow-lg cursor-pointer"
            onClick={() => {
              navigate({
                resetScroll: false,
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
            Start Selection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

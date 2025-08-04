import { Link, useNavigate } from "@tanstack/react-router";
import {
  Card,
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
  return (
    <Card className="max-w-1/3 m-auto">
      <CardHeader className="flex flex-col gap-8">
        <CardTitle>Favorites Pokémon Picker</CardTitle>
        <CardDescription className="text-md">
          Select your desired steps and options to create a custom team. There
          is multiple steps to choose from to customize your team as you want.
          You can hover steps to see the options available and more informations
          about how it will impact the picker.
        </CardDescription>
        <fieldset className="space-y-4">
          <legend className="text-foreground leading-none font-semibold">
            Picker Selector
          </legend>
          <RadioGroup className="flex flex-wrap gap-2">
            {pickerSelector.map((item) => (
              <Link
                key={item.value}
                to={`/`}
                search={{ ...search, selector: item.value }}
              >
                <div
                  className={`border-input relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none transition-colors ${
                    search.selector === item.value
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id={`${id}-${item.value}`}
                      value={item.value}
                      className="after:absolute after:inset-0"
                    />
                    <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                  </div>
                </div>
              </Link>
            ))}
          </RadioGroup>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-foreground leading-none font-semibold">
            Version Selector
          </legend>
          <RadioGroup className="flex flex-wrap gap-2">
            {pokemonStatusVersion.map((item) => (
              <Link
                key={item.value}
                to={`/`}
                search={{
                  ...search,
                  version: item.value,
                }}
              >
                <div
                  className={`border-input relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none transition-colors ${
                    search.version === item.value
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id={`${id}-${item.value}`}
                      value={item.value}
                      className="after:absolute after:inset-0"
                    />
                    <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                  </div>
                </div>
              </Link>
            ))}
          </RadioGroup>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-foreground leading-none font-semibold">
            Pokemons options
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {pokemonsOptions.map((item) => {
              const isChecked = search.pokemonsOptions.includes(item.value);
              const newPokemonsOptions = isChecked
                ? search.pokemonsOptions.filter(
                    (option) => option !== item.value
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
                    className={`border-input relative flex cursor-pointer flex-row gap-4 rounded-md border p-4 shadow-xs outline-none items-center align-middle transition-colors ${
                      isChecked
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/30"
                    }`}
                  >
                    <div className="flex justify-between gap-2">
                      <Checkbox
                        id={`${id}-${item.value}`}
                        checked={isChecked}
                        value={item.value}
                        className="order-1 after:absolute after:inset-0"
                      />
                    </div>
                    <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                  </div>
                </Link>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="space-y-4 flex flex-row gap-4 w-full justify-between">
          <legend className="text-foreground leading-none font-semibold">
            Roster Selector
          </legend>
          <RadioGroup className="flex flex-wrap gap-2">
            {SelectRoster.map((item) => (
              <Link
                key={item.value}
                to={`/`}
                search={{ ...search, selectRoster: item.value }}
              >
                <div
                  className={`border-input relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none transition-colors ${
                    search.selectRoster === item.value
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id={`${id}-${item.value}`}
                      value={item.value}
                      className="after:absolute after:inset-0"
                    />
                    <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                  </div>
                </div>
              </Link>
            ))}
          </RadioGroup>
          <Button
            onClick={() => {
              navigate({
                search: {
                  ...search,
                  step: search.step + 1,
                  ...(search.selector === "types" && { type: firstType }),
                  ...(search.selector === "generations" && {
                    generation: GENERATIONS[0].end.toString(),
                  }),
                  ...(search.selector === "both" && {
                    type: firstType,
                    generation: GENERATIONS[0].end.toString(),
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
            Start Picker
          </Button>
        </fieldset>
      </CardHeader>
    </Card>
  );
}

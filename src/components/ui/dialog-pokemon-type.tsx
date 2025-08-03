import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes";
import {
  prefetchPokemonPerType,
  useGetPokemonsPerType,
} from "@/services/pokemons";
import {
  extractPokemonIdFromUrl,
  beautifyPokemonName,
} from "@/utils/functions";

const pokemonType = z.enum([
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
]);
export const TypeNameSearchSchema = z.object({
  type: pokemonType.optional(),
  pokemonsType: z.array(z.string()).min(1).max(4).optional(),
});

export default function DialogPokemonType({
  type,
}: {
  type: z.infer<typeof pokemonType>;
}) {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = useSearch({ from: Route.fullPath });
  const typeSearch = search.type;
  const isOpen = typeSearch === type;

  const prefetchPokemonsPerType = prefetchPokemonPerType();
  const { data: pokemonsPerType } = useGetPokemonsPerType(typeSearch || "");

  console.log(pokemonsPerType?.pokemon);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        open ? navigate({ search: { type } }) : navigate({ search: {} });
      }}
    >
      <DialogTrigger asChild onMouseEnter={() => prefetchPokemonsPerType(type)}>
        <Link to={"/"} search={{ type }}>
          <Button variant="default">
            <span className="capitalize">{type}</span> pokemons type
          </Button>
        </Link>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 max-h-3/4 h-full sm:max-w-1/2 [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            SELECT YOUR POKEMON(S)
          </DialogTitle>
          <div className="grid grid-cols-4 gap-x-2 gap-y-8 overflow-y-auto my-6 py-2">
            {pokemonsPerType?.pokemon.map((pokemon: any) => (
              <Link
                to={"/"}
                search={{
                  ...search,
                  pokemonsType: [
                    ...(search.pokemonsType || []),
                    pokemon.pokemon.name,
                  ],
                }}
              >
                <div
                  key={pokemon.pokemon.name}
                  className="flex flex-col items-center justify-center py-4 border-[0.5px] border-gray-200 rounded-md mx-4 gap-2 shadow-md shadow-gray-200 bg-clip-padding hover:scale-[102%] transition-transform duration-300 ease-in-out active:scale-[98%] active:shadow-2xl active:shadow-gray-500 cursor-pointer"
                >
                  <img
                    src={`/assets/sprites/base/${extractPokemonIdFromUrl(pokemon.pokemon.url)}.webp`}
                    alt={pokemon.pokemon.name}
                    className="w-24 h-24 md:w-28 md:h-28 transition-transform duration-300"
                  />
                  <p className="font-semibold">
                    {beautifyPokemonName(pokemon.pokemon.name)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <DialogFooter className="px-6 pb-6 sm:justify-end">
            <Link to={"/"} search={{ ...search }}>
              <DialogClose asChild>
                <Button type="button">Okay</Button>
              </DialogClose>
            </Link>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

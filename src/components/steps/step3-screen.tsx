import { useSearch } from "@tanstack/react-router";

export default function Step3Screen() {
  const search = useSearch({ from: "/" });
  const pokemonsSelected = search.pokemons;
  console.log(pokemonsSelected);
  return (
    <div>
      {pokemonsSelected.map((pokemon) => (
        <p>{pokemon}</p>
      ))}
    </div>
  );
}

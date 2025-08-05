import { useSearch } from "@tanstack/react-router";

export default function Step3Screen() {
  const search = useSearch({ from: "/" });
  const pokemonsSelected = search.pokemons;
  const pokemonsOptions = search.pokemonsOptions;
  const OptionalPokemons = search.OptionalPokemons
  console.log(pokemonsOptions);
  return (
    <div>
      {pokemonsSelected.map((pokemon) => (
        <p>{pokemon}</p>
      ))}
      <h2 className="text-2xl font-bold mb-4">Pokémon Options</h2>
      {pokemonsOptions.map((option) => (
        <p key={option}>{option}</p>
      ))}
      {OptionalPokemons.map((option) => (
        <p key={option}>Optional Pokémon ID: {option}</p>
      ))}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useGetTypes } from "@/services/pokemons";
import DialogPokemonType, {
  TypeNameSearchSchema,
} from "@/components/ui/dialog-pokemon-type";

export const Route = createFileRoute("/")({
  validateSearch: TypeNameSearchSchema,
  component: App,
});

function App() {
  const { data: typesData, isLoading } = useGetTypes();
  const typesList = typesData?.results.filter(
    (type: any) => type.name !== "unknown" && type.name !== "stellar"
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-4 gap-4">
      {typesData &&
        typesList.map((type: any) => (
          <DialogPokemonType type={type.name} key={type.name} />
        ))}
    </div>
  );
}

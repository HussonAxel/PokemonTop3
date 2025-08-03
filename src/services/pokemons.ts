import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

//──────────────────────────────────────────────────────────────────────────────
// CONSTANTS
//──────────────────────────────────────────────────────────────────────────────
const BASE_POKEAPI_URL = "https://pokeapi.co/api/v2";
const DEFAULT_CACHE_OPTIONS = { keepPreviousData: true };

//──────────────────────────────────────────────────────────────────────────────
// QUERY KEYS
//──────────────────────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  pokemonsPerTypes: (typeName: string) =>
    ["pokemonsPerTypes", typeName] as const,
  types: () => ["types"] as const,
};

//──────────────────────────────────────────────────────────────────────────────
// FETCH FUNCTIONS
//──────────────────────────────────────────────────────────────────────────────

export const fetchTypes = async () => {
  const res = await fetch(`${BASE_POKEAPI_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch types");
  return res.json();
};

export const fetchPokemonsPerType = async (typeName: string) => {
  const res = await fetch(`${BASE_POKEAPI_URL}/type/${typeName}`);
  if (!res.ok) throw new Error("Failed to fetch pokemons per type");
  return res.json();
};
//──────────────────────────────────────────────────────────────────────────────
// PREFETCH FUNCTIONS
//──────────────────────────────────────────────────────────────────────────────

export const prefetchTypes = () => {
  const qc = useQueryClient();
  return () => {
    qc.ensureQueryData({
      queryKey: QUERY_KEYS.types(),
      queryFn: fetchTypes,
      ...DEFAULT_CACHE_OPTIONS,
    });
  };
};

export const prefetchPokemonPerType = () => {
  const qc = useQueryClient();
  return (typeName: string) => {
    qc.ensureQueryData({
      queryKey: QUERY_KEYS.pokemonsPerTypes(typeName),
      queryFn: () => fetchPokemonsPerType(typeName),
      ...DEFAULT_CACHE_OPTIONS,
    });
  };
};

//──────────────────────────────────────────────────────────────────────────────
// GET DATA HOOKS
//──────────────────────────────────────────────────────────────────────────────

export const useGetTypes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.types(),
    queryFn: fetchTypes,
    ...DEFAULT_CACHE_OPTIONS,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
};

export const useGetPokemonsPerType = (typeName: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.pokemonsPerTypes(typeName),
    queryFn: () => fetchPokemonsPerType(typeName),
    ...DEFAULT_CACHE_OPTIONS,
    enabled: !!typeName,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
};

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import Step1Builder from "@/components/steps/step1-builder";
import Step2Fetcher from "@/components/steps/step2-fetcher";
const stepsSearchSchema = z.object({
  step: z.number().default(1),
  selector: z.string().default(""),
  version: z.string().default(""),
  pokemonsOptions: z.array(z.string()).default([]),
  selectRoster: z.string().default(""),
  type: z.string().optional(),
  generation: z.array(z.string()).length(2).optional(),
  pokemons: z.array(z.number()).default([]),
});

export const Route = createFileRoute("/")({
  validateSearch: stepsSearchSchema,
  component: App,
});

function App() {
  const search = Route.useSearch();
  return (
    <>
      {search.step === 1 && <Step1Builder search={search} />}

      {search.step === 2 && <Step2Fetcher />}
    </>
  );
}

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useGetTypes } from "@/services/pokemons";
import { useSearch } from "@tanstack/react-router";
import { GENERATIONS } from "@/utils/consts";

export default function StepperComponent() {
  const { data: types } = useGetTypes();
  const filteredTypes =
    types?.results
      ?.filter(
        (type: any) => type.name !== "unknown" && type.name !== "stellar"
      )
      .map((type: any) => type.name) || [];

  const filteredGenerations = GENERATIONS.map((generation) => generation.name);
  const search = useSearch({ from: "/" });
  const [currentStep, setCurrentStep] = useState(1);
  const numberOfSteps =
    search.selector === "generations" ? filteredGenerations : filteredTypes;

  return (
    <div className="mx-auto w-3/4 space-y-8 text-center">
      <div className="space-y-3">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {numberOfSteps.map((step: number) => (
            <StepperItem key={step} step={step} className="flex-1">
              <StepperTrigger
                className="w-full flex-col items-start gap-2"
                asChild
              >
                <StepperIndicator
                  asChild
                  className="bg-border h-2 w-full rounded-none"
                >
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
        <div className="text-muted-foreground text-sm font-medium tabular-nums">
          Step {currentStep} of {numberOfSteps.length}
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep >= numberOfSteps.length}
        >
          Next step
        </Button>
      </div>
    </div>
  );
}

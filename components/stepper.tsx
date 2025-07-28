"use client"

import { CheckIcon } from "lucide-react"

interface StepperProps {
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
}

export function Stepper({ currentStep, totalSteps, onStepChange }: StepperProps) {
  const steps = [
    { id: 1, name: "Datos generales" },
    { id: 2, name: "Proveedores" },
    { id: 3, name: "Vista previa" },
    { id: 4, name: "Exportar" },
  ]

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? "pr-8" : ""}`}>
            {step.id < currentStep ? (
              <button type="button" className="group flex w-full items-center" onClick={() => onStepChange(step.id)}>
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </span>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </button>
            ) : step.id === currentStep ? (
              <button type="button" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                  <span className="text-blue-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-blue-600">{step.name}</span>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </button>
            ) : (
              <button
                type="button"
                className="group flex items-center px-6 py-4 text-sm font-medium"
                onClick={() => onStepChange(step.id)}
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                  <span className="text-gray-500">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

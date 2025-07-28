"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Stepper } from "@/components/stepper"
import { FormGeneral } from "@/components/form-general"
import { ProveedoresTable } from "@/components/proveedores-table"
import { Preview } from "@/components/preview"
import { ExportButtons } from "@/components/export-buttons"
import { useEventStore } from "@/store/event-store"

export default function NewEventPage() {
  const router = useRouter()
  const { addEvent } = useEventStore()
  const [step, setStep] = useState(1)
  const [eventData, setEventData] = useState({
    id: Date.now().toString(),
    date: "",
    venueId: "",
    venue: "",
    address: "",
    loadingPoint: "MUJICA – Buenos Aires Guarda",
    producerContact: { name: "", email: "", phone: "" },
    hasLocalPermit: false,
    localPermitFile: null,
    hasAlcoholPermit: false,
    alcoholPermitFile: null,
    truckArrivalTime: "07:45",
    setupStartTime: "10:30",
    technicalTestsTime: "22:00",
    openingTime: "00:30",
    closingTime: "04:00",
    teardownTime: "07:00",
    providers: [],
  })

  const updateEventData = (data: any) => {
    setEventData({ ...eventData, ...data })
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSave = () => {
    addEvent(eventData)
    router.push("/")
  }

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Nueva Fecha de Evento</h1>

      <Stepper currentStep={step} totalSteps={4} onStepChange={setStep} />

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
        {step === 1 && <FormGeneral eventData={eventData} updateEventData={updateEventData} />}
        {step === 2 && (
          <ProveedoresTable
            providers={eventData.providers}
            updateProviders={(providers) => updateEventData({ providers })}
          />
        )}
        {step === 3 && <Preview eventData={eventData} />}
        {step === 4 && <ExportButtons eventData={eventData} />}

        <div className="mt-8 flex justify-between">
          <button
            onClick={step === 1 ? () => router.push("/") : handlePrevious}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            {step === 1 ? "Cancelar" : "Anterior"}
          </button>

          <button
            onClick={step === 4 ? handleSave : handleNext}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
          >
            {step === 4 ? "Guardar Evento" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  )
}

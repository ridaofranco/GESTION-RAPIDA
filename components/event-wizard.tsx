"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEvento } from "@/components/form-evento"
import { ProveedoresTable } from "@/components/proveedores-table"
import { Preview } from "@/components/preview"
import { ExportButtons } from "@/components/export-buttons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"

interface EventWizardProps {
  onSave: (eventData: any) => void
  onCancel: () => void
}

export function EventWizard({ onSave, onCancel }: EventWizardProps) {
  const [step, setStep] = useState(1)
  const [eventData, setEventData] = useState({
    date: "",
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
    onSave(eventData)
  }

  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-6">
        <Tabs value={String(step)} onValueChange={(value) => setStep(Number.parseInt(value))}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="1">Datos generales</TabsTrigger>
            <TabsTrigger value="2">Proveedores</TabsTrigger>
            <TabsTrigger value="3">Vista previa</TabsTrigger>
            <TabsTrigger value="4">Exportar</TabsTrigger>
          </TabsList>

          <TabsContent value="1">
            <FormEvento eventData={eventData} updateEventData={updateEventData} />
          </TabsContent>

          <TabsContent value="2">
            <ProveedoresTable
              providers={eventData.providers}
              updateProviders={(providers) => updateEventData({ providers })}
            />
          </TabsContent>

          <TabsContent value="3">
            <Preview eventData={eventData} />
          </TabsContent>

          <TabsContent value="4">
            <ExportButtons eventData={eventData} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          ) : (
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}

          {step < 4 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" /> Guardar evento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { useEventStore } from "@/store/event-store"

interface FormGeneralProps {
  eventData: any
  updateEventData: (data: any) => void
}

export function FormGeneral({ eventData, updateEventData }: FormGeneralProps) {
  const { venues } = useEventStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateEventData({ [name]: value })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateEventData({
      producerContact: {
        ...eventData.producerContact,
        [name]: value,
      },
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    updateEventData({ [name]: checked })
  }

  const handleVenueChange = (venueId: string) => {
    const selectedVenue = venues.find((v) => v.id === venueId)
    if (selectedVenue) {
      updateEventData({
        venueId,
        venue: selectedVenue.nombre,
        address: selectedVenue.direccion,
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Datos generales & habilitaciones</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha del evento</Label>
            <Input id="date" name="date" type="date" value={eventData.date} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Select value={eventData.venueId} onValueChange={handleVenueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar venue" />
              </SelectTrigger>
              <SelectContent>
                {venues.map((venue) => (
                  <SelectItem key={venue.id} value={venue.id}>
                    {venue.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={eventData.address}
              onChange={handleInputChange}
              placeholder="Dirección completa"
              readOnly={!!eventData.venueId}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loadingPoint">Punto de carga/descarga</Label>
            <Input
              id="loadingPoint"
              name="loadingPoint"
              value={eventData.loadingPoint}
              onChange={handleInputChange}
              placeholder="MUJICA – Buenos Aires Guarda"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="producerName">Nombre del productor</Label>
            <Input
              id="producerName"
              name="name"
              value={eventData.producerContact.name}
              onChange={handleContactChange}
              placeholder="Nombre completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="producerEmail">Email del productor</Label>
            <Input
              id="producerEmail"
              name="email"
              type="email"
              value={eventData.producerContact.email}
              onChange={handleContactChange}
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="producerPhone">Teléfono del productor</Label>
            <Input
              id="producerPhone"
              name="phone"
              value={eventData.producerContact.phone}
              onChange={handleContactChange}
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id="hasLocalPermit"
              checked={eventData.hasLocalPermit}
              onCheckedChange={(checked) => handleCheckboxChange("hasLocalPermit", checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="hasLocalPermit">Habilitación del local</Label>
              {eventData.hasLocalPermit && (
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" /> Subir archivo
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="hasAlcoholPermit"
              checked={eventData.hasAlcoholPermit}
              onCheckedChange={(checked) => handleCheckboxChange("hasAlcoholPermit", checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="hasAlcoholPermit">Habilitación de venta de alcohol</Label>
              {eventData.hasAlcoholPermit && (
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" /> Subir archivo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Card className="rounded-xl">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Horarios clave</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="truckArrivalTime">Llegada camión</Label>
              <Input
                id="truckArrivalTime"
                name="truckArrivalTime"
                type="time"
                value={eventData.truckArrivalTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setupStartTime">Inicio montaje</Label>
              <Input
                id="setupStartTime"
                name="setupStartTime"
                type="time"
                value={eventData.setupStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalTestsTime">Pruebas técnicas</Label>
              <Input
                id="technicalTestsTime"
                name="technicalTestsTime"
                type="time"
                value={eventData.technicalTestsTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openingTime">Apertura</Label>
              <Input
                id="openingTime"
                name="openingTime"
                type="time"
                value={eventData.openingTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Cierre</Label>
              <Input
                id="closingTime"
                name="closingTime"
                type="time"
                value={eventData.closingTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teardownTime">Desarme</Label>
              <Input
                id="teardownTime"
                name="teardownTime"
                type="time"
                value={eventData.teardownTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

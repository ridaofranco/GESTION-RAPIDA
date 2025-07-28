"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import { useEventStore } from "@/store/event-store"
import { formatDate } from "@/utils/generators"
import { VenueCard } from "@/components/venue-card"
import { ProviderCard } from "@/components/provider-card"
import { useState } from "react"

export default function Dashboard() {
  const { events, venues, providers } = useEventStore()
  const [activeProviderTab, setActiveProviderTab] = useState("ARTE")

  // Filtrar proveedores por categoría
  const filteredProviders = providers.filter((p) => p.category === activeProviderTab)

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold">DER / FIEBRE DISCO</h1>
            <p className="mt-2 text-xl text-slate-600">Gestión de Eventos</p>
          </div>

          <div className="w-full max-w-md">
            <Link href="/new-event">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" /> Iniciar Fecha Nueva
              </Button>
            </Link>
          </div>

          {events.length > 0 && (
            <div className="mt-12 w-full">
              <h2 className="mb-6 text-2xl font-bold">Eventos Recientes</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-lg">
                    <CardHeader className="bg-blue-600 pb-2 text-white">
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        {formatDate(new Date(event.date))}
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        {venues.find((v) => v.id === event.venueId)?.nombre || event.venue}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Productor:</span> {event.producerContact?.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Apertura:</span> {event.openingTime}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Proveedores:</span> {event.providers?.length || 0}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link href={`/event/${event.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 w-full">
            <h2 className="mb-6 text-2xl font-bold">Venues Disponibles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>

          <div className="mt-12 w-full">
            <h2 className="mb-6 text-2xl font-bold flex items-center">
              <Users className="mr-2 h-5 w-5" /> Proveedores Frecuentes
            </h2>

            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {["ARTE", "BOOKING", "MARKETING", "EXTRAS"].map((category) => (
                  <Button
                    key={category}
                    variant={activeProviderTab === category ? "default" : "outline"}
                    onClick={() => setActiveProviderTab(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}

              {filteredProviders.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-500">No hay proveedores en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

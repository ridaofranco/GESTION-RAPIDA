"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useEventStore } from "@/store/event-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Preview } from "@/components/preview"
import { ExportButtons } from "@/components/export-buttons"
import { ProviderCard } from "@/components/provider-card"
import { ArrowLeft, Calendar, MapPin, Clock, User } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/utils/generators"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { events, venues } = useEventStore()
  const [event, setEvent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === params.id)
    if (foundEvent) {
      setEvent(foundEvent)
    } else {
      router.push("/")
    }
  }, [events, params.id, router])

  if (!event) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Cargando evento...</p>
      </div>
    )
  }

  const venueName = event.venue || (event.venueId ? venues.find((v) => v.id === event.venueId)?.nombre : "")

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al dashboard
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{venueName}</h1>
          <p className="text-lg text-slate-600">{formatDate(new Date(event.date))}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">Editar evento</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="providers">Proveedores</TabsTrigger>
          <TabsTrigger value="export">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información general</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Fecha</p>
                    <p className="text-slate-600">{formatDate(new Date(event.date))}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-slate-600">{venueName}</p>
                    <p className="text-sm text-slate-500">{event.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Punto de carga/descarga</p>
                    <p className="text-slate-600">{event.loadingPoint}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Productor</p>
                    <p className="text-slate-600">{event.producerContact?.name}</p>
                    <p className="text-sm text-slate-500">{event.producerContact?.email}</p>
                    <p className="text-sm text-slate-500">{event.producerContact?.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horarios clave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Llegada camión</p>
                    <p className="text-slate-600">{event.truckArrivalTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Inicio montaje</p>
                    <p className="text-slate-600">{event.setupStartTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Pruebas técnicas</p>
                    <p className="text-slate-600">{event.technicalTestsTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Apertura</p>
                    <p className="text-slate-600">{event.openingTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Cierre</p>
                    <p className="text-slate-600">{event.closingTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Desarme</p>
                    <p className="text-slate-600">{event.teardownTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Preview eventData={event} />
          </div>
        </TabsContent>

        <TabsContent value="providers" className="mt-6">
          <h2 className="mb-6 text-2xl font-bold">Proveedores</h2>

          <Tabs defaultValue="ARTE">
            <TabsList className="mb-6">
              <TabsTrigger value="ARTE">ARTE</TabsTrigger>
              <TabsTrigger value="BOOKING">BOOKING</TabsTrigger>
              <TabsTrigger value="MARKETING">MARKETING</TabsTrigger>
              <TabsTrigger value="EXTRAS">EXTRAS</TabsTrigger>
            </TabsList>

            {["ARTE", "BOOKING", "MARKETING", "EXTRAS"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {event.providers
                    .filter((p: any) => p.category === category)
                    .map((provider: any) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}

                  {event.providers.filter((p: any) => p.category === category).length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-slate-500">No hay proveedores en esta categoría</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <ExportButtons eventData={event} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

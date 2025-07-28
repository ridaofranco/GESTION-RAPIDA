"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"
import { useEventStore } from "@/store/event-store"
import { formatDate } from "@/utils/generators"

interface VenueCardProps {
  venue: {
    id: string
    nombre: string
    direccion: string
  }
}

export function VenueCard({ venue }: VenueCardProps) {
  const { events } = useEventStore()

  // Filtrar eventos para este venue
  const venueEvents = events.filter((e) => e.venueId === venue.id || e.venue === venue.nombre)

  // Ordenar por fecha, más reciente primero
  venueEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Tomar solo los 3 más recientes
  const recentEvents = venueEvents.slice(0, 3)

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-lg">
      <CardHeader className="bg-slate-100 pb-2">
        <CardTitle>{venue.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
          <CardDescription className="text-sm text-slate-600">{venue.direccion}</CardDescription>
        </div>

        {recentEvents.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <h4 className="text-sm font-medium mb-2">Eventos recientes:</h4>
            <ul className="space-y-2">
              {recentEvents.map((event) => (
                <li key={event.id} className="flex items-center text-xs text-slate-600">
                  <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                  {formatDate(new Date(event.date))}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

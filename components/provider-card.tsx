"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Star, AlertTriangle } from "lucide-react"

interface ProviderCardProps {
  provider: {
    id: string
    name: string
    item: string
    contact: string
    category: string
    rating?: number
    blocked?: boolean
    blockReason?: string
  }
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const isEmail = provider.contact.includes("@")

  return (
    <Card
      className={`overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-lg ${provider.blocked ? "border-red-300" : ""}`}
    >
      <CardHeader className={`pb-2 ${provider.blocked ? "bg-red-50" : "bg-slate-100"}`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{provider.name}</CardTitle>
            <CardDescription>{provider.item}</CardDescription>
          </div>
          {provider.blocked && (
            <div className="bg-red-100 p-1 rounded-full">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isEmail ? <Mail className="h-4 w-4 text-slate-500" /> : <Phone className="h-4 w-4 text-slate-500" />}
            <span className="text-sm">{provider.contact}</span>
          </div>

          {provider.rating && (
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < provider.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}

          {provider.blocked && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
              <strong>Bloqueado:</strong> {provider.blockReason}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

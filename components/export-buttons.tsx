"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, FileText, FileSpreadsheet, Download } from "lucide-react"
import {
  generateDocx,
  generateXlsx,
  generateCronograma,
  generateAllMensajes,
  exportCostosToExcel,
} from "@/utils/generators"
import { useEventStore } from "@/store/event-store"

interface ExportButtonsProps {
  eventData: any
}

export function ExportButtons({ eventData }: ExportButtonsProps) {
  const { venues, costos, costosConfirmados } = useEventStore()
  const [userName, setUserName] = useState("")

  const venueName = eventData.venue || (eventData.venueId ? venues.find((v) => v.id === eventData.venueId)?.nombre : "")

  const handleExportDocx = () => {
    generateDocx(eventData, venueName)
  }

  const handleExportXlsx = () => {
    generateXlsx(eventData)
  }

  const handleExportCostos = () => {
    exportCostosToExcel(costos)
  }

  const handleCopyMessages = () => {
    const messages = generateAllMensajes(eventData, venueName, userName)
    navigator.clipboard.writeText(messages)
    // Aquí podrías agregar una notificación de éxito
  }

  const handleCopyCronograma = () => {
    const cronograma = generateCronograma(eventData, venueName)
    navigator.clipboard.writeText(cronograma)
    // Aquí podrías agregar una notificación de éxito
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Exportar documentos</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tu nombre (para los mensajes)</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Tu nombre (para firmar mensajes)"
          className="w-full max-w-xs p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Documentos Word/PDF</CardTitle>
            <CardDescription>Exporta el cronograma, checklist y manuales en formato Word</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportDocx} className="w-full bg-blue-600 hover:bg-blue-700">
              <FileText className="mr-2 h-4 w-4" /> Descargar Word/PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Planilla Excel</CardTitle>
            <CardDescription>Exporta la tabla de proveedores y presupuesto en formato Excel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportXlsx} className="w-full bg-blue-600 hover:bg-blue-700">
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Descargar Excel
            </Button>
          </CardContent>
        </Card>

        {costosConfirmados && (
          <Card className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle>Exportar Costos</CardTitle>
              <CardDescription>Exporta la tabla de costos en formato Excel</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportCostos} className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" /> Descargar Costos
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Copiar mensajes</CardTitle>
            <CardDescription>Copia todos los mensajes al portapapeles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCopyMessages} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" /> Copiar mensajes
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Copiar cronograma</CardTitle>
            <CardDescription>Copia el cronograma operativo al portapapeles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCopyCronograma} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" /> Copiar cronograma
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

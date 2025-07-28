"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { generateCronograma, generateMensajes, quickMsg, exportCostosToExcel } from "@/utils/generators"
import { CHECKLIST, MANUALES } from "@/utils/templates"
import { useEventStore } from "@/store/event-store"
import { CostosUpload } from "@/components/costos-upload"
import { CostosPreview } from "@/components/costos-preview"

interface PreviewProps {
  eventData: any
}

export function Preview({ eventData }: PreviewProps) {
  const [activeTab, setActiveTab] = useState("cronograma")
  const { venues, costos, costosConfirmados } = useEventStore()
  const [quickMsgProvider, setQuickMsgProvider] = useState("")
  const [quickMsgType, setQuickMsgType] = useState("consulta")
  const [userName, setUserName] = useState("")

  const venueName = eventData.venue || (eventData.venueId ? venues.find((v) => v.id === eventData.venueId)?.nombre : "")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aquí podrías agregar una notificación de éxito
  }

  const handleQuickMsg = () => {
    if (quickMsgProvider) {
      const message = quickMsg(quickMsgType, quickMsgProvider, eventData, venueName, userName)
      copyToClipboard(message)
    }
  }

  const handleExportCostos = () => {
    exportCostosToExcel(costos)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vista previa y costos</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
          <TabsTrigger value="manuales">Manuales</TabsTrigger>
          <TabsTrigger value="costos">Costos</TabsTrigger>
        </TabsList>

        <TabsContent value="cronograma">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cronograma Operativo</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateCronograma(eventData, venueName))}
              >
                <Copy className="mr-2 h-4 w-4" /> Copiar
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
                {generateCronograma(eventData, venueName)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle>Checklist Maestro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Área</th>
                      <th className="border p-2 text-left">Tareas clave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(CHECKLIST).map(([area, tareas]) => (
                      <tr key={area}>
                        <td className="border p-2 font-medium">{area}</td>
                        <td className="border p-2">{tareas.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensajes">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Mensaje rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tu nombre</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Tu nombre (para firmar mensajes)"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Proveedor</label>
                    <input
                      type="text"
                      value={quickMsgProvider}
                      onChange={(e) => setQuickMsgProvider(e.target.value)}
                      placeholder="Nombre del proveedor (ej: Malena, Angie, etc.)"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de mensaje</label>
                    <select
                      value={quickMsgType}
                      onChange={(e) => setQuickMsgType(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="consulta">Consulta de disponibilidad</option>
                      <option value="presupuesto">Solicitud de presupuesto</option>
                      <option value="confirmacion">Confirmación</option>
                      <option value="logistica">Logística</option>
                      <option value="recordatorio">Recordatorio</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleQuickMsg} disabled={!quickMsgProvider}>
                  <Copy className="mr-2 h-4 w-4" /> Copiar mensaje
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventData.providers && eventData.providers.length > 0 ? (
              eventData.providers.map((provider: any) => (
                <Card key={provider.id} className="rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {provider.item} - {provider.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["consulta", "presupuesto", "confirmacion", "logistica", "recordatorio"].map((type) => {
                      const mensaje = generateMensajes(type, eventData, provider, venueName, userName)
                      return (
                        <div key={type}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium capitalize">{type}</h4>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mensaje)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <pre className="whitespace-pre-wrap text-xs bg-muted p-2 rounded-md">{mensaje}</pre>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center">
                  <p>No hay proveedores agregados. Agrega proveedores en el paso anterior.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="manuales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(MANUALES).map(([rol, descripcion]) => (
              <Card key={rol}>
                <CardHeader>
                  <CardTitle className="capitalize">{rol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costos">
          {!costosConfirmados ? (
            <>{costos.length === 0 ? <CostosUpload /> : <CostosPreview />}</>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Costos Confirmados</CardTitle>
                <Button variant="outline" size="sm" onClick={handleExportCostos}>
                  <Download className="mr-2 h-4 w-4" /> Exportar Excel
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Proveedor</th>
                        <th className="border p-2 text-left">Ítem</th>
                        <th className="border p-2 text-left">Costo</th>
                        <th className="border p-2 text-left">Forma de pago</th>
                        <th className="border p-2 text-left">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costos.map((costo) => (
                        <tr key={costo.id}>
                          <td className="border p-2">{costo.proveedor}</td>
                          <td className="border p-2">{costo.item}</td>
                          <td className="border p-2">${costo.costo}</td>
                          <td className="border p-2">{costo.formaPago}</td>
                          <td className="border p-2">{costo.observaciones}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 font-bold">
                        <td className="border p-2" colSpan={2}>
                          TOTAL
                        </td>
                        <td className="border p-2">
                          $
                          {costos
                            .reduce((sum, c) => sum + (Number.parseFloat(c.costo) || 0), 0)
                            .toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="border p-2" colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

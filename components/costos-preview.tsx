"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, Save, AlertCircle } from "lucide-react"
import { useEventStore } from "@/store/event-store"

export function CostosPreview() {
  const { costos, editarCosto, confirmarCostos, importarCostos } = useEventStore()
  const [userName, setUserName] = useState("")

  // Verificar si hay costos sin completar
  const costosFaltantes = costos.filter((c) => !c.costo || c.costo === "")

  // Calcular el total
  const total = costos.reduce((sum, c) => sum + (Number.parseFloat(c.costo) || 0), 0)

  const handleAddCosto = () => {
    const newCosto = {
      id: `manual-${Date.now()}`,
      proveedor: "",
      item: "",
      costo: "",
      formaPago: "Transferencia",
      observaciones: "",
    }
    importarCostos([...costos, newCosto])
  }

  const handleDeleteCosto = (id: string) => {
    importarCostos(costos.filter((c) => c.id !== id))
  }

  const handleConfirmar = () => {
    confirmarCostos()
  }

  return (
    <Card className="rounded-xl shadow">
      <CardHeader>
        <CardTitle>Revisión de Costos</CardTitle>
        <CardDescription>Revisa y edita los costos antes de confirmar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tu nombre (para los mensajes)</label>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="max-w-xs"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Ítem</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Forma de pago</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead className="w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costos.length > 0 ? (
                costos.map((costo) => (
                  <TableRow key={costo.id} className={!costo.costo ? "bg-red-50" : ""}>
                    <TableCell>
                      <Input
                        type="text"
                        value={costo.proveedor}
                        onChange={(e) => editarCosto(costo.id, undefined, undefined, undefined, e.target.value)}
                        placeholder="Proveedor"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={costo.item}
                        onChange={(e) =>
                          editarCosto(costo.id, undefined, undefined, undefined, undefined, e.target.value)
                        }
                        placeholder="Ítem o servicio"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={costo.costo}
                        onChange={(e) => editarCosto(costo.id, e.target.value)}
                        placeholder="$"
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={costo.formaPago}
                        onValueChange={(value) => editarCosto(costo.id, undefined, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Forma de pago" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Transferencia">Transferencia</SelectItem>
                          <SelectItem value="Efectivo">Efectivo</SelectItem>
                          <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={costo.observaciones}
                        onChange={(e) => editarCosto(costo.id, undefined, undefined, e.target.value)}
                        placeholder="Observaciones"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCosto(costo.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No hay costos agregados. Agrega costos manualmente o sube un archivo.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={handleAddCosto} variant="outline" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar costo
          </Button>

          <div className="text-xl font-bold">
            Total: ${total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {costosFaltantes.length > 0 && (
          <div className="flex items-center p-3 bg-amber-50 text-amber-700 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Faltan completar {costosFaltantes.length} costos. Completa todos los costos antes de confirmar.
            </p>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleConfirmar}
            disabled={costosFaltantes.length > 0 || costos.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" /> Confirmar costos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

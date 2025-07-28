"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, AlertCircle } from "lucide-react"
import { useEventStore } from "@/store/event-store"
import * as XLSX from "xlsx"

export function CostosUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { importarCostos } = useEventStore()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const costos = await parseCostosFile(file)
      importarCostos(costos)
    } catch (err) {
      setError("Error al procesar el archivo. Asegúrate de que tenga el formato correcto.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualEntry = () => {
    // Crear una estructura básica para la entrada manual
    const costos = [
      {
        id: "manual-1",
        proveedor: "",
        item: "",
        costo: "",
        formaPago: "Transferencia",
        observaciones: "",
      },
    ]
    importarCostos(costos)
  }

  return (
    <Card className="rounded-xl shadow">
      <CardHeader>
        <CardTitle>Gestión de Costos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
          <Upload className="h-10 w-10 text-slate-400 mb-2" />
          <p className="text-sm text-slate-600 mb-4">Sube un archivo Excel o CSV con los costos del evento</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" disabled={isLoading} className="mb-2">
            {isLoading ? "Procesando..." : "Seleccionar archivo"}
          </Button>
          <p className="text-xs text-slate-500">Formato: proveedor, ítem, costo, forma de pago, observaciones</p>
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Button onClick={handleManualEntry} variant="outline">
            O ingresa los costos manualmente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Función para parsear el archivo de costos
async function parseCostosFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          reject(new Error("No se pudo leer el archivo"))
          return
        }

        let costos: any[] = []

        if (file.name.endsWith(".csv")) {
          // Procesar CSV
          const text = data as string
          const rows = text.split("\n")
          const headers = rows[0].split(",")

          costos = rows.slice(1).map((row, index) => {
            const values = row.split(",")
            return {
              id: `csv-${index}`,
              proveedor: values[0] || "",
              item: values[1] || "",
              costo: values[2] || "",
              formaPago: values[3] || "Transferencia",
              observaciones: values[4] || "",
            }
          })
        } else {
          // Procesar Excel con SheetJS
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(worksheet)

          costos = json.map((row: any, index) => ({
            id: `excel-${index}`,
            proveedor: row.proveedor || row.Proveedor || "",
            item: row.item || row.Item || row.servicio || row.Servicio || "",
            costo: row.costo || row.Costo || row.importe || row.Importe || "",
            formaPago: row.formaPago || row["Forma de Pago"] || "Transferencia",
            observaciones: row.observaciones || row.Observaciones || "",
          }))
        }

        resolve(costos)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"))
    }

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file)
    } else {
      reader.readAsBinaryString(file)
    }
  })
}

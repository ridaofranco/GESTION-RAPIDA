import { CRONOGRAMA_MUJICA, MESSAGE_TEMPLATES } from "@/utils/templates"

// Función para formatear fechas en formato DD/MM/YYYY
export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

// Función para generar el cronograma operativo
export function generateCronograma(eventData: any, venueName: string): string {
  const eventDate = new Date(eventData.date)
  const formattedDate = formatDate(eventDate)

  // Reemplazar [VENUE] con el nombre del venue
  let cronograma = CRONOGRAMA_MUJICA.replace(/\[VENUE\]/g, venueName)

  // Reemplazar horarios específicos si se han modificado
  if (eventData.truckArrivalTime !== "07:45") {
    cronograma = cronograma.replace(
      "07:45  Camión llega a MUJICA",
      `${eventData.truckArrivalTime}  Camión llega a MUJICA`,
    )
  }

  if (eventData.setupStartTime !== "10:30") {
    cronograma = cronograma.replace("10:30-19:00 Montaje general", `${eventData.setupStartTime}-19:00 Montaje general`)
  }

  if (eventData.technicalTestsTime !== "22:00") {
    cronograma = cronograma.replace(
      "22:00  Llegan Productor, Socio, Sonidista, VJ, Iluminador",
      `${eventData.technicalTestsTime}  Llegan Productor, Socio, Sonidista, VJ, Iluminador`,
    )
  }

  if (eventData.openingTime !== "00:30") {
    cronograma = cronograma.replace("00:30  Apertura puertas", `${eventData.openingTime}  Apertura puertas`)
  }

  if (eventData.closingTime !== "04:00") {
    cronograma = cronograma.replace("04:00  Cierre puertas", `${eventData.closingTime}  Cierre puertas`)
  }

  if (eventData.teardownTime !== "07:00") {
    cronograma = cronograma.replace("07:00  Inicio desarme", `${eventData.teardownTime}  Inicio desarme`)
  }

  // Agregar la fecha al cronograma
  const lines = cronograma.split("\n")
  if (lines[0] === "SÁBADO") {
    lines[0] = `SÁBADO ${formattedDate}`

    // Calcular el domingo (día siguiente)
    const nextDay = new Date(eventDate)
    nextDay.setDate(nextDay.getDate() + 1)
    const formattedNextDay = formatDate(nextDay)

    // Encontrar la línea de DOMINGO y reemplazarla
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "DOMINGO") {
        lines[i] = `DOMINGO ${formattedNextDay}`
        break
      }
    }

    cronograma = lines.join("\n")
  }

  return cronograma
}

// Función para generar todos los mensajes
export function generateAllMensajes(eventData: any, venueName: string, userName = ""): string {
  let allMessages = ""

  if (eventData.providers && eventData.providers.length > 0) {
    eventData.providers.forEach((provider: any) => {
      allMessages += `\n--- ${provider.name} - ${provider.item} ---\n\n`
      allMessages += generateMensajes("consulta", eventData, provider, venueName, userName) + "\n\n"
      allMessages += generateMensajes("presupuesto", eventData, provider, venueName, userName) + "\n\n"
      allMessages += generateMensajes("confirmacion", eventData, provider, venueName, userName) + "\n\n"
      allMessages += generateMensajes("logistica", eventData, provider, venueName, userName) + "\n\n"
      allMessages += generateMensajes("recordatorio", eventData, provider, venueName, userName) + "\n\n"
    })
  }

  return allMessages
}

// Función para generar un mensaje específico
export function generateMensajes(
  type: string,
  eventData: any,
  provider: any,
  venueName: string,
  userName = "",
): string {
  const eventDate = new Date(eventData.date)
  const formattedDate = formatDate(eventDate)

  // Obtener la plantilla del tipo de mensaje
  let template = MESSAGE_TEMPLATES[type as keyof typeof MESSAGE_TEMPLATES] || ""

  // Reemplazar los placeholders con los datos reales
  template = template.replace(/\[Nombre\]/g, provider.name)
  template = template.replace(/\[función\/rol\]/g, provider.item)
  template = template.replace(/\[FUNCION\/EVENTO\]/g, provider.item)
  template = template.replace(/\[FECHA\]/g, formattedDate)
  template = template.replace(/\[VENUE\]/g, venueName)
  template = template.replace(/\[Tu nombre\]/g, userName || "Productor")

  // Reemplazar [IMPORTE] solo si existe en la plantilla y tenemos el dato
  if (template.includes("[IMPORTE]") && provider.price) {
    template = template.replace(/\[IMPORTE\]/g, provider.price)
  }

  // Reemplazar [forma de pago] con el método de pago
  if (template.includes("[forma de pago]") && provider.paymentMethod) {
    template = template.replace(/\[forma de pago\]/g, provider.paymentMethod)
  }

  // Reemplazar horarios específicos si se mencionan
  if (template.includes("[hora]")) {
    if (type === "logistica") {
      template = template.replace(
        "- Carga en MUJICA: [hora]",
        `- Carga en MUJICA: ${eventData.truckArrivalTime || "07:45"}`,
      )
      template = template.replace(
        "- Montaje en venue: [hora]",
        `- Montaje en venue: ${eventData.setupStartTime || "10:30"}`,
      )
      template = template.replace("- Desarme: [hora]", `- Desarme: ${eventData.teardownTime || "07:00"}`)
    } else if (type === "recordatorio") {
      template = template.replace(
        "[lugar y hora]",
        `MUJICA a las ${eventData.truckArrivalTime || "07:45"} o en ${venueName} a las ${
          eventData.setupStartTime || "10:30"
        }`,
      )
    }
  }

  return template
}

// Función para generar documento Word
export function generateDocx(eventData: any, venueName: string): void {
  // Esta función simula la generación de un documento Word
  // En una implementación real, usaríamos docx.js para generar el documento

  const cronograma = generateCronograma(eventData, venueName)
  const blob = new Blob([cronograma], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `Cronograma_${venueName}_${eventData.date}.docx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para generar documento Excel
export function generateXlsx(eventData: any): void {
  // Esta función simula la generación de un documento Excel
  // En una implementación real, usaríamos xlsx para generar el documento

  let csvContent =
    "Ítem,Nombre,Contacto,Precio,Medio de pago,Estado,Nómina staff,Datos seguro,Fecha límite,Observaciones\n"

  if (eventData.providers && eventData.providers.length > 0) {
    eventData.providers.forEach((provider: any) => {
      csvContent += `${provider.item},${provider.name},${provider.contact},${provider.price},${provider.paymentMethod},${provider.status},${provider.staff},${provider.insurance},${provider.deadline},${provider.observations}\n`
    })
  }

  const blob = new Blob([csvContent], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `Proveedores_${eventData.venue}_${eventData.date}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para generar mensajes rápidos para proveedores específicos
export function quickMsg(type: string, providerName: string, eventData: any, venueName: string, userName = ""): string {
  // Buscar el proveedor por nombre
  const provider = eventData.providers.find((p: any) => p.name.toLowerCase() === providerName.toLowerCase())

  if (!provider) {
    return `No se encontró el proveedor "${providerName}" en este evento.`
  }

  return generateMensajes(type, eventData, provider, venueName, userName)
}

// Función para exportar costos a Excel
export function exportCostosToExcel(costos: any[]): void {
  let csvContent = "Proveedor,Ítem,Costo,Forma de pago,Observaciones\n"

  costos.forEach((costo) => {
    csvContent += `${costo.proveedor},${costo.item},${costo.costo},${costo.formaPago},${costo.observaciones}\n`
  })

  const blob = new Blob([csvContent], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `Costos_Evento_${new Date().toISOString().split("T")[0]}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

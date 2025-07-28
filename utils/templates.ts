export const DEFAULT_VENUES = [
  { id: "amerika", nombre: "AMERIKA", direccion: "Gascón 1040, CABA" },
  { id: "auditorio_sur", nombre: "AUDITORIO SUR", direccion: "Av. Meeks 1080, Temperley, Buenos Aires" },
  { id: "normandia", nombre: "COMPLEJO NORMANDIA", direccion: "Av. Patricio Peralta Ramos 5050, Mar del Plata" },
  { id: "jaguar_haus", nombre: "JAGUAR HAUS", direccion: "Martín Rodríguez 198, Rosario, Santa Fe" },
  { id: "auditorio_oeste", nombre: "AUDITORIO OESTE", direccion: "Av. Rivadavia 17230, Haedo, Buenos Aires" },
  { id: "cordoba_635", nombre: "VENUE CÓRDOBA 635", direccion: "Av. Marcelo T. de Alvear 635, Córdoba" },
  { id: "garibaldi", nombre: "GARIBALDI", direccion: "Garibaldi 228, Quilmes, Buenos Aires" },
  { id: "cordoba_651", nombre: "VENUE CÓRDOBA 651", direccion: "Av. Marcelo T. de Alvear 651, Córdoba" },
  { id: "san_isidro", nombre: "SAN ISIDRO VENUE", direccion: "Av. Márquez 700, San Isidro" },
]

// Proveedores frecuentes con contacto
export const DEFAULT_PROVIDERS = [
  { id: "malena", nombre: "Malena", rol: "Dirección de artistas", contacto: "+54 9 11 5810-8481" },
  { id: "angie", nombre: "Angie", rol: "Escenografía", contacto: "+54 9 11 3841-5792" },
  { id: "charlie", nombre: "Charlie", rol: "Riggers", contacto: "+54 9 11 5115-1499" },
  { id: "juano", nombre: "Juano", rol: "VJ", contacto: "+54 9 11 3635-6772" },
  { id: "juanchi", nombre: "Juanchi", rol: "FX", contacto: "+54 9 11 3451-2713" },
  { id: "marko", nombre: "Marko", rol: "Iluminación", contacto: "+54 9 11 6746-8955" },
  { id: "rocio", nombre: "Rocío", rol: "Glitter", contacto: "+54 9 11 5896-6596" },
  { id: "yesica", nombre: "Yesica", rol: "Pochoclos", contacto: "+54 9 11 5599-4903" },
  { id: "martin", nombre: "Martin Schaller", rol: "DJ", contacto: "+54 9 11 6041-3635" },
  { id: "leo", nombre: "Leo", rol: "CDJ", contacto: "+54 9 11 6933-2331" },
  { id: "cami", nombre: "Cami", rol: "Asistentes", contacto: "+54 9 11 3648-0203" },
  { id: "rodrigo", nombre: "Rodrigo", rol: "Sonidista", contacto: "+54 9 11 3308-6701" },
  { id: "marlene", nombre: "Marlene", rol: "Boletero", contacto: "+54 9 11 6801-2626" },
  { id: "christian", nombre: "Christian", rol: "Ambulancia", contacto: "+54 9 11 3797-6963" },
  { id: "verna", nombre: "Verna", rol: "Creadora de contenido", contacto: "+54 9 11 2777-8504" },
  { id: "delfi", nombre: "Delfi", rol: "Creadora de contenido", contacto: "+54 9 11 3850-5686" },
  { id: "seba", nombre: "Seba", rol: "Filmmaker", contacto: "+54 9 11 3146-9878" },
  { id: "nuria", nombre: "Nuria", rol: "Fotografía", contacto: "+54 9 11 3511-4798" },
  { id: "sofia", nombre: "Sofía", rol: "Merch", contacto: "+54 9 261 592-2661" },
  { id: "german", nombre: "Germán", rol: "PR", contacto: "+54 9 348 963-7709" },
]

// Plantillas profesionales de mensajes
export const MESSAGE_TEMPLATES = {
  consulta: `Asunto: Consulta de disponibilidad para próxima fecha\n\nHola [Nombre],\n\nEspero que estés bien.\nTe escribo para consultarte si estás disponible para cubrir el servicio de [función/rol] en el evento que realizaremos en [VENUE] el [FECHA].\n\nPor favor, confirmame tu disponibilidad antes del miércoles previo, así podemos avanzar con la organización.\n\n¡Gracias por tu tiempo!\n\nSaludos,\n[Tu nombre]\nDER / Fiebre Disco`,
  presupuesto: `Asunto: Solicitud de presupuesto – [FUNCION/EVENTO]\n\nHola [Nombre],\n\n¿Cómo estás?\nNecesitamos que nos envíes tu presupuesto para el servicio de [función/rol] para la próxima fecha en [VENUE] el [FECHA].\n\nSi requerís información adicional o tenés alguna consulta, estoy a disposición.\n\nMuchas gracias,\n[Tu nombre]\nDER / Fiebre Disco`,
  confirmacion: `Asunto: Confirmación de contratación – [FUNCION/EVENTO]\n\nHola [Nombre],\n\nTe confirmamos que contaremos con tu servicio de [función/rol] para el evento en [VENUE] el [FECHA].\n\nEl monto acordado es $[IMPORTE], a abonar por [forma de pago].\nTe agradeceríamos que nos envíes antes del miércoles la nómina de tu staff (nombre, DNI, función) para gestionar el seguro.\n\nQuedamos atentos a cualquier duda o requerimiento.\n\nSaludos,\n[Tu nombre]\nDER / Fiebre Disco`,
  logistica: `Asunto: Detalles logísticos para el evento [FECHA]\n\nHola [Nombre],\n\nTe detallo la logística para el evento en [VENUE] el [FECHA]:\n- Carga en MUJICA: [hora]\n- Montaje en venue: [hora]\n- Desarme: [hora]\n\nPor favor, llegá puntual y avisame si necesitás credenciales extra o tenés alguna dificultad.\n\nSaludos,\n[Tu nombre]\nDER / Fiebre Disco`,
  recordatorio: `Asunto: Recordatorio – [FUNCION/EVENTO] en [FECHA]\n\nHola [Nombre],\nTe recordamos que mañana tenemos el evento en [VENUE] y estás convocado/a para cubrir el rol de [función/rol].\n\nTe esperamos en [lugar y hora].\n¡Gracias por tu compromiso!\n\nSaludos,\n[Tu nombre]\nDER / Fiebre Disco`,
}

export const CRONOGRAMA_MUJICA = `SÁBADO
07:45  Camión llega a MUJICA
08:00  Inicio carga MUJICA
10:00  Fin carga MUJICA
10:20  Riggers + montaje llegan a [VENUE]
10:30-19:00 Montaje general
22:00  Llegan Productor, Socio, Sonidista, VJ, Iluminador
22:30  Llegan Bailarines
23:00  Llegan Asistentes
23:30  Prueba sonido + llega audiovisual + DJ + Validadores
00:00  Ensayo bailarines • Charla seguridad • Posicionamiento validadores
00:30  Apertura puertas
04:00  Cierre puertas
06:00  Fin evento

DOMINGO
07:00  Inicio desarme
09:00  Camión llega a [VENUE]
10:00  Salida a MUJICA
11:00  Llegada y descarga en MUJICA`

export const CHECKLIST = {
  Producción: ["Confirmar cronograma", "Permisos de carga", "Listas de staff/acreditaciones", "Envío de mensajes"],
  Booking: ["Confirmar DJ y backline", "Guest list"],
  "Arte/Técnica": ["Confirmar FX (CO2)", "VJ", "Escenografía", "Riggers", "Riders técnicos"],
  Marketing: ["Confirmar fotógraf@", "Creador@ contenido", "Grupo difusión", "Cartelería"],
  Logística: ["Organizar camión ida/vuelta", "Transporte personal", "Horarios de montaje/desarme"],
  Seguridad: ["Cobertura seguridad privada", "Policía", "Paramédicos", "Ambulancia"],
  "Post-evento": ["Desarme", "Reporte de incidencias", "Cierre económico"],
}

export const MANUALES = {
  socios: "Supervisión global. Resolución de temas con autoridades y toma de decisiones estratégicas.",
  productor: "Coordina áreas, valida cronograma y resuelve contingencias.",
  asistente: "Recibe proveedores, gestiona puerta/validadores, actualiza checklist en vivo.",
  asistentes: "Control de puerta, acompañamiento a artistas, monitoreo de áreas (baños, VIP).",
  validadores: "Escaneo QR, entrega de pulseras, reporte de irregularidades, orden de flujo.",
}

export const ITEMS_ARTE = [
  "Dirección de artistas",
  "Actores + Serpiente",
  "Escenario extra",
  "Escenografía",
  "Viático Escenografía",
  "Peón de Escenografía",
  "Horas extra personal-Montaje",
  "Riggers",
  "Pista",
  "Peones Pista",
  "Flete",
  "Peones Carga y Descarga",
  "Ignifugado",
  "Depósito",
  "Personal eléctrico armado",
  "VJ",
  "Pantallas",
  "Fx",
  "Presentación",
  "Iluminador",
  "Asistente de Iluminación",
  "Luces Extras",
  "Máquina de Humo",
  "Aduana",
  "Glitter",
  "Peinados",
  "Tattoo",
  "Maquillaje",
  "Pochoclos",
  "Productos de limpieza",
  "Bola Disco",
  "Tintorería",
  "Rider iluminación",
  "Pasacables",
  "Escaleras",
  "Vestuario",
  "Visuales",
  "Máscara de Serpiente",
]

export const ITEMS_BOOKING = [
  "DJ",
  "Cabina DJ",
  "Armado de Lista",
  "CDJ",
  "CDJ Falsa",
  "Asistentes",
  "Sonidista",
  "Consola Sonido",
  "Agregados sonido",
  "Boletero",
  "Validadores QR",
  "Seguro de accidentes personales",
  "Seguridad",
  "Policías",
  "Paramédicos",
  "Ambulancia",
  "Precintos/Pulseras",
  "Hospedaje",
  "Movilidad",
  "Viáticos",
  "Espacio Públicos",
  "SADAIC",
  "ADICAPIF",
  "Grupo electrógeno",
  "Gasoil Generador",
  "Consumo en venue",
  "Camareras extra",
  "Rider sonido",
  "Conexiones eléctricas",
  "Mesa con consumo",
  "Mesas sin consumo",
  "Guardarropa",
  "Enfermería",
  "Ingreso VIP",
  "Upgrade Entrada",
  "Precio Entrada Efectivo/MP",
  "Vallado",
]

export const ITEMS_MARKETING = [
  "Creadora de contenido",
  "Filmmaker",
  "Fotografía",
  "Merch",
  "PR",
  "Consumo Influencers",
  "Impresiones y Señalética",
  "Creación Grupo MKT–Acceso",
  "LED puesto Merch",
  "Anabella Manual-especificaciones",
]

export const ITEMS_EXTRAS = [
  "Capacidad y Habilitación",
  "Hora inicio/fin fiesta",
  "Horarios de armado/desarme",
  "Carga/descarga escenografía",
  "Carga/descarga pista",
  "Armado/desarmado pista",
  "Apertura de puertas",
  "Cierre de puertas",
  "Horarios técnicos",
]

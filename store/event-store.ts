import { create } from "zustand"
import { persist } from "zustand/middleware"
import { DEFAULT_VENUES, DEFAULT_PROVIDERS } from "@/utils/templates"

interface EventState {
  events: any[]
  venues: any[]
  providers: any[]
  costos: any[]
  costosConfirmados: boolean
  addEvent: (event: any) => void
  updateEvent: (id: string, event: any) => void
  deleteEvent: (id: string) => void
  addVenue: (venue: any) => void
  updateVenue: (id: string, venue: any) => void
  deleteVenue: (id: string) => void
  addProvider: (provider: any) => void
  updateProvider: (id: string, provider: any) => void
  deleteProvider: (id: string) => void
  rateProvider: (id: string, rating: number) => void
  blockProvider: (id: string, reason: string) => void
  importarCostos: (costos: any[]) => void
  editarCosto: (id: string, costo?: string, formaPago?: string, observaciones?: string) => void
  confirmarCostos: () => void
  resetCostos: () => void
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      venues: DEFAULT_VENUES,
      providers: DEFAULT_PROVIDERS.map((provider) => ({
        id: provider.id,
        name: provider.nombre,
        item: provider.rol,
        contact: provider.contacto,
        category: getCategoryForItem(provider.rol),
        price: "",
        paymentMethod: "Transferencia",
        status: "Disponibilidad",
        staff: "",
        insurance: "",
        deadline: "",
        observations: "",
      })),
      costos: [],
      costosConfirmados: false,

      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, event) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
        })),
      deleteEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),

      addVenue: (venue) => set((state) => ({ venues: [...state.venues, venue] })),
      updateVenue: (id, venue) =>
        set((state) => ({
          venues: state.venues.map((v) => (v.id === id ? { ...v, ...venue } : v)),
        })),
      deleteVenue: (id) => set((state) => ({ venues: state.venues.filter((v) => v.id !== id) })),

      addProvider: (provider) => set((state) => ({ providers: [...state.providers, provider] })),
      updateProvider: (id, provider) =>
        set((state) => ({
          providers: state.providers.map((p) => (p.id === id ? { ...p, ...provider } : p)),
        })),
      deleteProvider: (id) => set((state) => ({ providers: state.providers.filter((p) => p.id !== id) })),

      rateProvider: (id, rating) =>
        set((state) => ({
          providers: state.providers.map((p) => (p.id === id ? { ...p, rating } : p)),
        })),
      blockProvider: (id, reason) =>
        set((state) => ({
          providers: state.providers.map((p) => (p.id === id ? { ...p, blocked: true, blockReason: reason } : p)),
        })),

      importarCostos: (costos) => set({ costos, costosConfirmados: false }),
      editarCosto: (id, costo, formaPago, observaciones) =>
        set((state) => ({
          costos: state.costos.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...(costo !== undefined && { costo }),
                  ...(formaPago !== undefined && { formaPago }),
                  ...(observaciones !== undefined && { observaciones }),
                }
              : c,
          ),
        })),
      confirmarCostos: () => set({ costosConfirmados: true }),
      resetCostos: () => set({ costos: [], costosConfirmados: false }),
    }),
    {
      name: "event-storage",
    },
  ),
)

// Función auxiliar para determinar la categoría de un ítem
function getCategoryForItem(item: string): string {
  if (ITEMS_ARTE.includes(item)) return "ARTE"
  if (ITEMS_BOOKING.includes(item)) return "BOOKING"
  if (ITEMS_MARKETING.includes(item)) return "MARKETING"
  return "EXTRAS"
}

// Importamos las listas de ítems para la función auxiliar
import { ITEMS_ARTE, ITEMS_BOOKING, ITEMS_MARKETING } from "@/utils/templates"

export interface Event {
  id: string
  date: string
  venueId?: string
  venue: string
  address: string
  loadingPoint: string
  producerContact: {
    name: string
    email: string
    phone: string
  }
  hasLocalPermit: boolean
  localPermitFile: any | null
  hasAlcoholPermit: boolean
  alcoholPermitFile: any | null
  truckArrivalTime: string
  setupStartTime: string
  technicalTestsTime: string
  openingTime: string
  closingTime: string
  teardownTime: string
  providers: Provider[]
}

export interface Provider {
  id: string
  name: string
  item: string
  contact: string
  price: string
  paymentMethod: string
  status: string
  staff: string
  insurance: string
  deadline: string
  observations: string
  category: string
  rating?: number
  blocked?: boolean
  blockReason?: string
}

export interface Venue {
  id: string
  nombre: string
  direccion: string
}

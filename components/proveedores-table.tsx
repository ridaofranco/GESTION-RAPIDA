"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, Star, UserPlus } from "lucide-react"
import { ITEMS_ARTE, ITEMS_BOOKING, ITEMS_MARKETING, ITEMS_EXTRAS } from "@/utils/templates"
import { useEventStore } from "@/store/event-store"

interface Provider {
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

interface ProveedoresTableProps {
  providers: Provider[]
  updateProviders: (providers: Provider[]) => void
}

export function ProveedoresTable({ providers = [], updateProviders }: ProveedoresTableProps) {
  const { providers: globalProviders, rateProvider, blockProvider } = useEventStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isProviderSelectorOpen, setIsProviderSelectorOpen] = useState(false)
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null)
  const [activeTab, setActiveTab] = useState("ARTE")
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [currentRating, setCurrentRating] = useState(0)
  const [blockReason, setBlockReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddProvider = () => {
    setCurrentProvider({
      id: Date.now().toString(),
      name: "",
      item: "",
      contact: "",
      price: "",
      paymentMethod: "Transferencia",
      status: "Disponibilidad",
      staff: "",
      insurance: "",
      deadline: "",
      observations: "",
      category: activeTab,
    })
    setIsDialogOpen(true)
  }

  const handleAddExistingProvider = () => {
    setIsProviderSelectorOpen(true)
  }

  const handleSelectExistingProvider = (provider: any) => {
    // Convertir el proveedor global al formato de proveedor de evento
    const newProvider = {
      id: provider.id,
      name: provider.name,
      item: provider.item,
      contact: provider.contact,
      price: "",
      paymentMethod: "Transferencia",
      status: "Disponibilidad",
      staff: "",
      insurance: "",
      deadline: "",
      observations: "",
      category: provider.category,
      rating: provider.rating,
      blocked: provider.blocked,
      blockReason: provider.blockReason,
    }

    // Verificar si ya existe en el evento
    if (!providers.some((p) => p.id === provider.id)) {
      updateProviders([...providers, newProvider])
    }

    setIsProviderSelectorOpen(false)
  }

  const handleEditProvider = (provider: Provider) => {
    setCurrentProvider(provider)
    setIsDialogOpen(true)
  }

  const handleDeleteProvider = (id: string) => {
    const updatedProviders = providers.filter((provider) => provider.id !== id)
    updateProviders(updatedProviders)
  }

  const handleSaveProvider = (provider: Provider) => {
    if (providers.some((p) => p.id === provider.id)) {
      // Update existing provider
      const updatedProviders = providers.map((p) => (p.id === provider.id ? provider : p))
      updateProviders(updatedProviders)
    } else {
      // Add new provider
      updateProviders([...providers, provider])
    }
    setIsDialogOpen(false)
  }

  const handleRateProvider = (provider: Provider) => {
    setCurrentProvider(provider)
    setCurrentRating(provider.rating || 0)
    setRatingDialogOpen(true)
  }

  const handleBlockProvider = (provider: Provider) => {
    setCurrentProvider(provider)
    setBlockReason("")
    setBlockDialogOpen(true)
  }

  const saveRating = () => {
    if (currentProvider) {
      // Update local state
      const updatedProviders = providers.map((p) => (p.id === currentProvider.id ? { ...p, rating: currentRating } : p))
      updateProviders(updatedProviders)

      // Update global state if provider exists there
      if (globalProviders.some((p) => p.id === currentProvider.id)) {
        rateProvider(currentProvider.id, currentRating)
      }

      setRatingDialogOpen(false)
    }
  }

  const saveBlock = () => {
    if (currentProvider) {
      // Update local state
      const updatedProviders = providers.map((p) =>
        p.id === currentProvider.id ? { ...p, blocked: true, blockReason } : p,
      )
      updateProviders(updatedProviders)

      // Update global state if provider exists there
      if (globalProviders.some((p) => p.id === currentProvider.id)) {
        blockProvider(currentProvider.id, blockReason)
      }

      setBlockDialogOpen(false)
    }
  }

  const getCategoryItems = (category: string) => {
    switch (category) {
      case "ARTE":
        return ITEMS_ARTE
      case "BOOKING":
        return ITEMS_BOOKING
      case "MARKETING":
        return ITEMS_MARKETING
      case "EXTRAS":
        return ITEMS_EXTRAS
      default:
        return []
    }
  }

  const filteredProviders = providers.filter((provider) => provider.category === activeTab)

  // Filtrar proveedores globales para el selector
  const filteredGlobalProviders = globalProviders.filter((provider) => {
    // Filtrar por categoría activa
    if (provider.category !== activeTab) return false

    // Filtrar por término de búsqueda
    if (
      searchTerm &&
      !provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !provider.item.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Excluir los que ya están en el evento
    return !providers.some((p) => p.id === provider.id)
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de proveedores</h2>
        <div className="flex space-x-2">
          <Button onClick={handleAddExistingProvider} variant="outline">
            <UserPlus className="mr-2 h-4 w-4" /> Agregar existente
          </Button>
          <Button onClick={handleAddProvider} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo proveedor
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="ARTE">ARTE</TabsTrigger>
          <TabsTrigger value="BOOKING">BOOKING</TabsTrigger>
          <TabsTrigger value="MARKETING">MARKETING</TabsTrigger>
          <TabsTrigger value="EXTRAS">EXTRAS</TabsTrigger>
        </TabsList>

        {["ARTE", "BOOKING", "MARKETING", "EXTRAS"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ítem</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map((provider) => (
                      <TableRow key={provider.id} className={provider.blocked ? "bg-red-50" : ""}>
                        <TableCell>{provider.item}</TableCell>
                        <TableCell>
                          {provider.name}
                          {provider.rating && (
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < provider.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{provider.contact}</TableCell>
                        <TableCell>${provider.price}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              provider.blocked
                                ? "bg-red-100 text-red-800"
                                : provider.status === "Confirmado"
                                  ? "bg-green-100 text-green-800"
                                  : provider.status === "En curso"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {provider.blocked ? "Bloqueado" : provider.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditProvider(provider)}
                              disabled={provider.blocked}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProvider(provider.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRateProvider(provider)}>
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No hay proveedores agregados en esta categoría
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Provider Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentProvider?.id ? "Editar proveedor" : "Agregar proveedor"}</DialogTitle>
          </DialogHeader>

          {currentProvider && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={currentProvider.category}
                    onValueChange={(value) => setCurrentProvider({ ...currentProvider, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARTE">ARTE</SelectItem>
                      <SelectItem value="BOOKING">BOOKING</SelectItem>
                      <SelectItem value="MARKETING">MARKETING</SelectItem>
                      <SelectItem value="EXTRAS">EXTRAS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item">Ítem</Label>
                  <Select
                    value={currentProvider.item}
                    onValueChange={(value) => setCurrentProvider({ ...currentProvider, item: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ítem" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoryItems(currentProvider.category).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={currentProvider.name}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, name: e.target.value })}
                    placeholder="Nombre del proveedor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contacto</Label>
                  <Input
                    id="contact"
                    value={currentProvider.contact}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, contact: e.target.value })}
                    placeholder="Email o teléfono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    value={currentProvider.price}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, price: e.target.value })}
                    placeholder="Monto en pesos"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Medio de pago</Label>
                  <Select
                    value={currentProvider.paymentMethod}
                    onValueChange={(value) => setCurrentProvider({ ...currentProvider, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar medio de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={currentProvider.status}
                    onValueChange={(value) => setCurrentProvider({ ...currentProvider, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponibilidad">Disponibilidad</SelectItem>
                      <SelectItem value="Confirmado">Confirmado</SelectItem>
                      <SelectItem value="En curso">En curso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staff">Nómina staff</Label>
                  <Input
                    id="staff"
                    value={currentProvider.staff}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, staff: e.target.value })}
                    placeholder="Nombres, DNI, roles"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance">Datos seguro</Label>
                  <Input
                    id="insurance"
                    value={currentProvider.insurance}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, insurance: e.target.value })}
                    placeholder="Información para seguro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Fecha límite</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={currentProvider.deadline}
                    onChange={(e) => setCurrentProvider({ ...currentProvider, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="observations">Observaciones</Label>
                <Input
                  id="observations"
                  value={currentProvider.observations}
                  onChange={(e) => setCurrentProvider({ ...currentProvider, observations: e.target.value })}
                  placeholder="Notas adicionales"
                />
              </div>

              <DialogFooter className="col-span-1 md:col-span-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => handleSaveProvider(currentProvider)} className="bg-blue-600 hover:bg-blue-700">
                  Guardar
                </Button>
                {currentProvider.id && !currentProvider.blocked && (
                  <Button variant="destructive" onClick={() => handleBlockProvider(currentProvider)}>
                    Bloquear Proveedor
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Provider Selector Dialog */}
      <Dialog open={isProviderSelectorOpen} onOpenChange={setIsProviderSelectorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Seleccionar proveedor existente</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar proveedor</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o ítem..."
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ítem</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGlobalProviders.length > 0 ? (
                    filteredGlobalProviders.map((provider) => (
                      <TableRow key={provider.id} className={provider.blocked ? "bg-red-50" : ""}>
                        <TableCell>{provider.item}</TableCell>
                        <TableCell>
                          {provider.name}
                          {provider.rating && (
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < provider.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{provider.contact}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleSelectExistingProvider(provider)}
                            disabled={provider.blocked}
                            size="sm"
                          >
                            Seleccionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No hay proveedores disponibles en esta categoría
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProviderSelectorOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Calificar Proveedor</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p>
              Califica a {currentProvider?.name} por su servicio de {currentProvider?.item}
            </p>

            <div className="flex justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} type="button" onClick={() => setCurrentRating(i + 1)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${i < currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRatingDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveRating} className="bg-blue-600 hover:bg-blue-700">
              Guardar Calificación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bloquear Proveedor</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p>¿Por qué deseas bloquear a {currentProvider?.name}?</p>

            <div className="space-y-2">
              <Label htmlFor="blockReason">Motivo</Label>
              <Input
                id="blockReason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Ingresa el motivo del bloqueo"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={saveBlock}>
              Bloquear Proveedor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

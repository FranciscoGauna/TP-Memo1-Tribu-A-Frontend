export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface Project {
  id: number
  name: string
  description: string
  state: string
  startDate: number
  endDate: number
  estimatedHours: number
  projectLeader: string 
  client: string
}
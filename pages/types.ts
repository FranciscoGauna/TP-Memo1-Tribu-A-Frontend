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
  start_date: string
  end_date: string
  estimated_hours: number
  project_leader: string 
  tasks: object
  uid: string
}
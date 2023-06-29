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
  stage: string
  start_date: string
  end_date: string
  estimated_hours: number
  project_leader: string 
  tasks: object
  uid: string
}

export interface Task {
	puid: string
	name: string
	description: string
	human_resource: string
	state: string
	estimated_hours: number
	start_date: string
	end_date: string
}

export interface Resource {
  legajo: string
  nombre: string
  apellido: string
}
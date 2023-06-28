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
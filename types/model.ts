export interface Usuario {
	nombre: string
	apellido: string
	legajo: number
}
  
export interface Cliente {
	id: number
	razonSocial: string
	cuit: number
}

export interface Producto {
	codigo: number;
	titulo: string;
}
  
export interface Version {
	codigo: number;
	descripcion: string;
	codigoProducto: number;
}
  
export interface Ticket {
	codigo: string;
	titulo: string;
	severidad: "S1" | "S2" | "S3" | "S4";
	prioridad: "ALTA" | "MEDIA" | "BAJA";
	estado: "PENDIENTE" | "EMPEZADO" | "RESUELTO";
	description: string;
	fechaLimite: string;
	fechaCreacion: string;
	cliente: number;
	versionProducto: number;
	tareas: { proyecto: string; id: string }[];
}

export interface Recurso {
	legajo: number
	nombre: string
	apellido: string
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
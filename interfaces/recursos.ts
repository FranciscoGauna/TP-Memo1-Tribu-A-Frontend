export interface CargaHoraria{
    id?:string
    legajo:number 
    proyectoId:string
    tareaId: string
    fecha: string
    horas: number
    descripcion?: string
  }
  export interface OpcionSelector{
    label:string
    value:string 
    color:string
  }

  export interface Recurso {
    nombre: string
    apellido: string
    legajo: number
  }
  
  export interface Tarea{
    end_date_est:string
    hours_est:string
    id:string
    name:string
    start_date: string
    state:string
  }

  export interface Proyecto{
    client:string
    development_team:string[]
    name:string
    project_leader: string
    start_date:string
    tasks: Tarea[]
    uid:string

  }

  export interface RecursosState {
    cargasHorarias: CargaHoraria[]
    cargaHorariaActual: CargaHoraria  
    recursos : Recurso[]
    proyectos : Proyecto[]
    tareas?:Tarea[]
  }
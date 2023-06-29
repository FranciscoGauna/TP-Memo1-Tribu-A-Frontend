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
    description:string
    end_date_est:string
    estimated_hours:number
    human_resource:string
    puid:string
    name:string
    start_date: string
    state:string
  }

  export interface Proyecto{
    client?:string
    description:string
    end_date: string
    estimated_hours:number
    name:string
    project_leader: string
    stage: string
    start_date:string
    tasks: object
    uid:string

  }

  export interface ParametrosDeFiltrado {
    recursoid:string
    proyectoid:string
  }

  export interface RecursosState {
    cargasHorarias: CargaHoraria[]
    cargaHorariaActual: CargaHoraria  
    recursos : Recurso[]
    proyectos : Proyecto[]
    tareas?:Tarea[]
  }
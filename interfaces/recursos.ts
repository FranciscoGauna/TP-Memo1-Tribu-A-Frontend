export interface CargaHoraria{
    id?:string
    legajo:number | string
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
    legajo: string
  }

  export interface RecursosState {
    cargasHorarias: CargaHoraria[]
    cargaHorariaActual: CargaHoraria  
    recursos : Recurso[]
    proyectos? : []
    tareas?:[]
  }
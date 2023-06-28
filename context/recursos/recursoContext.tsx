import {createContext} from "react"
import { CargaHoraria, ParametrosDeFiltrado, RecursosState } from "@/interfaces/recursos"

export type RecursosContextProps = {
    recursosState: RecursosState
    getRecursos: () => {}
    getCargasHorarias: () => void
    getCargaHorariaPorId: (id:string ) => void
    createCargaHoraria: (cargaHoraria:CargaHoraria) =>{}
    editCargaHoraria: (cargaHoraria: CargaHoraria) =>{}
    deleteCargaHoraria: (id:string) =>{}
    getCargasHorariasSegun: (parametros : ParametrosDeFiltrado) =>{}
    getProyectosConTareas: ()=>{}
}

export const RecursosContext = createContext<RecursosContextProps>({} as RecursosContextProps)
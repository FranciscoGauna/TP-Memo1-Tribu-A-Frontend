import {createContext} from "react"
import { CargaHoraria, RecursosState } from "@/interfaces/recursos"

export type RecursosContextProps = {
    recursosState: RecursosState
    getRecursos: () => {}
    getCargasHorarias: () => void
    getCargaHorariaPorId: (id:string ) => void
    createCargaHoraria: (cargaHoraria:CargaHoraria) =>{}
    editCargaHoraria: (cargaHoraria: CargaHoraria) =>{}
    deleteCargaHoraria: (id:string) =>{}
}

export const RecursosContext = createContext<RecursosContextProps>({} as RecursosContextProps)
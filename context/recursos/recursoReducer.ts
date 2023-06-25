import { CargaHoraria, Proyecto, Recurso, RecursosState } from "@/interfaces/recursos";

type RecursosAction =
    |{type:'getRecursos',payload: Recurso[]}
    |{type:'getCargasHorarias',payload: CargaHoraria[]}
    |{type:'getCargaHorariaPorId',payload: {id:string }}
    |{type:'createCargaHoraria',payload:CargaHoraria}
    |{type:'editCargaHoraria',payload:CargaHoraria}
    |{type:'deleteCargaHoraria',payload:{id:string}}
    |{type:'getProyectosConTareas',payload:Proyecto[]}


export const RecursosReducer = (state: RecursosState,action: RecursosAction) =>{
    switch(action.type){
        case 'getRecursos':
          return {
            ...state,
            recursos: action.payload,
          };


        case 'getCargasHorarias':
              return {
                ...state,
                cargasHorarias: action.payload,
        };
        case 'getCargaHorariaPorId':

            const cargaFind  =state.cargasHorarias.find(({...a}) => ( a.id === action.payload.id))
            const  carga:CargaHoraria = (cargaFind) ? cargaFind:{} as CargaHoraria   
                    
            return {
                ...state,
                cargaHorariaActual: carga
            };

        case 'createCargaHoraria':
            return{
                ...state,
                cargasHorarias: [...state.cargasHorarias,action.payload]
            }
        case'editCargaHoraria':
            return{
                ...state,
                cargasHorarias: state.cargasHorarias.map((a) => {
                    if(a.id === state.cargaHorariaActual.id){
                        return action.payload;
                    }else{
                        return a;
                    } 
                    
                })
            }
        case 'deleteCargaHoraria':
            return{
                ...state,
                cargasHorarias: state.cargasHorarias.filter((a) => {
                    if(a.id !== action.payload.id){
                        return a;
                    } 
                })
            }
        case 'getProyectosConTareas':
            return{
                ...state,
                proyectos: action.payload
            }
        default:
            return state;
    }
}
import {useReducer} from 'react'
import {RecursosContext} from './recursoContext'
import { CargaHoraria, ParametrosDeFiltrado, RecursosState } from '@/interfaces/recursos'
import { RecursosReducer } from './recursoReducer'

const initial_state :RecursosState = {
    cargasHorarias: [ {
        'id':'1234',
        'legajo':1,
        'proyectoId': "Recursos",
        'tareaId': "Creacion",
        'fecha': "13-07-2023",
        'horas': 3
    }],
    cargaHorariaActual: {} as CargaHoraria,
    recursos: [
        {'legajo':1,'nombre':'alan','apellido':'goyzu'},
        {'legajo':2,'nombre':'Cristian','apellido':'Saravia'},
        {'legajo':3,'nombre':'los','apellido':'caminos'},
    ],
    proyectos:[
    //   {
    //   "client":"PSA",
    //   "description":"proyectos",
    //   "end_date":"2023-05-03",
    //   "estimated_hours":200,
    //   "name":"Modulo Proyecto - PSA",
    //   "stage":"ongoing",
    //   "project_leader": "Aguanti",
    //   "start_date":"2023-02-02",
    //   "tasks": [
    //     {
    //       "description":"algo",
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "puid":"1",
    //       "human_resource":"un recursos",
    //       "name":"Creacion de proyecto",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"2",
    //       "human_resource":"un recursos",
    //       "name":"Edicion de proyecto",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"3",
    //       "human_resource":"un recursos",
    //       "name":"Creacion de tareas",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     }
    //   ],
    //   uid:"asdfeiasd"
    // },
    // {
    //   "client":"PSA",
    //   "description":"Soporte",
    //   "end_date":"2023-05-03",
    //   "estimated_hours":200,
    //   "name":"Modulo Soporte - PSA",
    //   "stage":"ongoing",
    //   "project_leader": "Aguanti",
    //   "start_date":"2023-02-02",
    //   "tasks": [
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"4",
    //       "human_resource":"un recursos",
    //       "name":"Creacion de ticket",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"5",
    //       "human_resource":"un recursos",
    //       "name":"Edicion de ticket",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"5",
    //       "human_resource":"un recursos",
    //       "name":"Filtrado de tickets",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     }
    //   ],
    //   uid:"asdesdidfd"
    // },
    // {
    //   "client":"PSA",
      
    //   "name":"Modulo Recursos - PSA",
    //   "description":"Recursos",
    //   "end_date":"2023-05-03",
    //   "estimated_hours":200,
    //   "project_leader": "Aguanti",
    //   "stage":"ongoing",
    //   "start_date":"2023-02-02",
    //   "tasks": [
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"7",
    //       "human_resource":"un recursos",
    //       "name":"Creacion de carga horaria",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"8",
    //       "human_resource":"un recursos",
    //       "name":"Edicion de carga horaria",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     },
    //     {
    //       "end_date_est":"2023-09-02",
    //       "estimated_hours":70,
    //       "description":"algo",
    //       "puid":"9",
    //       "human_resource":"un recursos",
    //       "name":"Filtrado de carga de horas",
    //       "start_date": "2023-01-02",
    //       "state":"ongoing"
    //     }
    //   ],
    //   uid:"asadfewq12"
    // }
  ],
    
}

interface props{
    children:JSX.Element | JSX.Element[]
}


export const RecursosProvider  = ({children}:props) =>{

    const [recursosState, dispatch] = useReducer(RecursosReducer, initial_state)


    const getRecursos = async () => {
        await fetch("https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/users") 
        .then((res) => {
            console.log("res", res)
            return res.json()
          })
          .then((data) => {
            console.log("data", data)
            dispatch({type:"getRecursos",payload:data})
          })
    };

    const getCargasHorarias =  async() =>{
        await fetch("https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria") 
        .then((res) => {
            console.log("res", res)
            return res.json()
          })
          .then((data) => {
            console.log("data", data)
            dispatch({type:"getCargasHorarias",payload:data})
            
          })
         
    }

    const getCargaHorariaPorId = async(id: string) =>{
        await fetch(`https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria/${id}`) 
            .then((res) => {
                console.log("res", res)
                return res.json()
            })
            .then((data) => {
                console.log("data", data)
                dispatch({type:"getCargaHorariaPorId",payload:data})
            })
    }

    const createCargaHoraria = async (cargaHoraria : CargaHoraria) =>{
        await fetch("https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria",{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(cargaHoraria)
          })
          .then(res => res.json())
          .then(data => {
          // enter you logic when the fetch is successful
            console.log(data)
            const cargaHorariaConId:CargaHoraria = {...cargaHoraria , id: data.id}
            dispatch({type:'createCargaHoraria',payload:cargaHorariaConId})
          })
          .catch(error => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error)
          })  
    }
    const editCargaHoraria = async(cargaHoraria : CargaHoraria) =>{
        await fetch("https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria",{
            method:'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(cargaHoraria)
          })
          .then(res => res.json())
          .then(data => {
          // enter you logic when the fetch is successful
            console.log(data)
            dispatch({type:'editCargaHoraria',payload:cargaHoraria})
          })
          .catch(error => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error)
          })    
    }
    const deleteCargaHoraria = async(id : string) =>{
        await fetch(`https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria/${id}`,{
            method:'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            
          })
          .then(res => res.json())
          .then(data => {
          // enter you logic when the fetch is successful
            console.log(data)
            dispatch({type:'deleteCargaHoraria',payload:{id}})
          })
          .catch(error => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error)
          })     
    }

    const getCargasHorariasSegun= async( parametros:ParametrosDeFiltrado) =>{
        const {recursoid,proyectoid} = parametros
        const rutaRecurso = (!!recursoid) ?`?legajo=${recursoid}`: ""
        const rutaProyecto = ()=>{
          if(!!recursoid && !!proyectoid){
            return `&proyecto=${proyectoid}`
          }else if(!recursoid && !!proyectoid){
            return `?proyecto=${proyectoid}`
          }else{
            return ""
          }
        }
        const rutaPrincipal = `https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/carga-horaria`
        const rutaFinal=rutaPrincipal + rutaRecurso + rutaProyecto()
        
        await fetch(rutaFinal) 
        .then((res) => {
            console.log("res", res)
            return res.json()
          })
          .then((data) => {
            console.log("data", data)
            dispatch({type:"getCargasHorarias",payload:data})
            
          })
    }

    const getProyectosConTareas = async() =>{
      await fetch("https://projects-backend-service.onrender.com/projects") 
        .then((res) => {
            console.log("res", res)
            return res.json()
          })
          .then((data) => {
            console.log("data en projects", data.projects)
            dispatch({type:"getProyectosConTareas",payload:data.projects})
          })
    }

    return (
        <RecursosContext.Provider value={{
            recursosState,
            getRecursos,
            getCargasHorarias,
            getCargaHorariaPorId,
            createCargaHoraria,
            editCargaHoraria,
            deleteCargaHoraria,
            getCargasHorariasSegun,
            getProyectosConTareas
        }}>
            {children}
        </RecursosContext.Provider>
    )
}
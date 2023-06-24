import {useReducer} from 'react'
import {RecursosContext} from './recursoContext'
import { CargaHoraria, RecursosState } from '@/interfaces/recursos'
import { RecursosReducer } from './recursoReducer'

const initial_state :RecursosState = {
    cargasHorarias: [ {
        'id':'1234',
        'legajo':'1',
        'proyectoId': "Recursos",
        'tareaId': "Creacion",
        'fecha': "13-07-2023",
        'horas': 3
    }],
    cargaHorariaActual: {} as CargaHoraria,
    recursos: [
        {'legajo':'1','nombre':'alan','apellido':'goyzu'},
        {'legajo':'2','nombre':'Cristian','apellido':'Saravia'},
        {'legajo':'3','nombre':'los','apellido':'caminos'},
    ]
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

    return (
        <RecursosContext.Provider value={{
            recursosState,
            getRecursos,
            getCargasHorarias,
            getCargaHorariaPorId,
            createCargaHoraria,
            editCargaHoraria,
            deleteCargaHoraria
        }}>
            {children}
        </RecursosContext.Provider>
    )
}
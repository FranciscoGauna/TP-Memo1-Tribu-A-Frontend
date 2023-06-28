
import { RecursosContext } from "@/context/recursos/recursoContext";
import { CargaHoraria, Proyecto, Recurso, Tarea } from "@/interfaces/recursos";
import { set } from "date-fns";
import {useContext, useEffect, useState} from "react";

export default function CargaHorariaGridRow( 
  {cargaHoraria,recurso,setopenModalDelete,setopenModalEdit,setCargaHorariaActualId}:
  { cargaHoraria:CargaHoraria,recurso:Recurso,setopenModalDelete:Function ,setopenModalEdit:Function,setCargaHorariaActualId:Function} ) {

  const {recursosState} = useContext(RecursosContext)
  const {proyectos,cargasHorarias} = recursosState

  const [nombreProyecto,setNombreProyecto]=useState("")
  const [nombreTarea,setNombreTarea]=useState("")
  
  useEffect(()=>{
    
    if(!!proyectos){
      
       const obtenerProyecto:Proyecto= proyectos.filter((p) =>{
        if(p.uid === cargaHoraria.proyectoId){
          return p
        }
      })[0]
      if(!!obtenerProyecto){
        
      
        setNombreProyecto(obtenerProyecto.name)

        const obtenerTarea:[string,Tarea] = Object.entries(obtenerProyecto.tasks).filter(([key,value]:[string,Tarea]) =>{
            if(key === cargaHoraria.tareaId){
              return [key,value]
            }
        })[0]

        // const obtenerTarea = obtenerProyecto.tasks.filter((t)=>{
        //   if(t.puid === cargaHoraria.tareaId){
        //     return t
        //   }
        // })[0]
        if(!!obtenerTarea){
          setNombreTarea(obtenerTarea[1].name)
        }else{
          setNombreTarea("Tarea no encontrada")
        }
        
      }else{
        setNombreProyecto("Proyecto no encontrado")
        setNombreTarea("Tarea no encontrada")
      }
    }
  },[proyectos,cargasHorarias])

  return (
    <>
    <tr key={`${cargaHoraria.legajo}`} className='bg-gray-300'>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
        <div className="flex items-center">{cargaHoraria.legajo}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{recurso.nombre || "cargando"}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{recurso.apellido || "cargando"}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="w-full h-10 px-1 py-1 text-sm text-center flex items-center leading-5 
        text-white bg-blue-500 rounded-xl contenido">{ nombreProyecto}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="w-full h-10 px-1 py-1 text-sm text-center flex items-center justify-center leading-5 
        text-white bg-blue-500 rounded-xl contenido">{ nombreTarea}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm text-center leading-5 text-gray-900">{cargaHoraria.fecha}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm text-center leading-5 text-gray-900">{cargaHoraria.horas} hs</div>
      </td> 
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <button onClick={() =>{setopenModalEdit(true); setCargaHorariaActualId(cargaHoraria.id) ;}} className="w-16 h-9 text-sm text-center flex items-center justify-center leading-5 text-white bg-blue-500 hover:bg-blue-400 rounded-2xl">editar</button>
      </td> 
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <button onClick={() =>{setopenModalDelete(true); setCargaHorariaActualId(cargaHoraria.id)}}  className="w-16 h-9 text-sm text-center flex items-center justify-center leading-5 text-white bg-red-500 hover:bg-red-400 rounded-2xl">borrar</button>
      </td> 
    </tr>
    </>
  )
}
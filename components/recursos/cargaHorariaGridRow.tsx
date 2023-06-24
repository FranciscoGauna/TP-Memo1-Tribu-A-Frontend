
import { RecursosContext } from "@/context/recursos/recursoContext";
import { CargaHoraria, Recurso } from "@/interfaces/recursos";
import {useContext, useEffect, useState} from "react";

export default function CargaHorariaGridRow( 
  {cargaHoraria,recurso,setopenModalDelete,setopenModalEdit,setCargaHorariaActualId}:
  { cargaHoraria:CargaHoraria,recurso:Recurso,setopenModalDelete:Function ,setopenModalEdit:Function,setCargaHorariaActualId:Function} ) {

  const {getCargaHorariaPorId} = useContext(RecursosContext)

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
        <div className="w-full h-10 text-sm text-center aling-middle leading-5 
        text-white bg-blue-500 rounded-xl contenido">{cargaHoraria.proyectoId}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="w-full h-10 text-sm text-center flex items-center justify-center leading-5 
        text-white bg-blue-500 rounded-xl contenido">{cargaHoraria.tareaId}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm text-center leading-5 text-gray-900">13/06/2023</div>
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
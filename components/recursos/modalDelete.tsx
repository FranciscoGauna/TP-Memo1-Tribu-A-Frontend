import { RecursosContext } from '@/context/recursos/recursoContext'
import { Proyecto } from '@/interfaces/recursos'
import {useEffect,useContext,useState} from 'react'

export default function ModalDelete ({setopenModalDelete, idCargaHoraria }:{setopenModalDelete:Function,idCargaHoraria:string}){
    
    const {getCargaHorariaPorId,recursosState,deleteCargaHoraria} = useContext(RecursosContext)
    const {cargaHorariaActual,proyectos, recursos} = recursosState
    
    
    
    const handleDelete = ()=>{
      deleteCargaHoraria(idCargaHoraria)
      setopenModalDelete(false)
    }

    const [nombreProyecto,setNombreProyecto]=useState("")
    const [nombreTarea,setNombreTarea]=useState("")
    const [nombreCompleto,setNombreCompleto]=useState("")
    
  
  useEffect(() => {
    getCargaHorariaPorId(idCargaHoraria)
  }, [])

  useEffect(()=>{
    
    if(!!proyectos){
      
       const obtenerProyecto:Proyecto= proyectos.filter((p) =>{
        if(p.uid === cargaHorariaActual.proyectoId){
          return p
        }
      })[0]
      if(!!obtenerProyecto){
        
      
        setNombreProyecto(obtenerProyecto.name)
        const obtenerNombreDeTarea = obtenerProyecto.tasks.filter((t)=>{
          if(t.id === cargaHorariaActual.tareaId){
            return t
          }
        })[0].name
       
        setNombreTarea(obtenerNombreDeTarea)
      }
    }
  },[proyectos,cargaHorariaActual])

  useEffect(() =>{
    if(!!recursos && !!cargaHorariaActual.legajo){
      console.log(cargaHorariaActual)
      const recurso= recursos.filter(r =>{
        if( r.legajo ===cargaHorariaActual.legajo){
          return r
        }
      })[0]
      console.log(recurso)
      const nombreCompleto = `${recurso.nombre} ${recurso.apellido}`
      setNombreCompleto(nombreCompleto)
    }
  },[recursos,cargaHorariaActual])

    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                 
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div >
                       
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Eliminacion de carga horaira</h3>
                          <h4>¿Seguro que quiere eliminar esta carga horaria?</h4>
                            <ul>
                                <li>Legajo y nombre completo:{cargaHorariaActual.legajo} - {nombreCompleto}</li>
                                <li>Proyecto: {nombreProyecto}</li>
                                <li>Tarea: {nombreTarea}</li>
                                <li>Fecha de creacion: {cargaHorariaActual.fecha}</li>
                                <li>Horas Trabajadas: {cargaHorariaActual.horas}</li>
                            </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Borrar</button>
                      <button onClick={() =>{setopenModalDelete(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
import { RecursosContext } from '@/context/recursos/recursoContext'
import { Proyecto, Tarea } from '@/interfaces/recursos'
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
        const obtenerTarea:[string,Tarea] = Object.entries(obtenerProyecto.tasks).filter(([key,value]:[string,Tarea])=>{
         if(key === cargaHorariaActual.tareaId){
           return [key,value]
         }
        })[0]

        if(!!obtenerTarea){
          setNombreTarea(obtenerTarea[1].name)
        }else{
          setNombreTarea("Tarea no encontrada")
        }

        //setNombreProyecto(obtenerProyecto.name)
        //const obtenerNombreDeTarea = obtenerProyecto.tasks.filter((t)=>{
        //  if(t.puid === cargaHorariaActual.tareaId){
        //    return t
        //  }
        //})[0].name
        //
        //setNombreTarea(obtenerNombreDeTarea)
      }
      else{
        setNombreProyecto("Proyecto no encontrado")
        setNombreTarea("Tarea no encontrada")
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
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 " style={{fontWeight:'400', backgroundColor: '#1F2937'}}>
                      <div >
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left" style={{fontWeight:'400', backgroundColor: '#1F2937'}}>
                          <h4 style={{fontWeight:'bold',textAlign: 'center', color: '#FFFFFF', padding : '12px', fontSize: 'large'}}>¿Esta seguro que quiere eliminar esta carga horaria?</h4>
                            <div style={{ columnCount: 2, textAlign:'center' }}>
                              <ul>
                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Legajo</li>
                                <div style={{ color: '#FFFFFF' }}>{cargaHorariaActual.legajo}</div>

                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Nombre y apellido</li>
                                <div style={{ color: '#FFFFFF' }}>{nombreCompleto}</div>

                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Proyecto</li>
                                <div style={{ color: '#FFFFFF' }}>{nombreProyecto}</div>

                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Tarea</li>
                                <div style={{ color: '#FFFFFF' }}>{nombreTarea}</div>

                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Fecha de creación</li>
                                <div style={{ color: '#FFFFFF' }}>{cargaHorariaActual.fecha}</div>

                                <li style={{ fontWeight: 'bold', color: '#FFFFFF' }}>Horas Trabajadas</li>
                                <div style={{ color: '#FFFFFF' }}>{cargaHorariaActual.horas}</div>
                              </ul>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" style={{fontWeight:'400', backgroundColor: '#1F2937'}}>
                      <button style={{fontWeight:'400', backgroundColor: '#0F3A61'}} onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Eliminar</button>
                      <button style={{fontWeight:'400', backgroundColor: '#0F3A61'}} onClick={() =>{setopenModalDelete(false)}} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
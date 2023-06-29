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
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div >
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h4 style={{fontWeight:'bold',textAlign: 'center', color: '#000000', padding : '12px', fontSize: 'large'}}>¿Esta seguro que quiere eliminar esta carga horaria?</h4>
                            <div style={{ columnCount: 2, textAlign:'center' }}>
                              <ul>
                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Legajo</li>
                                <div style={{ color: '#000000' }}>{cargaHorariaActual.legajo}</div>

                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Nombre y apellido</li>
                                <div style={{ color: '#000000' }}>{nombreCompleto}</div>

                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Proyecto</li>
                                <div style={{ color: '#000000' }}>{nombreProyecto}</div>

                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Tarea</li>
                                <div style={{ color: '#000000' }}>{nombreTarea}</div>

                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Fecha de creación</li>
                                <div style={{ color: '#000000' }}>{cargaHorariaActual.fecha}</div>

                                <li style={{ fontWeight: 'bold', color: '#000000' }}>Horas Trabajadas</li>
                                <div style={{ color: '#000000' }}>{cargaHorariaActual.horas}</div>
                              </ul>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button style={{backgroundColor :'#d36c6c'}}onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Eliminar</button>
                      <button onClick={() =>{setopenModalDelete(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
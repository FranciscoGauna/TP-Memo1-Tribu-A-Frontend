import Select from "react-select"

import { useEffect, useState,useContext } from "react"
import { CargaHoraria, OpcionSelector, Recurso } from "@/interfaces/recursos";
import { RecursosContext } from "@/context/recursos/recursoContext";
import { OpcionModal } from "./opcionModal";

export default function ModalCreate (
  {setopenModalCreate}:{setopenModalCreate: Function}
  
  ){
    
    const {recursosState,createCargaHoraria} = useContext(RecursosContext)
    const{recursos,cargaHorariaActual} = recursosState
    const [proyecto,setProyecto] = useState([]);
    const [tarea, setTarea] = useState([]);

    const [opcionLegajo, setOpcionLegajo] = useState<string>("")
    const [opcionProyecto, setOpcionProyecto] = useState<string>("")
    const [opcionTarea, setOpcionTarea] = useState<string>("")

    const opcionesDeRecursosParaSelect:OpcionSelector[] = recursos.map((elemento:Recurso) =>{
        return { 
          value:elemento.legajo,
          label:`${elemento.nombre} ${elemento.apellido}`,
          color:'#FFFFFF'
        }
    })
    

    const handleCargar = () =>{
      const cargaHorariaAAgregar :CargaHoraria = {
        
        legajo: opcionLegajo,
        proyectoId: opcionProyecto,
        tareaId: opcionTarea,
        fecha: "2023-06-22",
        horas: 12,
        descripcion: "probando la carga horaria"
      }
      createCargaHoraria(cargaHorariaAAgregar)
      console.log(cargaHorariaAAgregar)
      setopenModalCreate(false)
    }

    const opcionesDeProyecto = [
      { value: '1', label: 'Proyectos',color:"#FFFFFF" },
      { value: '2', label: 'Soporte',color:"#FFFFFF" },
      { value: '3', label: 'Recurso',color:"#FFFFFF" }
    ]

    const opcionesDeTareas = [
      { value: '1', label: 'Creacion',color:"#FFFFFF" },
      { value: '2', label: 'Edicion',color:"#FFFFFF" },
      { value: '3', label: 'Eliminacion',color:"#FFFFFF" }
    ]

    const opcionPorDefecto = {
        value: '', label:'Seleccione una opcion', color:'#FFFFFF'
    }
    


    //funcion para enviar los datos

    // const enviarCargaHoraria = () =>{
      
    // }


    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                 
                  <div className="transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl  z-20">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div className="">
                       
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Creación de carga horaria</h3>
                          <div className="mt-2" >
                            <OpcionModal 
                              titulo="Legajo y nombre completo" 
                              opciones={opcionesDeRecursosParaSelect} 
                              opcionDefecto={opcionPorDefecto}
                              setopcionSeleccionada={setOpcionLegajo}
                              />
                            <OpcionModal 
                              titulo="Proyecto" 
                              opciones={opcionesDeProyecto} 
                              opcionDefecto={opcionPorDefecto}
                              setopcionSeleccionada={setOpcionProyecto}
                              />
                            <OpcionModal 
                              titulo="Tarea" 
                              opciones={opcionesDeTareas} 
                              opcionDefecto={opcionPorDefecto}
                              setopcionSeleccionada={setOpcionTarea}
                              />
                            {/* <OpcionCrearCarga titulo="Fecha de creación"/>
                            <OpcionCrearCarga titulo="Horas trabajadas"/> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button onClick={handleCargar}  type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Cargar</button>
                      <button onClick={ () =>{ setopenModalCreate(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                   </div>
                 </div>
               </div>
            </div>
        </>
    )
}
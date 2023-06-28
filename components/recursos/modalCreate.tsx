import Select from "react-select"

import { useEffect, useState,useContext } from "react"
import { CargaHoraria, OpcionSelector, Proyecto, Recurso, Tarea } from "@/interfaces/recursos";
import { RecursosContext } from "@/context/recursos/recursoContext";
import { OpcionModal } from "./opcionModal";
import { OpcionFecha } from "./opcionFecha";

export default function ModalCreate (
  {setopenModalCreate}:{setopenModalCreate: Function}
  
  ){
    
    const {recursosState,createCargaHoraria} = useContext(RecursosContext)
    const{recursos,proyectos} = recursosState

    const [opcionesSelectorTareas, setopcionesSelectorTareas] = useState<Array<OpcionSelector>>([])
   

    const [opcionLegajo, setOpcionLegajo] = useState<string>("0")
    const [opcionProyecto, setOpcionProyecto] = useState<string>("")
    const [opcionTarea, setOpcionTarea] = useState<string>("")
    const [opcionFecha,setOpcionFecha] = useState<string>("")
    const [opcionHoras,setOpcionHoras] = useState<string>("0")

    const opcionesDeRecursosParaSelect:OpcionSelector[] = recursos.map((elemento:Recurso) =>{
        return { 
          value:`${elemento.legajo}`,
          label:`${elemento.nombre} ${elemento.apellido}`,
          color:'#FFFFFF'
        }
    })

    const opcionesDeProyectosParaSelect:OpcionSelector[] = proyectos.map((elemento:Proyecto) =>{
      return { 
        value:`${elemento.uid}`,
        label:`${elemento.name}`,
        color:'#FFFFFF'
      }
    })

    const opcionesDeTareasParaSelect = ():OpcionSelector[] =>{
      const proyectoSeleccionado: Proyecto[] = proyectos.filter((a) =>{
        if(a.uid === opcionProyecto){
          return a
        }
      })
      console.log(proyectoSeleccionado)

      return Object.entries(proyectoSeleccionado[0].tasks).map(([key,value]:[string,Tarea]) =>{
        return {
              value: `${key}`,
              label:`${value.name}`,
              color:'#FFFFFF'
            }
      })
      // return proyectoSeleccionado[0].tasks.map((tarea) =>{
      //   return {
      //     value: `${tarea.puid}`,
      //     label:`${tarea.name}`,
      //     color:'#FFFFFF'
      //   }
      // })
    }
    
    const verificarCreacionDeCargaHoraria = (cargaHoraria:CargaHoraria) =>{
      return (cargaHoraria.descripcion !== "" &&
              cargaHoraria.horas !== 0 &&
              cargaHoraria.fecha !== "" &&
              cargaHoraria.tareaId !== "" &&
              cargaHoraria.proyectoId !== "" &&
              cargaHoraria.legajo  !== 0
      )
    }

    const handleCargar = () =>{
      const cargaHorariaAAgregar :CargaHoraria = {
        
        legajo: Number(opcionLegajo),
        proyectoId: opcionProyecto,
        tareaId: opcionTarea,
        fecha: opcionFecha,
        horas: Number(opcionHoras),
        descripcion: "probando la carga horaria con fecha y horas"
      }
      if(verificarCreacionDeCargaHoraria(cargaHorariaAAgregar)){
        console.log("campos listos")
        createCargaHoraria(cargaHorariaAAgregar)
      }else{
        console.log("algun campo falta completar, pendiente de mostrar alerta")
        
      }
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

    const opcionesDeHoras = [
      { value: '1', label: '1',color:"#FFFFFF" },
      { value: '2', label: '2',color:"#FFFFFF" },
      { value: '3', label: '3',color:"#FFFFFF" },
      { value: '4', label: '4',color:"#FFFFFF" },
      { value: '5', label: '5',color:"#FFFFFF" },
      { value: '6', label: '6',color:"#FFFFFF" },
      { value: '7', label: '7',color:"#FFFFFF" },
      { value: '8', label: '8',color:"#FFFFFF" },
    ]

    const opcionPorDefecto = {
        value: '', label:'Seleccione una opcion', color:'#FFFFFF'
    }

    useEffect(() =>{
      if(!opcionProyecto){
        console.log("aun no seleccione un proyecto")
      }else{
        console.log("seleccione el proyecto ")
        console.log(opcionProyecto)
        console.log("seteo las opciones de tareas")
        
        setopcionesSelectorTareas(opcionesDeTareasParaSelect())
        
      }
      
    },[opcionProyecto])

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
                              
                              setopcionSeleccionada={setOpcionLegajo}
                              />
                            <OpcionModal 
                              titulo="Proyecto" 
                              opciones={opcionesDeProyectosParaSelect} 
                              
                              setopcionSeleccionada={setOpcionProyecto}
                              />
                            <OpcionModal 
                              titulo="Tarea" 
                              opciones={opcionesSelectorTareas} 
                              
                              setopcionSeleccionada={setOpcionTarea}
                              opcionesProyecto={opcionProyecto}
                              />
                            <OpcionFecha 
                              setOpcionFecha={setOpcionFecha}
                            />
                            <OpcionModal
                              titulo="Horas Trabajadas" 
                              opciones={opcionesDeHoras} 
                              
                              setopcionSeleccionada={setOpcionHoras}
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
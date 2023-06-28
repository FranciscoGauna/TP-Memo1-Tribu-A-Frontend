import { RecursosContext } from "@/context/recursos/recursoContext"
import { CargaHoraria, OpcionSelector, Proyecto, Recurso, Tarea } from "@/interfaces/recursos"
import { useContext, useEffect,useState } from "react"
import { OpcionModal } from "./opcionModal"
import { OpcionFecha } from "./opcionFecha"


export default function ModalEdicion ({setopenModalEdit, idCargaHoraria,setIdCargaHoraria}:
  {setopenModalEdit: Function,idCargaHoraria:string,setIdCargaHoraria:Function }){
    
  
    const {recursosState, getCargaHorariaPorId,editCargaHoraria} = useContext(RecursosContext)
    const {cargaHorariaActual,recursos,proyectos,cargasHorarias} = recursosState
    const [opcionesLegajo, setopcionesLegajo] = useState<Array<OpcionSelector>>([{} as OpcionSelector])
    const [opcionesProyectos, setopcionesProyectos] = useState<Array<OpcionSelector>>()
    const [opcionesTareas, setopcionesTareas] = useState<Array<OpcionSelector>>()


    const [opcionLegajoDefecto, setopcionLegajoDefecto] = useState<OpcionSelector>({} as OpcionSelector)
    const [opcionProyectoDefecto, setopcionProyectoDefecto] = useState<OpcionSelector>({} as OpcionSelector)
    const [opcionTareaDefecto, setopcionTareaDefecto] = useState<OpcionSelector>({} as OpcionSelector)
    const [opcionFechaDefecto, setopcionFechaDefecto] = useState<string>("2023-01-01")
    const [opcionHorasDefecto, setopcionHorasDefecto] = useState<OpcionSelector>({} as OpcionSelector)

    const [opcionesSelectorTareas, setopcionesSelectorTareas] = useState<Array<OpcionSelector>>([])

    const [opcionLegajo, setOpcionLegajo] = useState<string>("0")
    const [opcionProyecto, setOpcionProyecto] = useState<string>("")
    const [opcionTarea, setOpcionTarea] = useState<string>("")
    const [opcionFecha,setOpcionFecha] = useState<string>("")
    const [opcionHoras,setOpcionHoras] = useState<string>("0")

    const [isLoading,setIsLoading] = useState(true)

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

//      return proyectoSeleccionado[0].tasks.map((tarea) =>{
//        return {
//          value: `${tarea.puid}`,
//          label:`${tarea.name}`,
//          color:'#FFFFFF'
//        }
//      })
    }

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
    
    
    
    const establecerLasOpcionesPorDefecto = () =>{
      
      const oLegajo = opcionesDeRecursosParaSelect.filter(o =>{
        if (Number(o.value) === cargaHorariaActual.legajo){
          return o
        }
      })[0]
      setopcionLegajoDefecto(oLegajo)
      setOpcionLegajo(oLegajo.value)

      const oProyecto = opcionesDeProyectosParaSelect.filter(o =>{
        if(o.value === cargaHorariaActual.proyectoId){
          return o
        }
      })[0] 
      if(!!oProyecto){
        setopcionProyectoDefecto(oProyecto)
        setOpcionProyecto(oProyecto.value)
      }else{
        setopcionProyectoDefecto({label:"Proyecto no encontrado",value:"",color:"#FFFFFF"})
        setOpcionProyecto("")
      }
      
      

      const oHora = opcionesDeHoras.filter(o =>{
        if(o.value === cargaHorariaActual.horas.toString()){
          return o
        }
      })[0]
      setopcionHorasDefecto(oHora)
      setOpcionHoras(oHora.value)
      

      // // caso tarea por defecto
      // // busco el proyecto
      if(!!oProyecto && oProyecto.value !=="" ){
        const proyecto = proyectos.filter(p =>{
          if(cargaHorariaActual.proyectoId === p.uid){
            return p
          }
        })[0]
        // // busco la tarea por id

        const tarea:[string,Tarea] = Object.entries(proyecto.tasks).filter(([key,value]:[string,Tarea]) =>{
          if(cargaHorariaActual.tareaId === key){
            return [key,value]
          }
        })[0]
        
      // const tarea = proyecto.tasks.filter(t =>{
      //   if(cargaHorariaActual.tareaId === t.puid){
      //     return t
      //   }
      // })[0]
        
        // // transformo a un OpcionSelector
        if(!!tarea){
          const oTarea:OpcionSelector = {label: tarea[1].name,value:tarea[0],color:"#FFFFFFF"}

          setopcionTareaDefecto(oTarea)
          setOpcionTarea(oTarea.value)
        }else{
          setopcionProyectoDefecto({label:"Tarea no encontrada",value:"",color:"#FFFFFF"})
          setOpcionTarea("")
        }
      }else{
        setopcionTareaDefecto({label:"Tarea no encontrada",value:"",color:"#FFFFFF"})
        setOpcionTarea("")
      }
      setopcionFechaDefecto(cargaHorariaActual.fecha)
      setOpcionFecha(cargaHorariaActual.fecha)
    
    }

    const establecerLasOpcionesParaCadaSelector = () =>{
      setopcionesLegajo (opcionesDeRecursosParaSelect)
      setopcionesProyectos(opcionesDeProyectosParaSelect)
      
    }

   
    useEffect(() =>{
      getCargaHorariaPorId(idCargaHoraria);
    },[])

    
    useEffect(() =>{
      
      console.log(cargaHorariaActual)
      if( !cargaHorariaActual.legajo ){
          console.log("sigo estando vacio ")
      }else if(cargaHorariaActual.id !== idCargaHoraria){
          console.log("estoy en proceso de cambio")
      }else{
        console.log("ia me complete")
        console.log(proyectos)
        establecerLasOpcionesPorDefecto()
        establecerLasOpcionesParaCadaSelector()
        setIsLoading(false)
      }
      
     
    },[cargaHorariaActual,proyectos])

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
  
    const verificarEdicionDeCargaHoraria = (cargaHoraria:CargaHoraria) =>{
      return (cargaHoraria.id !== "" &&
              cargaHoraria.descripcion !== "" &&
              cargaHoraria.horas !== 0 &&
              cargaHoraria.fecha !== "" &&
              cargaHoraria.tareaId !== "" &&
              cargaHoraria.proyectoId !== "" &&
              cargaHoraria.legajo  !== 0
      )
    }

    const handleEditar = () =>{
      const cargaHorariaAEditar :CargaHoraria = {
        id: cargaHorariaActual.id,
        legajo: Number(opcionLegajo),
        proyectoId: opcionProyecto,
        tareaId: opcionTarea,
        fecha: opcionFecha,
        horas: Number(opcionHoras),
        descripcion: "probando la carga horaria con fecha y horas"
      }
      if(verificarEdicionDeCargaHoraria(cargaHorariaAEditar)){
        console.log("campos listos")
        editCargaHoraria(cargaHorariaAEditar)
      }else{
        console.log("algun campo falta completar, pendiente de mostrar alerta")
        
      }
      console.log(cargaHorariaAEditar)
      setIdCargaHoraria("")
      setopenModalEdit(false)
    }


    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                 
                  <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div >
                       
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Edición de carga horaria</h3>
                          <div className="mt-2">
                          
                            {( (!isLoading) && (cargaHorariaActual.id === idCargaHoraria) ) && 
                            (<>
                              <OpcionModal 
                                titulo="Legajo y Nombre Completo" 
                                opciones={opcionesLegajo} 
                                setopcionSeleccionada={setOpcionLegajo}
                                opcionDefecto={opcionLegajoDefecto}
                              />
                             <OpcionModal 
                              titulo="Proyecto" 
                              opciones={opcionesDeProyectosParaSelect} 
                              setopcionSeleccionada={setOpcionProyecto}
                              opcionDefecto={opcionProyectoDefecto}
                              />
                              <OpcionModal 
                                titulo="Tarea" 
                                opciones={opcionesSelectorTareas} 
                                setopcionSeleccionada={setOpcionTarea}
                                opcionDefecto={opcionTareaDefecto}
                                opcionesProyecto={opcionProyecto}
                                />
                              <OpcionFecha 
                                setOpcionFecha={setOpcionFecha}
                                fechaPorDefecto={opcionFechaDefecto}
                              />
                              <OpcionModal
                                titulo="Horas Trabajadas" 
                                opciones={opcionesDeHoras}
                                setopcionSeleccionada={setOpcionHoras}
                                opcionDefecto={opcionHorasDefecto}
                              />
                              
                            </>)}
                            
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button onClick={handleEditar} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Cargar</button>
                      <button onClick={ () =>{ setIdCargaHoraria("");setopenModalEdit(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
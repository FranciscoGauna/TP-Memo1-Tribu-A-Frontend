import { RecursosContext } from "@/context/recursos/recursoContext"
import { CargaHoraria, OpcionSelector, Recurso } from "@/interfaces/recursos"
import { useContext, useEffect,useState } from "react"
import { OpcionModal } from "./opcionModal"


export default function ModalEdicion ({setopenModalEdit, idCargaHoraria}:{setopenModalEdit: Function,idCargaHoraria:string }){
    
  
    const {recursosState, getCargaHorariaPorId} = useContext(RecursosContext)
    const {cargaHorariaActual,cargasHorarias,recursos} = recursosState
    const [opcionesLegajo, setopcionesLegajo] = useState<Array<OpcionSelector>>([{} as OpcionSelector])
    const [opcionesProyectos, setopcionesProyectos] = useState<Array<OpcionSelector>>()
    const [opcionesTareas, setopcionesTareas] = useState<Array<OpcionSelector>>()


    const [opcionLegajoDefecto, setopcionLegajoDefecto] = useState<OpcionSelector>({} as OpcionSelector)
    const [opcionLegajoSeleccionada,setopcionLegajoSeleccionada] = useState<number>(0)


    const [isLoading,setIsLoading] = useState(true)

    const opcionesDeRecursosParaSelect:OpcionSelector[] = recursos.map((elemento:Recurso) =>{
      return { 
        value:`${elemento.legajo}`,
        label:`${elemento.nombre} ${elemento.apellido}`,
        color:'#FFFFFF'
      }
    })
    
    const opcion = opcionesDeRecursosParaSelect.find(a => (Number(a.value) === cargaHorariaActual.legajo))
      
    const opcionDefecto:OpcionSelector = (opcion) ? opcion : {} as OpcionSelector
    
    
    
    const establecerLasOpciones = () =>{
      
      setopcionesLegajo (opcionesDeRecursosParaSelect)
      setopcionLegajoDefecto(opcionDefecto)
      
    }

   
    useEffect(() =>{
      
      getCargaHorariaPorId(idCargaHoraria);
      // setTimeout( () =>{
      //   console.log(cargaHorariaActual)
      //   establecerLasOpciones()
      //   setIsLoading(false)
      // },5)
    },[])

    
    useEffect(() =>{
      console.log(cargaHorariaActual)
      if( !cargaHorariaActual.legajo ){
          console.log("sigo estando vacio ")
      }else if(cargaHorariaActual.id !== idCargaHoraria){
          console.log("estoy en proceso de cambio")
      }else{
        console.log("ia me complete")
        establecerLasOpciones()
        setIsLoading(false)
      }
     
    },[cargaHorariaActual])


    
    



    const opcionesDeProyectos = [
      { value: '1', label: 'Proyectos',color:"#FFFFFF" },
      { value: '2', label: 'Soporte',color:"#FFFFFF" },
      { value: '3', label: 'Recurso',color:"#FFFFFF" }
    ]

    const opcionesDeTareas = [
      { value: '1', label: 'Creacion',color:"#FFFFFF" },
      { value: '2', label: 'Filtrado',color:"#FFFFFF" },
      { value: '3', label: 'Eliminacion',color:"#FFFFFF" }
    ]


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
                              <OpcionModal titulo="Legajo y Nombre Completo" opciones={opcionesLegajo} setopcionSeleccionada={setopcionLegajoSeleccionada}/>
                              {/* <OpcionModal titulo="Proyecto" opciones={opcionesDeProyectos}/>
                              <OpcionModal titulo="Tarea" opciones={opcionesDeTareas}/> */}
                            </>)}
                            
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Cargar</button>
                      <button onClick={ () =>{ setopenModalEdit(false)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
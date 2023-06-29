import { useEffect, useState,useContext } from "react"
import UserGridRow from "@/components/userGridRow"
import { CargaHoraria, OpcionSelector, Proyecto, Recurso } from "@/interfaces/recursos"
import CargaHorariaGridRow from "@/components/recursos/cargaHorariaGridRow"
import ModalDelete from "@/components/recursos/modalDelete"
import ModalEdicion from "@/components/recursos/modalEdicion"
import { RecursosContext } from "@/context/recursos/recursoContext"
import ModalCreate from "@/components/recursos/modalCreate"
import Select from "react-select"

function HeaderItem({ title }: { title: string }) {
  return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" style={{ backgroundColor: '#0F3A61', color : '#FFFFFF'}}>{title}</th>
}

export default function Recursos() {
 

  const {recursosState,getCargasHorarias,getRecursos, getCargasHorariasSegun,getProyectosConTareas} = useContext(RecursosContext)
  const {cargasHorarias,recursos, proyectos} = recursosState

  const [openModalEdit, setopenModalEdit] = useState(false)
  const [openModalCreate, setopenModalCreate] = useState(false)
  const [openModalDelete, setopenModalDelete] = useState(false)
  const [openFiltro,setOpenFiltro] = useState(false)

  const [recursoAFiltrar,setrecursoAFiltrar] = useState("")
  const [proyectoAFiltrar,setproyectoAFiltrar] = useState("")

  const [cargaHorariaActualId,setCargaHorariaActualId] = useState("")


  useEffect(() =>{
    getCargasHorarias()
    getRecursos()
    getProyectosConTareas()
    
  },[])
  
  
  const opcionesDeRecursosParaSelect:OpcionSelector[] = recursos.map((elemento:Recurso) =>{
    return { 
      value:`${elemento.legajo}`,
      label:`${elemento.nombre} ${elemento.apellido}`,
      color:'#000000'
    }
  })
  
  const opcionesDeProyectosParaSelect:OpcionSelector[] = proyectos.map((elemento:Proyecto) =>{
    return { 
      value:`${elemento.uid}`,
      label:`${elemento.name}`,
      color:'#000000'
    }
  })

  const handleAplicarFiltro =() =>{
    getCargasHorariasSegun({recursoid:recursoAFiltrar, proyectoid: proyectoAFiltrar})
    setrecursoAFiltrar("")
    setproyectoAFiltrar("")
    setOpenFiltro(false)
  }

  return (
    <>

      {/* ACA EMPIEZA LA GRILLA */}

      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400">Recursos</h1>
          <div className="min-w-full flex justify-between py-4">
              <h2 className="text-2xl font-bold decoration-gray-400 ">Carga de horas</h2>
              <button style={{ backgroundColor: '#0F3A61', color:'#FFFFFF'}}onClick={ () => setopenModalCreate(true)}className="w-40 h-10 text-sm text-center flex items-center justify-center leading-5 
                bg-gray-300 rounded-2xl hover:bg-gray-200">Cargar horas</button>
            </div>
        </div>
        {openModalCreate && <ModalCreate setopenModalCreate={setopenModalCreate} />}
        {openModalDelete && <ModalDelete setopenModalDelete={setopenModalDelete} idCargaHoraria={cargaHorariaActualId}/>}
        {(openModalEdit  )  && <ModalEdicion setopenModalEdit={setopenModalEdit} idCargaHoraria={cargaHorariaActualId} setIdCargaHoraria={setCargaHorariaActualId}/>}
        <button onClick={() =>{ setOpenFiltro(!openFiltro)}} className="w-32 h-10 bg-gray-500 rounded-t-3xl flex items-center justify-center"> Filtros </button>
            {openFiltro  && (
                <div className="w-full h-48 bg-gray-300 grid grid-cols-2" style={{ backgroundColor: '#0F3A61'}}>
                    <div className="flex items-center justify-evenly" style={{ backgroundColor: '#0F3A61'}}>
                        <p className="w-1/5" style={{ color: '#FFFFFF'}}>Recurso</p>
                        <Select 
                          className="w-3/5"
                          onChange={(e:any) =>{setrecursoAFiltrar(e.value.toString())}}
                          options={opcionesDeRecursosParaSelect}
                          styles={{
                            control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor:'#F4F5F7',
                          
                            }),
                            singleValue:(styles)=>({
                                ...styles,
                                color:'#666666'
                            }),
                            option: (styles,{data,isDisabled,isFocused, isSelected}) =>{
                                return {...styles,color:data.color}
                            }
                        }}
                        />
                    </div>
                    <div className="flex items-center justify-evenly" style={{ backgroundColor: '#0F3A61'}}>
                        <p className="w-1/5" style={{ color: '#FFFFFF'}}>Proyecto</p>
                        <Select 
                          className="w-3/5"
                          onChange={(e:any) =>{setproyectoAFiltrar(e.value.toString())}}
                          options={opcionesDeProyectosParaSelect}
                          styles={{
                            control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor:'#F4F5F7',
                          
                            }),
                            singleValue:(styles)=>({
                                ...styles,
                                color:'#666666'
                            }),
                            option: (styles,{data,isDisabled,isFocused, isSelected}) =>{
                                return {...styles,color:data.color}
                            }
                        }}
                        />
                    </div>
                    {/* <div className="flex items-center justify-evenly">
                        <p className="w-1/5">fecha desde</p>
                        <Select className="w-3/5"/>
                    </div>
                    <div className="flex items-center justify-evenly">
                        <p className="w-1/5">fecha hasta</p>
                        <Select className="w-3/5"/>
                    </div> */}
                    <div style={{ backgroundColor: '#0F3A61'}}></div>
                    <div className="flex items-center justify-end mr-10" style={{ backgroundColor: '#0F3A61'}}>
                      <button style={{ backgroundColor: '#248CED'}} onClick={handleAplicarFiltro} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 mr-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Aplicar</button>
                      <button onClick={() =>{setOpenFiltro(false); setrecursoAFiltrar(""); setproyectoAFiltrar("")}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                    </div>
                </div>
            )}
        <div className="flex flex-col">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg" style={{ backgroundColor: '#0F3A61'}}>
              <table className="min-w-full" style={{ backgroundColor: '#0F3A61'}}>
                <thead>
                  <tr >
                    <HeaderItem title="Legajo"  />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Apellido" />
                    <HeaderItem title="Proyecto asociado" />
                    <HeaderItem title="Tarea asociada" />
                    <HeaderItem title="Fecha de creación" />
                    <HeaderItem title="Horas trabajadas" />
                  </tr>
                </thead>

                <tbody style={{ backgroundColor: '#0F3A61'}}>
                  {(!!cargasHorarias) && cargasHorarias.map((cargaHoraria) =>(
                    <CargaHorariaGridRow key={cargaHoraria.id} 
                        cargaHoraria={cargaHoraria} 
                        recurso={(recursos[cargaHoraria.legajo -1]) ? recursos[cargaHoraria.legajo -1] : recursos[0]} 
                        setopenModalDelete={setopenModalDelete}
                        setopenModalEdit ={setopenModalEdit}
                        setCargaHorariaActualId={setCargaHorariaActualId}
                        /> ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </>
  )
}

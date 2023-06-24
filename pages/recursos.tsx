import { useEffect, useState,useContext } from "react"
import UserGridRow from "@/components/userGridRow"
import { CargaHoraria } from "@/interfaces/recursos"
import CargaHorariaGridRow from "@/components/recursos/cargaHorariaGridRow"
import ModalDelete from "@/components/recursos/modalDelete"
import ModalEdicion from "@/components/recursos/modalEdicion"
import { RecursosContext } from "@/context/recursos/recursoContext"
import ModalCreate from "@/components/recursos/modalCreate"

function HeaderItem({ title }: { title: string }) {
  return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Recursos() {
 

  const {recursosState,getCargasHorarias,getRecursos} = useContext(RecursosContext)
  const {cargasHorarias,recursos} = recursosState

  const [openModalEdit, setopenModalEdit] = useState(false)
  const [openModalCreate, setopenModalCreate] = useState(false)
  const [openModalDelete, setopenModalDelete] = useState(false)

  const [cargaHorariaActualId,setCargaHorariaActualId] = useState("")

  useEffect(() =>{
    getCargasHorarias()
    getRecursos()
  },[])



  // useEffect(() =>{
  //   getCargasHorarias()
  //   console.log(recursos)
  //   console.log(cargasHorarias)
  // },[recursos,cargasHorarias])

  return (
    <>

      {/* ACA EMPIEZA LA GRILLA */}

      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400">Recursos</h1>
          <div className="min-w-full flex justify-between py-4">
              <h2 className="text-2xl font-bold decoration-gray-400 ">Carga de horas</h2>
              <button onClick={ () => setopenModalCreate(true)}className="w-40 h-10 text-sm text-center flex items-center justify-center leading-5 
                bg-gray-300 rounded-2xl hover:bg-gray-200">cargar horas</button>
            </div>
        </div>
        {openModalCreate && <ModalCreate setopenModalCreate={setopenModalCreate} />}
        {openModalDelete && <ModalDelete setopenModalDelete={setopenModalDelete} idCargaHoraria={cargaHorariaActualId}/>}
        {(openModalEdit  )  && <ModalEdicion setopenModalEdit={setopenModalEdit} idCargaHoraria={cargaHorariaActualId}/>}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <HeaderItem title="Legajo" />
                    <HeaderItem title="Nombre" />
                    <HeaderItem title="Apellido" />
                    <HeaderItem title="Proyecto asociado" />
                    <HeaderItem title="Tarea asociado" />
                    <HeaderItem title="Fecha de creación" />
                    <HeaderItem title="Horas trabajadas" />
                  </tr>
                </thead>

                <tbody>
                  {cargasHorarias.map((cargaHoraria) =>(
                    <CargaHorariaGridRow key={cargaHoraria.id} 
                        cargaHoraria={cargaHoraria} 
                        recurso={recursos[Number(cargaHoraria.legajo) - 1]} 
                        setopenModalDelete={setopenModalDelete}
                        setopenModalEdit ={setopenModalEdit}
                        setCargaHorariaActualId={setCargaHorariaActualId}
                        /> ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

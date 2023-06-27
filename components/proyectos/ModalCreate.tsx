import { ModalCreateProps } from "../types"
import { useState } from "react";

export default function ModalCreate({ modalOpen, setModalOpen}: ModalCreateProps) {
  const [name, setName] : [string, Function] = useState("");
  const [projectLeader, setProjectLeader] : [string, Function] = useState("");
  const [description, setDescription] : [string, Function] = useState("");
  const [startDate, setStartDate] : [string, Function] = useState("");
  const [endDate, setEndDate] : [string, Function] = useState("");

  const clearAttributes = () => {
    setName("");
    setProjectLeader("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  const createProject = () => {
    let formData = {name: name, project_leader: projectLeader, start_date: startDate, end_date: endDate, description: description};
    fetch('https://projects-backend-service.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log("CREATE", data);
        setModalOpen(false);
    });
  }

  return (
    <div
      id="loguearHorasModal"
      tabIndex={-1}
      aria-hidden={!modalOpen}
      className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear proyecto</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => {
                clearAttributes();
                setModalOpen(false)
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div>
			  <div>Nombre del proyecto:</div>
			  <input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%'}}
          value={name}
          onChange={e => setName(e.target.value)}  
          placeholder="Nombre de proyecto"
        ></input>
			  {/* Deberia ser un selector */}
			  <div>Líder del proyecto:</div>
			  <input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%'}}
          value={projectLeader}
          onChange={e => setProjectLeader(e.target.value)}
          placeholder="Líder del proyecto"
        ></input>
        <div>Comienzo de proyecto:</div>
			  <input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%'}}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="Comienzo de proyecto (formato: AAAA-MM-DD)"
        ></input>
        <div>Fin de proyecto:</div>
			  <input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%'}}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="Fin de proyecto (formato: AAAA-MM-DD)"
        ></input>
			  <div>Descripción:</div>
			  <input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%'}}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripción"
        ></input>
		  </div>
		  {/* Modal footer */}
		  <div style={{display: "flex", justifyContent:"flex-end"}}>
			<button 
				style={{backgroundColor: "#0F3A61", color: "#FFFFFF", borderRadius: 5, marginRight: 10, width: 100, height: 40}}
				onClick={() => {
          clearAttributes();
          setModalOpen(false);
        }}
			>Cancelar</button>
			<button
				style={{backgroundColor: "#0F3A61", color: "#FFFFFF", borderRadius: 5, width: 100, height: 40}}
        onClick={() => {
          createProject();
        }}
			>Crear</button>
		  </div>
        </div>
      </div>
    </div>
  )
}
import { ModalCreateProjectProps } from "../../types/components"
import { useEffect, useState } from "react";
import Select from "react-select";

function parseResource(res: { [x: string]: string; }){
	var label = res["nombre"] + " " + res["apellido"]
	var value = res["legajo"];
	return { label, value }
}

function parseResources(res: { [x: string]: string; }[]){
	return res.map(parseResource);
}

export default function ModalCreate({ modalOpen, setModalOpen}: ModalCreateProjectProps) {
  const [name, setName] : [string, Function] = useState("");
  const [projectLeader, setProjectLeader] : [string, Function] = useState("");
  const [description, setDescription] : [string, Function] = useState("");
  const [stage, setStage] : [string, Function] = useState("");
  const [estimatedHours, setEstimatedHours] : [number, Function] = useState(0);
  const [startDate, setStartDate] : [string, Function] = useState("");
  const [endDate, setEndDate] : [string, Function] = useState("");
  const [leaderOptions, setLeaderOptions] : [{ value: string, label: string }[], Function] = useState([]);
  const customStyles = {
    option: (defaultStyles: object, state: { isSelected: any; }) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#000000",
      backgroundColor: state.isSelected ? "#ffffff" : "#ffffff",
    }),

    control: (defaultStyles: object) => ({
      ...defaultStyles,
      backgroundColor: "#ffffff",
    }),
    singleValue: (defaultStyles: object) => ({ ...defaultStyles, color: "#000" }),
  };

  const clearAttributes = () => {
    setName("");
    setProjectLeader("");
    setEstimatedHours(0);
    setDescription("");
    setStartDate("");
    setEndDate("");
    setStage("");
  }

  useEffect(() => {
	// Se trae los proyectos del endpoint
	fetch(process.env.NEXT_PUBLIC_RESOURCES_URL + "/api/v1/users")
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			setLeaderOptions(parseResources(data));
		}).catch((e) => {
			console.error(e);
		});
	}, []);

  const createProject = () => {
    let formData = {
		name: name, 
		description: description,
		project_leader: projectLeader,
		stage: stage,
		estimated_hours: estimatedHours, 
		start_date: startDate, 
		end_date: endDate, 
		tasks: {}
	};
    fetch(process.env.NEXT_PUBLIC_PROJECTS_URL + "/projects", {
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
		//window.location.reload();
    }).catch((error) => {
		console.error(error);
		alert("Failed to create Project");
	});
  }

  return (
    <div
    	id="createProjectModal"
    	tabIndex={-1}
      	aria-hidden={!modalOpen}
      	className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
    >
      	<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        	{/* <!-- Modal content --> */}
        	<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          		{/* <!-- Modal header --> */}
				<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear Proyecto</h3>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="defaultModal"
						onClick={() => {
							clearAttributes();
							setModalOpen(false)
						}}>
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
							/>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
				</div>
				{/* <!-- Modal body --> */}
				<div>
					<div>Nombre del proyecto:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={name}
						onChange={e => setName(e.target.value)}  
						placeholder="Nombre de proyecto"
					/>
					<div>Descripción:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Descripción"
					/>
					<div>Horas Estimadas:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={estimatedHours}
						type="number"
						onChange={e => setEstimatedHours(e.target.value)}
						placeholder="50"
					/>
					<div>Líder del proyecto:</div>
					<Select 
						options={leaderOptions} 
						styles={customStyles} 
						onChange={(option) => {if (option) setProjectLeader(option.value)}}
					/>
					<div>Estado:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={stage}
						onChange={e => setStage(e.target.value)}
						placeholder="Comienzo"
					/>
					<div>Comienzo de proyecto:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
						placeholder="Comienzo de proyecto (formato: AAAA-MM-DD)"
					/>
					<div>Fin de proyecto:</div>
					<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
						value={endDate}
						onChange={e => setEndDate(e.target.value)}
						placeholder="Fin de proyecto (formato: AAAA-MM-DD)"
					/>
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
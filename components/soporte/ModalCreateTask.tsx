import {ModalCreateTaskProps, Project, Recurso} from "../types"
import React, { useEffect, useState } from "react";
import Select from "react-select";
export default function ModalCreateTicket({ modalOpen, setModalOpen, ticket}: ModalCreateTaskProps) {
	const [endDate, setEndDate] : [string, Function] = useState("");
	const [descripcion, setDescripcion] : [string, Function] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [hoursEst, setHoursEst] : [number, Function] = useState(0);
	const [id, setId] : [string, Function] = useState("");
	const [name, setName] : [string, Function] = useState("");
	const [startDate, setStartDate] : [string, Function] = useState("");
	const [state, setState] : [string, Function] = useState("");
	const [projectOptions, setProjectOptions] : [Project[], Function] = useState<Project[]>([]);
	const [project, setProject] : [string, Function] = useState("");
	const [recursosOptions, setRecursosOptions] = useState<Recurso[]>([]);
	const [recurso, setRecurso] : [number, Function] = useState(0);


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
		setEndDate("")
		setDescripcion("");
		setHoursEst(0);
		setRecurso(0);
		setId("");
		setName("");
		setStartDate("");
		setState("");
		setProject("");
	}

	useEffect(() => {
		fetch(`https://projects-backend-service.onrender.com/projects`)
			.then((res) => res.json())
			.then((data) => {
				setProjectOptions(data.projects);
			})
			.catch((error) => {
				console.error("Error fetching Proyectos:", error);
			});
	}, []);

	useEffect(() => {
		fetch(`https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/users`)
			.then((res) => res.json())
			.then((data) => {
				setRecursosOptions(data);
			})
			.catch((error) => {
				console.error("Error fetching Usuarios:", error);
			});
	}, []);

	const createTarea = () => {
		const requiredFields = document.querySelectorAll('input[required]');
		let isValid = true;

		requiredFields.forEach((field) => {
			if (!(field instanceof HTMLInputElement)) return;

			if (!field.value) {
				field.classList.add('error');
				isValid = false;
			} else {
				field.classList.remove('error');
			}
		});


		if (!isValid) {
			setShowPopup(true);
		} else {
			setEndDate(ticket.fechaLimite);
			setState("Pending");
			const currentDate = new Date();
			setStartDate(currentDate.toISOString());
			let formData = {
				description: descripcion,
				end_date: endDate,
				hours_est: hoursEst,
				human_resource: recurso,
				name: name,
				start_date: startDate,
				state: state
			};
			fetch("https://projects-backend-service.onrender.com/projects/${project.uid}/tasks", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}).then((res) => {
				res.json();
			}).then((data) => {
				console.log("CREATE", data);
				setId(data.id)
				setModalOpen(false);
			}).catch((error) => {
				console.error(error);
				alert("Fallo al crear Tarea");
			});

			if (id) {

				fetch("https://tp-memo1-tribu-a-soporte.onrender.com/tickets/${ticket.codigo}/tareas", {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}).then((res) => {
					res.json();
				}).then((data) => {
					console.log("CREATE", data);
					setId(data.id)
					setModalOpen(false);
				}).catch((error) => {
					console.error(error);
					alert("Fallo al crear Ticket");
				});
			}
		}
	}

	return (
		<div
			id="crearTaskModal"
			tabIndex={-1}
			aria-hidden={!modalOpen}
			className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
		>
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				{/* <!-- Modal content --> */}
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					{/* <!-- Modal header --> */}
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear Tarea</h3>
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
						<div>Nombre:</div>
						<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={name}
							   onChange={e => setName(e.target.value)}
							   placeholder="Nombre del ticket"
							   required
						/>
						<div>Descripción:</div>
						<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={descripcion}
							   onChange={e => setDescripcion(e.target.value)}
							   placeholder="Descripción"
							   required
						/>
						<div>Proyecto:</div>
						<Select
							options={projectOptions}
							styles={customStyles}
							onChange={(selectedOption) => {
								if (selectedOption) {
									setProject(selectedOption.uid);
								}
							}}
							required
						/>
						<div>Horas estimadas:</div>
						<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							value={hoursEst}
							onChange={e => setHoursEst(e.target.value)}
							placeholder="Cantidad de horas estimadas"
							required
					/>
						<div>Recurso asignado:</div>
						<Select
							options={recursosOptions}
							styles={customStyles}
							onChange={(selectedOption) => {
								if (selectedOption) {
									setRecurso(selectedOption.legajo);
								}
							}}
						/>
						
					</div>
					{/* Popup */}
					{showPopup && (
						<div className="popup">
							<div className="popup-content">
								<h3 className="font-bold text-white mb-2 px-3" style={{ backgroundColor : "lightcoral" }}>Por favor completar todos los campos</h3>
							</div>
						</div>
					)}
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
								createTarea();
							}}
						>Crear</button>
					</div>
				</div>
			</div>
		</div>
	)
}
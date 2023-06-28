import {Cliente, ModalUpdateTicketProps} from "../types"
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function ModalUpdateTicket({ modalOpen, setModalOpen}: ModalUpdateTicketProps) {
	const [titulo, setTitulo] : [string, Function] = useState("");
	const [prioridad, setPrioridad] : [string, Function] = useState("");
	const [severidad, setSeveridad] : [string, Function] = useState("");
	const [descripcion, setDescripcion] : [string, Function] = useState("");
	const [cliente, setCliente] : [number, Function] = useState(0);
	const [clienteOptions, setClienteOptions] = useState<{ label: string; id: number }[]>([]);

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
		setTitulo("");
		setPrioridad("");
		setSeveridad("");
		setDescripcion("");
		setCliente(0);
	}

	useEffect(() => {
		fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/clientes`)
			.then((res) => res.json())
			.then((data) => {
				const options = data.map((cliente: Cliente) => ({
					label: cliente.razonSocial,
					id: cliente.id,
				}));
				setClienteOptions(options);
			})
			.catch((error) => {
				console.error("Error fetching Clientes:", error);
			});
	}, []);

	const createTicket = () => {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString();
		let formData = {
			titulo: titulo,
			severidad: severidad,
			prioridad: prioridad,
			estado: "PENDIENTE",
			fechaLimite: "",
			fechaCreacion: formattedDate,
			description: descripcion,
			cliente: cliente,
		};
		fetch('https://tp-memo1-tribu-a-soporte.onrender.com/tickets', {
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
		}).catch((error) => {
			console.error(error);
			alert("Fallo al crear Ticket");
		});
	}

	return (
		<div
			id="crearTicketModal"
			tabIndex={-1}
			aria-hidden={!modalOpen}
			className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
		>
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				{/* <!-- Modal content --> */}
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					{/* <!-- Modal header --> */}
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear Ticket</h3>
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
						<div>Titulo:</div>
						<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={titulo}
							   onChange={e => setTitulo(e.target.value)}
							   placeholder="Titulo del ticket"
						/>
						<div>Descripción:</div>
						<input style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={descripcion}
							   onChange={e => setDescripcion(e.target.value)}
							   placeholder="Descripción"
						/>
						<div>Cliente:</div>
						<Select
							options={clienteOptions}
							styles={customStyles}
							onChange={(selectedOption) => {
								if (selectedOption) {
									setCliente(selectedOption.id);
								}
							}}
						/>
						<div className="flex space-x-4">
							<label htmlFor="prioridad" className="font-bold">Prioridad:</label>

							<label>
								<input
									type="radio"
									name="prioridad"
									value="BAJA"
									checked={prioridad === 'BAJA'}
									onChange={e => setPrioridad(e.target.value)}
								/>
								Baja
							</label>
							<label>
								<input
									type="radio"
									name="prioridad"
									value="MEDIA"
									checked={prioridad === 'MEDIA'}
									onChange={e => setPrioridad(e.target.value)}
								/>
								Media
							</label>
							<label>
								<input
									type="radio"
									name="prioridad"
									value="ALTA"
									checked={prioridad === 'ALTA'}
									onChange={e => setPrioridad(e.target.value)}
								/>
								Alta
							</label>
						</div>
						<div className="flex space-x-4">
							<label htmlFor="severidad" className="font-bold">Severidad:</label>

							<label>
								<input
									type="radio"
									name="severidad"
									value="S1"
									checked={severidad === 'S1'}
									onChange={e => setSeveridad(e.target.value)}
								/>
								S1
							</label>
							<label>
								<input
									type="radio"
									name="severidad"
									value="S2"
									checked={severidad === 'S2'}
									onChange={e => setSeveridad(e.target.value)}
								/>
								S2
							</label>
							<label>
								<input
									type="radio"
									name="severidad"
									value="S3"
									checked={severidad === 'S3'}
									onChange={e => setSeveridad(e.target.value)}
								/>
								S3
							</label>
							<label>
								<input
									type="radio"
									name="severidad"
									value="S4"
									checked={severidad === 'S4'}
									onChange={e => setSeveridad(e.target.value)}
								/>
								S4
							</label>
						</div>
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
								createTicket();
							}}
						>Crear</button>
					</div>
				</div>
			</div>
		</div>
	)
}
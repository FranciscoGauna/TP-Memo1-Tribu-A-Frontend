import { ModalCreateTicketProps } from "../../types/components"
import { Cliente } from "../../types/model"
import React, { useEffect, useState } from "react";
import Select from "react-select";
export default function ModalCreateTicket({ modalOpen, setModalOpen, idVersion}: ModalCreateTicketProps) {
	const [titulo, setTitulo] : [string, Function] = useState("");
	const [prioridad, setPrioridad] : [string, Function] = useState("");
	const [severidad, setSeveridad] : [string, Function] = useState("");
	const [descripcion, setDescripcion] : [string, Function] = useState("");
	const [cliente, setCliente] : [number, Function] = useState(0);
	const [clienteOptions, setClienteOptions] = useState<{ label: string; id: number }[]>([]);
	const [showPopup, setShowPopup] = useState(false);

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
		const requiredFields = document.querySelectorAll('.ticketCreateFormField[required]');
		let isValid = true;
		const radioSections = new Set();

		requiredFields.forEach((field) => {
			if (!(field instanceof HTMLInputElement)) return;

			if (!field.value) {
				field.classList.add('error');
				isValid = false;
			} else {
				field.classList.remove('error');

				if (field.type === 'radio') {
					radioSections.add(field.name);
				}
			}
		});

		radioSections.forEach((sectionName) => {
			const radioButtons = document.querySelectorAll(`.ticketCreateFormField[type="radio"][name="${sectionName}"]:checked`);
			if (radioButtons.length === 0) {
				isValid = false;
			}
		});

		if (!isValid) {
			setShowPopup(true);
		} else {
			const currentDate = new Date();
			const formattedDate = currentDate.toISOString();
			let formData = {
				titulo: titulo,
				severidad: severidad,
				prioridad: prioridad,
				estado: "PENDIENTE",
				description: descripcion,
				fechaLimite: "",
				fechaCreacion: formattedDate,
				cliente: cliente,
				versionProducto: idVersion,
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
						<div>Título:</div>
						<input className="ticketCreateFormField"
							   style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={titulo}
							   onChange={e => setTitulo(e.target.value)}
							   placeholder="Título del ticket"
							   required
						/>
						<div>Descripción:</div>
						<input className="ticketCreateFormField"
							   style={{borderColor: "#0F3A61", borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 15, width: '100%', color: "#000000"}}
							   value={descripcion}
							   onChange={e => setDescripcion(e.target.value)}
							   placeholder="Descripción"
							   required
						/>
						<div>Cliente:</div>
						<Select className="ticketCreateFormField"
							options={clienteOptions}
							styles={customStyles}
							onChange={(selectedOption) => {
								if (selectedOption) {
									setCliente(selectedOption.id);
								}
							}}
							required
						/>
						<div className="flex space-x-5 mt-4 mb-4">
							<label htmlFor="prioridad" className="font-bold">
								Prioridad:
							</label>

							<div className="flex items-center">
								<input
									type="radio"
									id="baja"
									name="prioridad"
									value="BAJA"
									checked={prioridad === 'BAJA'}
									onChange={(e) => setPrioridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="baja">Baja</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="media"
									name="prioridad"
									value="MEDIA"
									checked={prioridad === 'MEDIA'}
									onChange={(e) => setPrioridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="media">Media</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="alta"
									name="prioridad"
									value="ALTA"
									checked={prioridad === 'ALTA'}
									onChange={(e) => setPrioridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="alta">Alta</label>
							</div>
						</div>
						<div className="flex space-x-5 mt-4 mb-4">
							<label htmlFor="severidad" className="font-bold">
								Severidad:
							</label>

							<div className="flex items-center">
								<input
									type="radio"
									id="s1"
									name="severidad"
									value="S1"
									checked={severidad === 'S1'}
									onChange={(e) => setSeveridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="s1">S1</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="s2"
									name="severidad"
									value="S2"
									checked={severidad === 'S2'}
									onChange={(e) => setSeveridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="s2">S2</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="s3"
									name="severidad"
									value="S3"
									checked={severidad === 'S3'}
									onChange={(e) => setSeveridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="s3">S3</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="s4"
									name="severidad"
									value="S4"
									checked={severidad === 'S4'}
									onChange={(e) => setSeveridad(e.target.value)}
									className="ticketCreateFormField mr-1"
									required
								/>
								<label htmlFor="s4">S4</label>
							</div>
						</div>
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
								createTicket();
							}}
						>Crear</button>
					</div>
				</div>
			</div>
		</div>
	)
}
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProyectoDetalle() {
	const router = useRouter();
	const [id, setId] : [string, Function] = useState("");
	
	useEffect(() => {
		const url = window.location.href;
		let urlSplitted = url.split('/');
		setId(urlSplitted[urlSplitted.length-1]);
	}, []);

	return (<>
		<div>Proyecto: Proyecto {id}</div>
		<div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
			<div>Tareas</div>
			<button style={{backgroundColor: '#FBF784', padding: 10, borderRadius: 5}}>Crear tarea</button>
		</div>
		{/* Aca va la tabla de tareas */}
	</>);
}
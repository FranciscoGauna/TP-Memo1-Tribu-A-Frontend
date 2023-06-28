import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Project } from "../types";

export default function ProyectoDetalle() {
	const router = useRouter();
	const [id, setId] : [string, Function] = useState("");
    const [project, setProject] : [Project, Function] = useState({
        id: 0,
        name: "",
        description: "",
        state: "",
        start_date: "",
        end_date: "",
        estimated_hours: 0,
        project_leader: "", 
        tasks: {},
        uid: ""
    });
	
	useEffect(() => {
		const url = window.location.href;
		let urlSplitted = url.split('/');
		setId(urlSplitted[urlSplitted.length-1]);
        // Se trae el proyecto del endpoint
        fetch(process.env.NEXT_PUBLIC_PROJECTS_URL + "/projects/" + urlSplitted[urlSplitted.length-1])
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProject(data.project);
            }).catch((e) => {
                console.error(e);
            });
	}, []);

	return (<>
		<div>Proyecto: {project.name}</div>
		<div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
			<div>Tareas</div>
			<button style={{backgroundColor: '#FBF784', padding: 10, borderRadius: 5}}>Crear tarea</button>
		</div>
		{/* Aca va la tabla de tareas */}
	</>);
}
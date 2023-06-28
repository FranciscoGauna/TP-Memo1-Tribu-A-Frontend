import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task, Project } from "../types";

function TaskItem({task, setModalUpdateOpen, setModalDeleteOpen, setTask} : 
	{task: Task, setModalUpdateOpen: Function, setModalDeleteOpen: Function, setTask: Function }) {
    return (
        <div style={{backgroundColor: "#0F3A61", color: "#FFFFFF", display: "flex", justifyContent: "space-between", marginBottom: 30, height: 100, alignItems: "center", padding: 20}}>
            <div style={{fontSize: 20}}>
                <div>{task.name}</div>
                <div>{}</div>
            </div>
            <div style={{display: "flex", fontSize: 18}}>
                <button
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#7B7B7B", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}
                    onClick={() => {
                        setTask(task);
                        setModalUpdateOpen(true);
                    }}
                >Editar</button>
                <button 
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#D73838", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}
                    onClick={() => {
                        setTask(task);
                        setModalDeleteOpen(true);
                    }}
                >Eliminar</button>
            </div>
        </div>
    );
}

export default function ProyectoDetalle() {
	const router = useRouter();
	const [id, setId] : [string, Function] = useState("");
	const [task, setTask] : [Task, Function] = useState({
		puid: "",
        name: "",
        description: "",
        state: "",
        start_date: "",
        end_date: "",
        estimated_hours: 0,
	});
    const [project, setProject] : [Project, Function] = useState({
        id: 0,
        name: "",
        description: "",
        stage: "",
        start_date: "",
        end_date: "",
        estimated_hours: 0,
        project_leader: "", 
        tasks: {},
        uid: ""
    });

	const setModalUpdateOpen = () => {};
	const setModalDeleteOpen = () => {};
	
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

	return (
	<div style={{backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90}}>
		<div>
			<p style={{color: "#000000"}}>Proyecto: {project.name}</p>
		</div>
		<div style={
			{display: "flex", backgroundColor: "#185FA1", color: "#FFFFFF", justifyContent: "space-between", 
			paddingLeft: 30, paddingRight: 30, height: 100, alignItems: "center", marginBottom: 30}}>
            <div style={{fontSize: 20}}>Crear Tarea</div>
            <button 
                style={{display:"flex", justifyContent: "center", alignItems: "center", borderRadius: 35, backgroundColor: "#248CED", height: 70, width: 70, fontSize: 40}}
                onClick={() => {}}
            >+</button>
        </div>
		{/* Aca va la tabla de tareas */}
		{Object.values(project.tasks).map((task, index) => (
                <TaskItem task={task} setModalUpdateOpen={setModalUpdateOpen} setModalDeleteOpen={setModalDeleteOpen} setTask={setTask} key={index}/>
            ))}
	</div>);
}
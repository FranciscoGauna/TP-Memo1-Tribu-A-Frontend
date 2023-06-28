import ModalCreate from "@/components/tareas/ModalCreate";
import ModalDelete from "@/components/tareas/ModalDelete";
import ModalUpdate from "@/components/tareas/ModalUpdate";
import { useEffect, useState } from "react";
import { Task, Project, Resource } from "../types";

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
	const [id, setId] : [string, Function] = useState("");
    const [modalCreateOpen, setModalCreateOpen] : [boolean, Function] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] : [boolean, Function] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] : [boolean, Function] = useState(false);
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
    const [projectLeader, setProjectLeader] : [Resource, Function] = useState({
        legajo: "",
        nombre: "",
        apellido: ""
    });

    const showAttribute = (attribute: string) => {
        return (attribute) ? attribute : '-';
    }

    const showDate = (date: string) => {
        if (date) {
            let dateSplitted = date.split("-");
            return `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`
        } else {
            return '-'
        }
    }

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

    useEffect(() => {
        if (!id) return;
        // Se trae el proyecto del endpoint
        fetch(process.env.NEXT_PUBLIC_PROJECTS_URL + "/projects/" + id)        
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProject(data.project);
            }).catch((e) => {
                console.error(e);
            });
    }, [id]);

    useEffect(() => {
        if (!project.project_leader) return;
        // Se trae los recursos del endpoint
        fetch(process.env.NEXT_PUBLIC_RESOURCES_URL + "/api/v1/users")
            .then((res) => {
                return res.json()
            }).catch((e) => {
                console.error(e);
            })
            .then((data) => {
                let leader = data.find((r: Resource) => r.legajo == project.project_leader);
                if (leader) {
                    setProjectLeader(leader);
                }
            }).catch((e) => {
                console.error(e);
            });
    }, [project]);

	return (<>
    <div style={{backgroundColor: "#DDDDDC", height: 85, display: "flex", alignItems: "center", padding: 23, fontSize: 40, fontWeight: "500"}}>{project.name}</div>
	<div style={{display: "flex", flexDirection: "column", height: "100%", paddingLeft: 90, paddingRight: 90}}>
        <div>
            <div style={{fontSize: 35, fontWeight: "500", marginTop: 14}}>Información del proyecto</div>
            <div style={{display: "flex"}}>
                <div style={{marginRight: 100}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{fontWeight: "bold"}}>Descripción:</div>
                        <div>{showAttribute(project.description)}</div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{fontWeight: "bold", marginRight: 8}}>Horas Hombre Estimadas:</div>
                        <div>{showAttribute(project.estimated_hours.toString())}</div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex"}}>
                        <div style={{fontWeight: "bold", marginRight: 8}}>Fecha de inicio:</div>
                        <div>{showDate(project.start_date)}</div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{fontWeight: "bold", marginRight: 8}}>Fecha de finalización:</div>
                        <div>{showDate(project.end_date)}</div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{fontWeight: "bold", marginRight: 8}}>Lider de proyecto:</div>
                        <div>{showAttribute((projectLeader.nombre && projectLeader.apellido) ? `${projectLeader.nombre} ${projectLeader.apellido}` : "")}</div>
                    </div>
                </div>
            </div>
        </div>
        {/* ---- Separador ---- */}
        <div style={{backgroundColor: "#000000", width: "100%", height: 1, marginBottom: 10, marginTop: 36}}></div>
        {/* ------------------- */}
		<div>
			<p style={{color: "#000000", fontSize: 35, fontWeight: "500"}}>Tareas</p>
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
        {/* <ModalCreate></ModalCreate>
        <ModalUpdate></ModalUpdate>
        <ModalDelete></ModalDelete> */}
	</div>
    </>);
}
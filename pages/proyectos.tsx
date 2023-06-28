import {useEffect, useState} from "react";
import { Project } from "../types/model";
import ModalCreate from "../components/proyectos/ModalCreate"; 
import ModalUpdate from "@/components/proyectos/ModalUpdate";
import ModalDelete from "@/components/proyectos/ModalDelete";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>;
}

function ProjectItem({project, setModalUpdateOpen, setModalDeleteOpen, setProject} : {project: Project, setModalUpdateOpen: Function, setModalDeleteOpen: Function, setProject: Function }) {
    return (
        <div style={{backgroundColor: "#0F3A61", color: "#FFFFFF", display: "flex", justifyContent: "space-between", marginBottom: 30, height: 100, alignItems: "center", padding: 20}}>
            <div style={{fontSize: 20}}>
                <div>{project.name}</div>
                <div>{}</div>
            </div>
            <div style={{display: "flex", fontSize: 18}}>
                <button 
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#248CED", borderRadius: 10, height: 42, width: 95}}
                    onClick={() => window.open(`http://localhost:3000/proyectos/${project.uid}`, "_self")}
                >Ver</button>
                <button
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#7B7B7B", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}
                    onClick={() => {
                        setProject(project);
                        setModalUpdateOpen(true);
                    }}
                >Editar</button>
                <button 
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#D73838", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}
                    onClick={() => {
                        setProject(project);
                        setModalDeleteOpen(true);
                    }}
                >Eliminar</button>
            </div>
        </div>
    );
}

export default function Proyectos() {
    const [list, setList] : [Project[], Function] = useState([]);
    const [modalCreateOpen, setModalCreateOpen] : [boolean, Function] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] : [boolean, Function] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] : [boolean, Function] = useState(false);
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

	const reloadProjects = () => {
        // Se trae los proyectos del endpoint
        fetch(process.env.NEXT_PUBLIC_PROJECTS_URL + "/projects")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data.projects);
            }).catch((e) => {
                console.error(e);
            });
	}

    useEffect(reloadProjects, []);

	const ModalCreateHandle = (flag: boolean) => {
		if (!flag)
			reloadProjects();
		setModalCreateOpen(flag);
	}

	const ModalUpdateHandle = (flag: boolean) => {
		if (!flag)
			reloadProjects();
		setModalUpdateOpen(flag);
	}

	const ModalDeleteHandle = (flag: boolean) => {
		if (!flag)
			reloadProjects();
		setModalDeleteOpen(flag);
	}

    return (
        <div style={{backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90}}>
            <div style={{display: "flex", backgroundColor: "#185FA1", color: "#FFFFFF", justifyContent: "space-between", paddingLeft: 30, paddingRight: 30, height: 100, alignItems: "center", marginBottom: 30}}>
                <div style={{fontSize: 20}}>Crear Proyecto</div>
                <button 
                    style={{display:"flex", justifyContent: "center", alignItems: "center", borderRadius: 35, backgroundColor: "#248CED", height: 70, width: 70, fontSize: 40}}
                    onClick={() => setModalCreateOpen(true)}
                >+</button>
            </div>
            {list.map((project, index) => (
                <ProjectItem project={project} setModalUpdateOpen={setModalUpdateOpen} setModalDeleteOpen={setModalDeleteOpen} setProject={setProject} key={index}/>
            ))}
            <ModalCreate modalOpen={modalCreateOpen} setModalOpen={ModalCreateHandle}/>
            <ModalUpdate modalOpen={modalUpdateOpen} setModalOpen={ModalUpdateHandle} project={project} setProject={setProject}/>
            <ModalDelete modalOpen={modalDeleteOpen} setModalOpen={ModalDeleteHandle} project={project}/>
        </div>
    )
}
import {useEffect, useState} from "react";
import ProjectGridRow from "@/components/proyectoGridRow";
import { Project } from "./types";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>;
}

function ProjectItem({name, client, id} : {name: string, client: string, id: number}) {
    return (
        <div style={{backgroundColor: "#0F3A61", color: "#FFFFFF", display: "flex", justifyContent: "space-between", marginBottom: 30, height: 100, alignItems: "center", padding: 20}}>
            <div style={{fontSize: 20}}>
                <div>{name}</div>
                <div>{client}</div>
            </div>
            <div style={{display: "flex", fontSize: 18}}>
                <button 
                    style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#248CED", borderRadius: 10, height: 42, width: 95}}
                    onClick={() => window.open(`http://localhost:3000/proyectos/${id}`, "_self")}
                >Ver</button>
                <button style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#7B7B7B", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}>Editar</button>
                <button style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#D73838", borderRadius: 10, height: 42, width: 95, marginLeft: 12}}>Eliminar</button>
            </div>
        </div>
    );
}

export default function Proyectos() {
    const [list, setList] : [Project[], Function] = useState([]);

    useEffect(() => {
        // Se trae los proyectos del endpoint
        /* fetch("https://projects-backend-service.onrender.com/spec/projects")
            .then((res) => {
                console.log("res", res)
                return res.json()
            })
            .then((data) => {
                setList(data);
            }
        ); */
        setList([
            {id: 1, description: "", state: "En progreso", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 200, projectLeader: "Juan Nardoni", name: "QuickFix", client: "LDE"},
            {id: 2, description: "", state: "Sin iniciar", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 150, projectLeader: "Nahuel Molina", name: "GreenTech Solutions", client: "LOREM SRL"},
            {id: 3, description: "", state: "Etapa final", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 20, projectLeader: "Pedro Gómez", name: "ABC Software Solutions", client: "KNN"}
        ]);
    }, [])

    return (
        <div style={{backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90}}>
            <div style={{display: "flex", backgroundColor: "#185FA1", color: "#FFFFFF", justifyContent: "space-between", paddingLeft: 30, paddingRight: 30, height: 100, alignItems: "center", marginBottom: 30}}>
                <div style={{fontSize: 20}}>Crear Proyecto</div>
                <button style={{display:"flex", justifyContent: "center", alignItems: "center", borderRadius: 35, backgroundColor: "#248CED", height: 70, width: 70, fontSize: 40}}>+</button>
            </div>
            {list.map((project, index) => (
                <ProjectItem name={project.name} client={project.client} id={project.id} key={index}/>
            ))}
        </div>
    )
}

import {useEffect, useState} from "react";
import ProjectGridRow from "@/components/proyectoGridRow";
import { Project } from "./types";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Proyectos() {
    const [list, setList] : [Project[], Function] = useState([])

    useEffect(() => {
        // Traerse los proyectos del endpoint
        setList([
            {id: 1, description: "", state: "En progreso", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 200, projectLeader: "Juan Nardoni", name: "QuickFix", client: "LDE"},
            {id: 2, description: "", state: "Sin iniciar", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 150, projectLeader: "Nahuel Molina", name: "GreenTech Solutions", client: "LOREM SRL"},
            {id: 3, description: "", state: "Etapa final", startDate: 1687210330000, endDate: 1687211330000, estimatedHours: 20, projectLeader: "Pedro Gómez", name: "ABC Software Solutions", client: "KNN"}])
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Proyectos</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Nombre"/>
                                    <HeaderItem title="Lider de proyecto"/>
                                    <HeaderItem title="Cliente"/>
                                    <HeaderItem title="Estado"/>
                                    <HeaderItem title="Fecha inicio"/>
                                    <HeaderItem title="Fecha fin estimado"/>
                                    <HeaderItem title="Horas estimadas"/>
                                    <HeaderItem title="Descripción"/>
                                    <HeaderItem title="Acción"/>
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((project) => (
                                    <ProjectGridRow project={project} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

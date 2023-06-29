import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Cliente, Recurso, Task} from "../types";

function buscarRecurso(list : Recurso[], legajo: number){
    const recurso = list.find((recurso) => recurso.legajo == legajo);
    return recurso ? (recurso.nombre + " " + recurso.apellido) : "Desconocido";
}
export default function TereaGridRow({ tarea , proyecto }: {
    tarea: Task;
    proyecto: string;
}) {
    const [list, setList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("https://fiuba-memo1-recursos-core.azurewebsites.net/api/v1/users")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, []);

    const handleVerProyecto = (idProyecto : string) => {
        router.push(`/proyectos/${idProyecto}`);
    };

    return (
        <div key={`${tarea.name}`} className="flex items-center justify-between">
            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center font-bold">{tarea.name}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center"><span className="font-bold mr-2">Estado:</span>{tarea.state}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center"><span className="font-bold mr-2">Recurso asociado:</span>{buscarRecurso(list,parseInt(tarea.human_resource))}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    <button className="px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#248CED" }}
                            onClick={() => handleVerProyecto(proyecto)}
                    >
                        Ir al proyecto
                    </button>
                </div>
            </div>
        </div>
    )
}

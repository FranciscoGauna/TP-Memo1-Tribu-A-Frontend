import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import { Task } from "../types";


export default function TereaGridRow({ tarea }: {
    tarea: Task;
}) {
    
    const handleVerTarea = (codigoVersion : number, descripcionVersion : string) => {
        //cambiar este boton a lo que necesitamos
        // router.push(`/soporte/versiones/tickets?codigoVersion=${codigoVersion}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    return (
        <div key={`${tarea.name}`} className="flex items-center justify-between">
            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center font-bold">{tarea.description}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center">Estado: {tarea.state}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    <button className="px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#248CED" }}
                            onClick={() => handleVerTarea(version.codigo, version.descripcion)}
                    >
                        Ver tarea
                    </button>
                </div>
            </div>
        </div>
    )
}

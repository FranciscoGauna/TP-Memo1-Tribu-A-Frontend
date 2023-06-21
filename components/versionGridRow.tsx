import {useEffect, useState} from "react";
import {router} from "next/router";

export default function VersionGridRow({ version , nombreProducto }) {
    const [cantTickets, setCantTickets] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/versiones/${version.codigo}/tickets`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const ticketsCount = data.length;
                setCantTickets(ticketsCount);
            });
    }, []);
    const handleVerTickets = (codigoVersion, descripcionVersion) => {
        router.push(`/soporte/versiones/tickets?codigoVersion=${codigoVersion}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    return (
        <tr key={`${version.codigo}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{version.descripcion}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{cantTickets}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    <button className="mt-2 px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#185FA1" }}
                            onClick={() => handleVerTickets(version.codigo, version.descripcion)}
                    >
                        Ver tickets
                    </button>
                </div>
            </td>
        </tr>
    )
}

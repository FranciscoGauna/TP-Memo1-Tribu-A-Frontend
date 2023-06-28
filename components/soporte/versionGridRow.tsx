import {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface Version {
    codigo : number;
    descripcion : string;
    codigoProducto : number;
}

export default function VersionGridRow({ version , nombreProducto }: {
    version: Version;
    nombreProducto: string;
}) {
    const [cantTickets, setCantTickets] = useState(0);
    const router = useRouter();

    useEffect(() => {
        fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/versiones/${version.codigo}/tickets`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const ticketsCount = data.length;
                setCantTickets(ticketsCount);
            })
            .catch((error) => {
                console.error("Error fetching tickets:", error);
                setCantTickets(0); // Set an empty list on error
            });
    }, [version.codigo]);
    const handleVerTickets = (codigoVersion : number, descripcionVersion : string) => {
        router.push(`/soporte/versiones/tickets?codigoVersion=${codigoVersion}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    return (
        <div key={`${version.codigo}`} className="flex items-center justify-between">
            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center font-bold">{version.descripcion}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="flex items-center">Cantidad de tickets: {cantTickets}</div>
            </div>

            <div className="px-6 py-4 whitespace-no-wrap border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    <button className="px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#248CED" }}
                            onClick={() => handleVerTickets(version.codigo, version.descripcion)}
                    >
                        Ver tickets
                    </button>
                </div>
            </div>
        </div>
    )
}

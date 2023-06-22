import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TicketGridRow from "@/components/ticketGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tickets() {
    const [list, setList] = useState([])
    const router = useRouter();
    const { codigoVersion } = router.query;
    const { nombreProducto } = router.query;
    const { descripcionVersion } = router.query;

    useEffect(() => {
        if (codigoVersion) {
            fetch(`http://localhost:8080/versiones/${codigoVersion}/tickets`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setList(data)
                })
        }
    }, [codigoVersion]);

    function handleNuevoTicket() {

    }

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-5">
                    <h1 className="text-4xl font-bold decoration-gray-400 mb-10">Soporte</h1>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold decoration-gray-400 mb-2">{nombreProducto} {descripcionVersion}</h2>
                        <button className="mt-2 px-4 py-2 text-white rounded-md flex justify-end"
                                style={{ backgroundColor: "#185FA1" }}
                                onClick={() => handleNuevoTicket()}
                        >
                            Nuevo ticket
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID Ticket" />
                                    <HeaderItem title="Prioridad" />
                                    <HeaderItem title="Cliente" />
                                    <HeaderItem title="Tiempo restante" />
                                    <HeaderItem title="Ver Ticket" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((ticket) => (
                                    <TicketGridRow key={ticket.codigo} ticket={ticket} nombreProducto={nombreProducto} descripcionVersion={descripcionVersion} />
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

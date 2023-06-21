import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTimeRemaining} from "@/utils/timeUtils";
function buscarCliente(list, idCliente){
    const cliente = list.find((cliente) => cliente.id == idCliente);
    return cliente ? cliente.razonSocial : "Desconocido";
}
export default function TicketGridRow({ ticket , nombreProducto , descripcionVersion }) {
    const [list, setList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/clientes")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeRemaining = getTimeRemaining(ticket.fechaLimite);
            document.getElementById('timeRemaining').innerHTML = timeRemaining;
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleVerTicket = (idTicket) => {
        router.push(`/soporte/versiones/tickets/ticket?idTicket=${idTicket}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    return (
        <tr key={`${ticket.codigo}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{ticket.codigo}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{ticket.prioridad}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{buscarCliente(list, ticket.cliente)}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <span id="timeRemaining" style={{ color: 'inherit' }} />
                </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    <button className="mt-2 px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#185FA1" }}
                            onClick={() => handleVerTicket(ticket.codigo)}
                    >
                        Ver ticket
                    </button>
                </div>
            </td>
        </tr>
    )
}

import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTimeRemaining} from "@/utils/timeUtils";
import {Cliente, Ticket} from "@/components/types";

function buscarCliente(list : Cliente[], idCliente: number){
    const cliente = list.find((cliente) => cliente.id == idCliente);
    return cliente ? cliente.razonSocial : "Desconocido";
}
export default function TicketGridRow({ ticket , nombreProducto , descripcionVersion }: {
    ticket: Ticket;
    nombreProducto: string;
    descripcionVersion: string;
}) {
    const [list, setList] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(ticket.fechaLimite));
    const router = useRouter();

    useEffect(() => {
        fetch("https://tp-memo1-tribu-a-soporte.onrender.com/clientes")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remainingTime = getTimeRemaining(ticket.fechaLimite);
            setTimeRemaining(remainingTime);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [ticket.fechaLimite]);

    const handleVerTicket = (idTicket : string) => {
        router.push(`/soporte/versiones/tickets/ticket?idTicket=${idTicket}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    return (
        <tr key={`${ticket.codigo}`}>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{ticket.codigo}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{ticket.titulo}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{ticket.prioridad}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{buscarCliente(list, ticket.cliente)}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  <span className="font-bold" style={{ color: timeRemaining.textColor }}>
                    {timeRemaining.formattedTime}
                  </span>
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

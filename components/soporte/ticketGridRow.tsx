import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTimeRemaining} from "@/utils/timeUtils";
import {Cliente, Ticket} from "../../types/model";

function buscarCliente(list : Cliente[], idCliente: number){
    const cliente = list.find((cliente) => cliente.id == idCliente);
    return cliente ? cliente.razonSocial : "Desconocido";
}
export default function TicketGridRow({ ticket, nombreProducto, descripcionVersion }: {
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

    const handleVerTicket = (idTicket: string) => {
        router.push(`/soporte/versiones/tickets/ticket?idTicket=${idTicket}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    };

    const tiempoRestanteStyle = {
        backgroundColor: (ticket?.estado === "RESUELTO" ? "#1CB72C" : (timeRemaining.isExpired ? "#D73838" : "#185FA1")),
        color: timeRemaining.isExpired ? "#FFFFFF" : "#FFFFFF",
    };

    return (
        <div key={`${ticket.codigo}`} className="flex items-center justify-between">
            <div className="flex py-6">
                <div className="flex flex-col">
                    <div className="flex flex-col mb-2">
                        <div className="flex px-6 whitespace-no-wrap border-gray-200 mb-2 text-sm">
                            <label>ID:&nbsp;</label>
                            <span>{ticket.codigo}</span>
                        </div>
                        <div className="px-6 whitespace-no-wrap border-gray-200">
                            <span className="font-bold text-xl">{ticket.titulo}</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="px-6 whitespace-no-wrap border-gray-200">
                            <label className="font-bold">Prioridad: </label>
                            <span>{ticket.prioridad}</span>
                        </div>
                        <div className="px-6 whitespace-no-wrap border-gray-200">
                            <label className="font-bold">Cliente: </label>
                            <span>{buscarCliente(list, ticket.cliente)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex items-center px-6 py-5 whitespace-no-wrap border-gray-200">
                    <span className="font-bold">Tiempo restante:&nbsp;&nbsp;</span>
                    {ticket?.estado === "RESUELTO" ? (
                        <span className="flex rounded-full px-4 py-1 font-bold whitespace-nowrap" style={tiempoRestanteStyle}>
                            RESUELTO
                        </span>
                    ) : (
                        <span className="flex rounded-full px-4 py-1 font-bold whitespace-nowrap" style={tiempoRestanteStyle}>
                             {timeRemaining.formattedTime}
                        </span>
                    )}
                </div>
                <div className="px-6 whitespace-no-wrap border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">
                        <button
                            className="px-4 py-2 text-white rounded-md"
                            style={{ backgroundColor: "#248CED" }}
                            onClick={() => handleVerTicket(ticket.codigo)}
                        >
                            Ver ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getTimeRemaining} from "@/utils/timeUtils";
import {Ticket, Cliente} from "@/components/types";
function buscarCliente(list : Cliente[], idCliente: number){
    const cliente = list.find((cliente) => cliente.id == idCliente);
    return cliente ? cliente.razonSocial : "Desconocido";
}
function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}
export default function Ticket() {
    const [ticket, setTicket] = useState<Ticket | null>();
    const [list, setList] = useState<Cliente[]>([]);
    const [remainingTime, setTimeRemaining] = useState({
        formattedTime: "Cargando...",
        textColor: "inherit",
    });
    const router = useRouter();
    const { idTicket } = router.query;
    const { nombreProducto } = router.query;
    const { descripcionVersion } = router.query;

    useEffect(() => {
        if(idTicket){
            fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/tickets/${idTicket}`)
                .then((res) => res.json())
                .then((data) => {
                    setTicket(data);
                });
        }
    }, [idTicket]);

    useEffect(() => {
        fetch('https://tp-memo1-tribu-a-soporte.onrender.com/clientes')
            .then((res) => res.json())
            .then((data) => {
                setList(data);
            });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (ticket?.fechaLimite) {
                const remainingTime = getTimeRemaining(ticket.fechaLimite);
                setTimeRemaining(remainingTime);;
                const element = document.getElementById('timeRemaining');
                if (element) {
                    element.style.backgroundColor = remainingTime.textColor.includes('red')
                        ? "lightpink"
                        : "inherit";
                }
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [ticket]);

    function handleNuevaTarea() {

    }

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-5">
                    <h1 className="text-4xl font-bold decoration-gray-400 mb-10">Soporte</h1>
                    <h2 className="text-2xl font-bold decoration-gray-400 mb-2">{nombreProducto} {descripcionVersion}</h2>
                </div>
                <div className="rounded-lg p-6 shadow-md space-y-4" style={{ backgroundColor: "#F5F5F5" }}>
                    <div>
                        <h3 className="text-xl font-bold decoration-gray-400 mb-5">Ticket {ticket?.codigo} - {ticket?.titulo}</h3>
                        <div className="flex space-x-4">
                            <div>
                                <span className="font-bold">Estado:</span> <span className="rounded-full bg-gray-300 px-2 py-1">{ticket?.estado}</span>
                            </div>
                            <div>
                                <span className="font-bold">Severidad:</span> <span className="rounded-full bg-gray-300 px-2 py-1">{ticket?.severidad}</span>
                            </div>
                            <div>
                                <span className="font-bold">Prioridad:</span> <span className="rounded-full bg-gray-300 px-2 py-1">{ticket?.prioridad}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <span className="font-bold">Cliente: </span>{buscarCliente(list, ticket?.cliente ?? 0)}
                        </div>
                        <div>
                            <span className="font-bold">Fecha de creación: </span>
                            {ticket?.fechaCreacion ? new Date(ticket.fechaCreacion).toLocaleString() : ""}
                        </div>
                        <div>
                            <span className="font-bold">Fecha límite: </span>
                            {ticket?.fechaLimite ? new Date(ticket.fechaLimite).toLocaleString() : ""}
                        </div>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <div className={"flex flex-grow"}>
                            <div>
                                <div className="text-xl flex items-center justify-center mr-5 border-2 rounded-full px-4 py-4">
                                    Tiempo restante:&nbsp;
                                    <span className="rounded-full bg-gray-300 px-4 py-1 font-bold whitespace-nowrap" style={{ color: remainingTime.textColor }}>
                                    {remainingTime.formattedTime}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-4 items-center flex-grow">
                                <span className="font-bold">Descripción: </span>
                                <div className="border rounded-lg p-5 flex-grow overflow-auto" style={{ backgroundColor: "#FFFFFF", margin: "0 2rem"}}>
                                    {ticket?.description}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="mt-2 px-4 py-2 text-white rounded-md"
                                    style={{ backgroundColor: "#185FA1" }}
                                    onClick={() => handleNuevaTarea()}
                            >
                                Nueva tarea
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                                <table className="min-w-full">
                                    <thead>
                                    <tr>
                                        <HeaderItem title="Tarea" />
                                        <HeaderItem title="Estado" />
                                        <HeaderItem title="Recurso asociado" />
                                        <HeaderItem title="Ver tarea" />
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

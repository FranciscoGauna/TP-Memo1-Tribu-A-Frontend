import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getTimeRemaining} from "@/utils/timeUtils";
import {Ticket, Cliente, Task} from "@/types/model";
import ModalDeleteTicket from "@/components/soporte/ModalDeleteTicket";
import ModalUpdateTicket from "@/components/soporte/ModalUpdateTicket";
import ModalCreateTask from "@/components/soporte/ModalCreateTask";
import TareaGridRow from "@/components/soporte/tareaGridRow";
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
    const [timeRemaining, setTimeRemaining] = useState({
        formattedTime: "Cargando...",
        isExpired: false
    });
    const router = useRouter();
    const { idTicket } = router.query;
    const { nombreProducto } = router.query as { nombreProducto: string };
    const { descripcionVersion } = router.query as { descripcionVersion: string };
    const [ModalDeleteTicketOpen, setModalDeleteTicketOpen] : [boolean, Function] = useState(false);
    const [ModalUpdateTicketOpen, setModalUpdateTicketOpen] : [boolean, Function] = useState(false);
    const [ModalCreateTaskOpen, setModalCreateTaskOpen] : [boolean, Function] = useState(false);
    const [tareas, setTareas] = useState<Task[]>([]);

    const reloadTicket = () => {
        fetch('https://tp-memo1-tribu-a-soporte.onrender.com/clientes')
            .then((res) => res.json())
            .then((data) => {
                setList(data);
            });

        if (idTicket) {
            fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/tickets/${idTicket}`)
                .then((res) => res.json())
                .then((data) => {
                    setTicket(data);
                    if (data) {
                        setTareas([]);
                        const fetchTasks = data.tareas.map((tarea : { proyecto : string, id: string }) =>
                            fetch(`https://projects-backend-service.onrender.com/projects/${tarea.proyecto}/tasks/${tarea.id}`)
                                .then((res) => {
                                    if (res.status === 400) {
                                        return null;
                                    } else {
                                        return res.json();
                                    }
                                })
                                .then((data) => (data ? data.task : null))
                                .catch((error) => {
                                    console.error("Error fetching Tareas:", error);
                                    return null;
                                })
                        );

                        Promise.all(fetchTasks)
                            .then((tasks) => {
                                const filteredTasks = tasks.filter((task) => task !== null);
                                setTareas(filteredTasks);
                            })
                            .catch((error) => {
                                console.error("Error fetching tasks:", error);
                            });
                    }
                });
        }
    };
    
    useEffect(reloadTicket, [idTicket]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (ticket?.fechaLimite) {
                const remainingTime = getTimeRemaining(ticket.fechaLimite);
                setTimeRemaining(remainingTime);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [ticket]);

    const tiempoRestanteStyle = {
        backgroundColor: (ticket?.estado === "RESUELTO" ? "#1CB72C" : (timeRemaining.isExpired ? "#D73838" : "#185FA1")),
        color: timeRemaining.isExpired ? "#FFFFFF" : "#FFFFFF",
    };

    const ModalDeleteTicketHandle = (flag: boolean) => {
        setModalDeleteTicketOpen(flag);
    }

    const ModalUpdateTicketHandle = (flag: boolean) => {
        if (!flag)
            reloadTicket();
        setModalUpdateTicketOpen(flag);
    }

    const ModalCreateTaskHandle = (flag: boolean) => {
        if (!flag)
            reloadTicket();
        setModalCreateTaskOpen(flag);
    }

    function handleCerrarTicket() {
        if(ticket){
            let formData = {
                codigo: ticket.codigo,
                titulo: ticket.titulo,
                severidad: ticket.severidad,
                prioridad: ticket.prioridad,
                estado: "RESUELTO",
                description: ticket.description,
                fechaLimite: ticket.fechaLimite,
                fechaCreacion: ticket.fechaCreacion,
                cliente: ticket.cliente,
                versionProducto: ticket.versionProducto,
            };
            fetch('https://tp-memo1-tribu-a-soporte.onrender.com/tickets/' + ticket.codigo, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log("UPDATE", data);
                reloadTicket();
            }).catch((error) => {
                console.error(error);
                alert("Fallo al editar Ticket");
            });
        }
    }

    const getProjectId = (id: string): string | undefined => {
        if(ticket){
            const tarea = ticket.tareas.find(t => t.id === id);
            return tarea?.proyecto;
        }
    };

    return (
        <>
            <div style={{ backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90 }}>
                <div>
                    <h1 className="text-3xl decoration-gray-400 mb-10">Soporte - {nombreProducto} {descripcionVersion}</h1>
                </div>
                <div className="p-6 shadow-md space-y-4" style={{ backgroundColor: "#0F3A61", color: "#FFFFFF"}}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <div className="flex flex-col mb-5">
                                <span className="flex flex-row mb-3 text-sm">ID:&nbsp;{ticket?.codigo}</span>
                                <h3 className="flex flex-row mr-10">
                                    <span className="text-xl font-bold decoration-gray-400">Ticket &quot;{ticket?.titulo}&quot;</span>
                                </h3>
                            </div>
                            <div className="flex space-x-4">
                                <div>
                                    <span className="font-bold">Estado:</span> <span className="rounded-full px-2 py-1" style={{ backgroundColor: "#185FA1"}}>{ticket?.estado}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Severidad:</span> <span className="rounded-full px-2 py-1" style={{ backgroundColor: "#185FA1"}}>{ticket?.severidad}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Prioridad:</span> <span className="rounded-full px-2 py-1" style={{ backgroundColor: "#185FA1"}}>{ticket?.prioridad}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row ml-5 items-center" style={{ alignSelf: "flex-start" }}>
                            {!(ticket?.estado === "RESUELTO") && (
                                <>
                                    <button
                                        className="px-5 py-3 mr-3 text-white rounded-md"
                                        style={{ backgroundColor: "#1CB72C" }}
                                        onClick={() => handleCerrarTicket()}
                                    >
                                        Cerrar ticket
                                    </button>
                                    <button
                                        className="px-5 py-3 mr-3 text-white rounded-md"
                                        style={{ backgroundColor: "#248CED" }}
                                        onClick={() => setModalUpdateTicketOpen(true)}
                                    >
                                        Editar ticket
                                    </button>
                                </>
                            )}
                            <button
                                className="px-5 py-3 text-white rounded-md"
                                style={{ backgroundColor: "#D73838" }}
                                onClick={() => setModalDeleteTicketOpen(true)}
                            >
                                Borrar ticket
                            </button>
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
                                    <span className="flex justify-center px-2">Tiempo restante:&nbsp;</span>
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
                            </div>
                            <div className="flex space-x-4 items-center flex-grow">
                                <span className="font-bold">Descripción: </span>
                                <div className="border rounded-lg p-5 flex-grow overflow-auto" style={{ backgroundColor: "#FFFFFF", color: "#000000", margin: "0 2rem"}}>
                                    {ticket?.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl decoration-gray-400 mt-5">Tareas asociadas</h2>
                <div style={{ display: "flex", backgroundColor: "#185FA1", color: "#FFFFFF", justifyContent: "space-between", paddingLeft: 30, paddingRight: 30, height: 100, alignItems: "center", marginBottom: 20 , marginTop : 20}}>
                    <div style={{ fontSize: 20 }}>Nueva Tarea</div>
                    <button
                        className="flex justify-center items-center"
                        style={{ borderRadius: 35, backgroundColor: "#248CED", height: 70, width: 70, fontSize: 40 }}
                        onClick={() => setModalCreateTaskOpen(true)}
                    ><span className="mb-1.5">+</span></button>
                </div>
                {tareas.map((tarea) => (
                    <div key={tarea.puid} style={{ backgroundColor: "#0F3A61", color: "#FFFFFF", marginBottom: 20 }}>
                        <TareaGridRow tarea={tarea} proyecto={getProjectId(tarea.puid) || ""} />
                    </div>
                ))}
            </div>
            {ticket && (
                <ModalDeleteTicket
                    modalOpen={ModalDeleteTicketOpen}
                    setModalOpen={ModalDeleteTicketHandle}
                    ticket={ticket}
                    nombreProducto={nombreProducto || ""}
                    descripcionVersion={descripcionVersion || ""}
                />
            )}
            {ticket && (
                <ModalUpdateTicket
                    modalOpen={ModalUpdateTicketOpen}
                    setModalOpen={ModalUpdateTicketHandle}
                    ticket={ticket}
                />
            )}
            {ticket && (
                <ModalCreateTask
                    modalOpen={ModalCreateTaskOpen}
                    setModalOpen={ModalCreateTaskHandle}
                    ticket={ticket}
                />
            )}
        </>
    );
}

import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TicketGridRow from "@/components/soporte/ticketGridRow";

import {Ticket} from "@/components/types";
import VersionGridRow from "@/components/soporte/versionGridRow";
import ModalCreateTicket from "@/components/soporte/ModalCreateTicket";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tickets() {
    const [list, setList] = useState<Ticket[]>([])
    const router = useRouter();
    const { codigoVersion } = router.query;
    const nombreProducto = router.query.nombreProducto as string || '';
    const descripcionVersion = router.query.descripcionVersion as string || '';
    const [modalCreateTicketOpen, setModalCreateTicketOpen] : [boolean, Function] = useState(false);

    const reloadTickets = () => {
        if (codigoVersion) {
            fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/versiones/${codigoVersion}/tickets`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setList(data)
                })
                .catch((error) => {
                console.error("Error fetching tickets:", error);
                setList([]);
            });
        }
    };

    useEffect(reloadTickets, [codigoVersion]);

    const ModalCreateTicketHandle = (flag: boolean) => {
        if (!flag)
            reloadTickets();
        setModalCreateTicketOpen(flag);
    }

    return (
        <>
            <div style={{ backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90 }}>
                <div>
                    <h1 className="text-3xl decoration-gray-400 mb-10">Soporte - {nombreProducto} {descripcionVersion}</h1>
                    <h2 className="text-xl decoration-gray-400 mb-5">Tickets</h2>
                </div>
                <div style={{ display: "flex", backgroundColor: "#185FA1", color: "#FFFFFF", justifyContent: "space-between", paddingLeft: 30, paddingRight: 30, height: 100, alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 20 }}>Crear Ticket</div>
                    <button
                        className="flex justify-center items-center"
                        style={{ borderRadius: 35, backgroundColor: "#248CED", height: 70, width: 70, fontSize: 40 }}
                        onClick={() => setModalCreateTicketOpen(true)}
                    ><span className="mb-1.5">+</span></button>
                </div>
                {list.map((ticket) => (
                    <div key={ticket.codigo} style={{ backgroundColor: "#0F3A61", color: "#FFFFFF", marginBottom: 20 }}>
                        <TicketGridRow key={ticket.codigo} ticket={ticket} nombreProducto={nombreProducto} descripcionVersion={descripcionVersion} />
                    </div>
                ))}
                <ModalCreateTicket modalOpen={modalCreateTicketOpen} setModalOpen={ModalCreateTicketHandle} idVersion={parseInt(codigoVersion as string)}/>
            </div>
        </>
    )
}

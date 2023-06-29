import {useEffect, useState} from "react";
import VersionGridRow from "@/components/soporte/versionGridRow";
import {useRouter} from "next/router";

import {Version} from "@/types/model";
function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Versiones() {
    const [list, setList] = useState<Version[]>([])
    const router = useRouter();
    const { codigoProducto } = router.query;
    const nombreProducto = router.query.nombreProducto as string || '';

    useEffect(() => {
        if (codigoProducto) {
            fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/productos/${codigoProducto}/versiones`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setList(data)
                })
        }
    }, [codigoProducto]);

    return (
        <>
            <div style={{backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90}}>
                <div>
                    <h1 className="text-3xl decoration-gray-400 mb-10">Soporte - {nombreProducto}</h1>
                    <h2 className="text-xl decoration-gray-400 mb-5">Versiones</h2>
                </div>
                {list.map((version) => (
                    <div key={version.codigo} style={{backgroundColor: "#0F3A61", color: "#FFFFFF", marginBottom: 30, height: 100, padding: 20}}>
                        <VersionGridRow key={version.codigo} version={version} nombreProducto={nombreProducto} />
                    </div>
                ))}
            </div>
        </>
    )
}

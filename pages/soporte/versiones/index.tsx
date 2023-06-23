import {useEffect, useState} from "react";
import VersionGridRow from "@/components/versionGridRow";
import {useRouter} from "next/router";

import {Version} from "@/components/types";
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
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-5">
                    <h1 className="text-4xl font-bold decoration-gray-400 mb-10">Soporte</h1>
                    <h2 className="text-2xl font-bold decoration-gray-400 mb-2">{nombreProducto}</h2>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Version" />
                                    <HeaderItem title="Tickets abiertos" />
                                    <HeaderItem title="Ver tickets" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((version) => (
                                    <VersionGridRow key={version.codigo} version={version} nombreProducto={nombreProducto} />
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

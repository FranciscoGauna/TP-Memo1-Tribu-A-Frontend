import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {Producto} from "@/components/types";
export default function Soporte() {
    const [list, setList] = useState<Producto[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("https://tp-memo1-tribu-a-soporte.onrender.com/productos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, []);

    const handleVerVersiones = (codigoProducto : number, nombreProducto : string) => {
        router.push(`/soporte/versiones?codigoProducto=${codigoProducto}&nombreProducto=${nombreProducto}`);
    };

    return (
        <>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-5">
                    <h1 className="text-4xl font-bold decoration-gray-400 mb-10">Soporte</h1>
                    <h2 className="text-2xl font-bold decoration-gray-400 mb-2">Productos</h2>
                </div>
                <div className="grid grid-cols-3 gap-10 px-2">
                    {list.map((producto) => (
                        <div
                            key={producto.codigo}
                            className="rounded-lg p-6 shadow-md flex flex-col items-center justify-center "
                            style={{ backgroundColor: "#EEEEEE" }}
                        >
                            <h2 className="text-2xl text-center mt-4 mb-2">{producto.titulo}</h2>
                            <button
                                className="mt-4 mb-2 px-4 py-2 text-white rounded-md"
                                style={{ backgroundColor: "#185FA1" }}
                                onClick={() => handleVerVersiones(producto.codigo, producto.titulo)}
                            >
                                Ver tickets
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

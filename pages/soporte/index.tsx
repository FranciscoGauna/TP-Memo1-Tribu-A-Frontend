import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Producto } from "../../types/model";
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
            <div style={{backgroundColor: "#DDDDDC", display: "flex", flexDirection: "column", height: "100%", padding: 90}}>
                <div className="mb-5">
                    <h1 className="text-3xl decoration-gray-400 mb-2">Productos</h1>
                </div>
                <div className="grid grid-cols-3 gap-10 px-2">
                    {list.map((producto) => (
                        <div
                            key={producto.codigo}
                            className="p-6 shadow-md flex flex-col items-center justify-center"
                            style={{ backgroundColor: "#0F3A61" }}
                        >
                            <h2 className="text-2xl text-center mt-4 mb-2 text-white">{producto.titulo}</h2>
                            <button
                                className="mt-4 mb-2 px-4 py-2 text-white rounded-md"
                                style={{ backgroundColor: "#248CED" }}
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

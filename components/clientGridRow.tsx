import { ClientGridProps } from "../types/components";

export default function ClientGridRow({ cliente }: ClientGridProps) {

    return (
        <tr key={`${cliente['razon_social']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{cliente.id}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{cliente['razon_social']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">{cliente.cuit}</div>
            </td>
        </tr>
    )
}

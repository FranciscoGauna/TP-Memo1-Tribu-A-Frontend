import { ModalDeleteTicketProps } from "../types"
import {useRouter} from "next/router";

export default function ModalDeleteTicket({ modalOpen, setModalOpen, ticket, nombreProducto, descripcionVersion}: ModalDeleteTicketProps) {
  const router = useRouter();
  const deleteTicket = () => {
    fetch("https://tp-memo1-tribu-a-soporte.onrender.com/tickets/" + ticket.codigo, {
        method: 'DELETE'
    }).then((res) => {
        return res;
    }).then((data) => {
        console.log("DELETE",data);
        setModalOpen(false);
        router.push(`/soporte/versiones/tickets?codigoVersion=${ticket.versionProducto}&nombreProducto=${nombreProducto}&descripcionVersion=${descripcionVersion}`);
    }).catch((error) => {
        setModalOpen(false);
        console.error(error);
        alert("Fallo al borrar Ticket");
    });
  }

  return (
    <div
      id="borrarTicketModal"
      tabIndex={-1}
      aria-hidden={!modalOpen}
      className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Borrar Ticket</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => {
                setModalOpen(false)
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="mb-5 mt-2">
            ¿Desea eliminar el ticket #{ticket.codigo} - &quot;{ticket.titulo}&quot;?
          </div>
		  {/* Modal footer */}
		  <div style={{display: "flex", justifyContent:"flex-end"}}>
			<button 
				style={{backgroundColor: "#0F3A61", color: "#FFFFFF", borderRadius: 5, marginRight: 10, width: 100, height: 40}}
				onClick={() => {setModalOpen(false)}}
			>Cancelar</button>
			<button
				style={{backgroundColor: "#0F3A61", color: "#FFFFFF", borderRadius: 5, width: 100, height: 40}}
        onClick={() => {deleteTicket()}}
			>Eliminar</button>
		  </div>
        </div>
      </div>
    </div>
  )
}
import { Cliente, Project, Task, Usuario, Ticket } from "./model"


export interface ClientGridProps {
  cliente: Cliente
}

export interface UserGridProps {
  usuario: Usuario
}

export interface ISidebarItem {
  href: string
  title: string
  children?: ISidebarItem[]
}

export interface ModalProps {
  modalOpen: boolean
  setModalOpen: (x: boolean) => void
  list: Usuario[]
}

export interface ModalCreateProjectProps {
  modalOpen: boolean
  setModalOpen: Function
}

export interface ModalUpdateProjectProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
  callback: { function: Function }
}

export interface ModalDeleteProjectProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
}


export interface ModalCreateTaskProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
}

export interface ModalUpdateTaskProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
  task: Task
  callback: { function: Function }
}

export interface ModalDeleteTaskProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
  task: Task
}


// Soporte stuff
export interface ModalCreateTaskTicketProps {
	modalOpen: boolean
	setModalOpen: Function
	ticket: Ticket
}

export interface ModalCreateTicketProps {
	modalOpen: boolean
	setModalOpen: Function
	idVersion: number
}

export interface ModalUpdateTicketProps {
	modalOpen: boolean
	setModalOpen: Function
	ticket: Ticket
}

export interface ModalDeleteTicketProps {
	modalOpen: boolean
	setModalOpen: Function
	ticket: Ticket
	nombreProducto : string
	descripcionVersion :string
}

import { Cliente, Project, Usuario } from "./model"


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

export interface ModalCreateProps {
  modalOpen: boolean
  setModalOpen: Function
}

export interface ModalUpdateProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
  setProject: Function
}

export interface ModalDeleteProps {
  modalOpen: boolean
  setModalOpen: Function
  project: Project
}
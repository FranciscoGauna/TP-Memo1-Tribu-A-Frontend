export interface ISidebarItem {
  href: string
  title: string
  children?: ISidebarItem[]
}


export interface Producto {
  codigo: number;
  titulo: string;
}

export interface Version {
  codigo: number;
  descripcion: string;
  codigoProducto: number;
}

export interface Ticket {
  codigo: string;
  titulo: string;
  severidad: "S1" | "S2" | "S3" | "S4";
  prioridad: "ALTA" | "MEDIA" | "BAJA";
  estado: "PENDIENTE" | "EMPEZADO" | "RESUELTO";
  description: string;
  fechaLimite: string;
  fechaCreacion: string;
  cliente: number;
  versionProducto: number;
}

export interface Cliente {
  id: number;
  razonSocial: string;
  cuit: number;
}

export interface Task {
  end_date_est: string;
  hours_est: string;
  id: string;
  name: string;
  start_date: string;
  state: string;
}

export interface Project {
  uid: string;
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  project_leader: string;
  development_team: string[];
  tasks: Task[];
}

export interface Projects {
  projects: Project[];
}

export interface ModalCreateTicketProps {
  modalOpen: boolean
  setModalOpen: Function
  idVersion: number
}export interface ModalUpdateTicketProps {
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
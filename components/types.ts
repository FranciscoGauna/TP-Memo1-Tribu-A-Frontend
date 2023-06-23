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
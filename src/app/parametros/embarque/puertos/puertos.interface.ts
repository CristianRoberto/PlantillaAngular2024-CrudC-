import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IPuerto {
  codigoPuerto: string;
  descripcionPuerto: string;
  codigoPais: string;
  codigoIntPuerto: string;
  estado?: string;
  nombreMaquina?: string;
  nombreAplicativo?: string;
  aplicativoId?: string;
  estacion?: string;
  fechaActualizacion?: string;
  fechaCreacion?: string;
  horaCreacion?: string;
  horaActualizacion?: string;
  menuId?: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
}

export interface IPuertoTable extends IPuerto, IRowTableAttributes {}

export type IPuertos = IPuerto[];
export type IPuertosTable = IPuertoTable[];

export interface IPuertoResponse {
  totalRegistros: number;
  puertoTypes: IPuertos;
}

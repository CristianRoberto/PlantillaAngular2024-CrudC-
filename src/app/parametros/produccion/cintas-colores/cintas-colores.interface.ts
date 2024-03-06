import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ICintasColores {
  fechaIngreso: string,
  idMenu: string,
  usuarioCreador: string,
  codigoColores: string,
  descripcionColor: string,
  descripcion:string,
  secuencia:number
}
export interface ICintasColoresTable 
extends ICintasColores, IRowTableAttributes {}

export type ICintaColores = ICintasColores[];
export type ICintaColoresTable = ICintasColoresTable[];

export interface ICintaColoresResponse {
  totalRegistros: number;
  cintaColorType: ICintaColores;
}

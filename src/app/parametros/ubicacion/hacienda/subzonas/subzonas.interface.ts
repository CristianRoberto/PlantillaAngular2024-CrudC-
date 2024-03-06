import { IRowTableAttributes } from "src/app/component/table/table.interface";
export interface ISubzona {
  codigoZona: string;
  descripcion: string;
  ubicacion: string;
  subZonaCodigo: string;
}
export interface ISubzonaTable extends ISubzona, IRowTableAttributes {}

export type ISubzonas = ISubzona[];
export type ISubzonasTable = ISubzonaTable[];

export interface ISubzonaResponse {
  totalRegistros: number;
  subZonaTypes: ISubzonas;
}

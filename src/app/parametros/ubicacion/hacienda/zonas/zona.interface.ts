import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IZona {
  codigo: string;
  descripcion: string;
  ubicacion: string;
  numeroDeZonas: number;
}
export interface IZonaTable extends IZona, IRowTableAttributes {}

export type IZonas = IZona[];
export type IZonasTable = IZonaTable[];

export interface IZonaResponse {
  totalRegistros: number;
  zonaTypes: IZonas;
}
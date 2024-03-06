import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IHitoMuestreo {
  codigo?: number;
  codigoHacienda?: string;
  descripcionHacienda: string;
  codigoLote?: number;
  descripcionLote: string;
  codigoSector?: number;
  numeroHito: number;
  latitud_GPS: number;
  longitud_GPS: number;
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

export interface IHitoMuestreoTable
  extends IHitoMuestreo,
    IRowTableAttributes {}

export type IHitoMuestreos = IHitoMuestreo[];
export type IHitoMuestreosTable = IHitoMuestreoTable[];

export interface IHitoMuestreoResponse {
  totalRegistros: number;
  hitosMuestreoTypes: IHitoMuestreos;
}

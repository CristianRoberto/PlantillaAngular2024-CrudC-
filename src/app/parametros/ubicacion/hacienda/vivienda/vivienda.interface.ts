import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IVivienda {
  codigoHacienda: string;
  codigoSector: string;
  codigoTipoVivienda: number;
  codigoVivienda: string;
  numeroPersonas: string;
  responsable: string;
  aplicativoId: string;
  estacion: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  horaActualizacion: string;
  menuId: string;
  usuarioCreacion: string;
  usuarioActualizacion: string;
  descripcionSector?: string;
  nombreHacienda?: string;
  descripcionTipoVivienda?: string;
}

export interface IViviendaTable extends IVivienda, IRowTableAttributes { }

export type IViviendas = IVivienda[];
export type IViviendasTable = IViviendaTable[];

export interface IViviendaResponse {
  totalRegistros: number;
  viviendaTypes: IViviendas;
}

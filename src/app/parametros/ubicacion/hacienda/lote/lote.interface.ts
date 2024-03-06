import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ILote {
  codigoHacienda: string,
  codigoSector: string,
  codigoLote: string,
  codigoEmpacadora: string,
  codigoProducto: string,
  descripcionLote: string,
  hasTotales: string,
  hasCultivo: string,
  hasEnfundadas: string,
  hasProduccion: string,
  numeroRenovaciones: string,
  codigoLocalidad: string,
  tipoPlantacion: string,
  loteActivo: string,
  aplicativoId: string,
  estacion:string,
  fechaActualizacion: string,
  fechaCreacion: string,
  horaCreacion: string,
  horaActualizacion: string,
  menuId: string,
  usuarioCreacion: string,
  usuarioActualizacion: string,
  fechaSiembra: string,

}

export interface ILoteTable extends ILote, IRowTableAttributes { }

export type ILotes = ILote[];
export type ILotesTable = ILoteTable[];

export interface ILoteResponse {
  totalRegistros: number;
  loteType: ILotes;
}

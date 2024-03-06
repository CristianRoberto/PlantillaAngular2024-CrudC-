import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ICostoMuestreo {
  codigoHacienda: string;
  tipoMuestreo: string;
  costoAnalisis: number;
  costoManoObra: number;
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

export interface ICostoMuestreoTable
  extends ICostoMuestreo,
    IRowTableAttributes {}

export type ICostoMuestreos = ICostoMuestreo[];
export type ICostoMuestreosTable = ICostoMuestreoTable[];

export interface ICostoMuestreoResponse {
  totalRegistros: number;
  muestreoTypes: ICostoMuestreos;
}

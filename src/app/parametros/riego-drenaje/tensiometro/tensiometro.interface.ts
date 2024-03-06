import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITensiometro {
  codigoHacienda: string;
  hacienda: string
  codigoSector: number;
  sector: string;
  codigoLote: number;
  lote: string;
  numeroEstacion: number;
  profundidad: number;
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

export interface ITensiometroTable extends ITensiometro, IRowTableAttributes {}

export type ITensiometros = ITensiometro[];
export type ITensiometrosTable = ITensiometroTable[];

export interface ITensiometroResponse {
  totalRegistros: number;
  tensiometroTypes: ITensiometros;
}

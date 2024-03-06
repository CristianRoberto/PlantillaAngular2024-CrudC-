import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITara {
  codigoHacienda: string;
  codigoEmpacadora: string;
  taraRacimo: number;
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

export interface ITaraTable extends ITara, IRowTableAttributes {}

export type ITaras = ITara[];
export type ITarasTable = ITaraTable[];

export interface ITaraResponse {
  totalRegistros: number;
  taraTypes: ITaras;
}

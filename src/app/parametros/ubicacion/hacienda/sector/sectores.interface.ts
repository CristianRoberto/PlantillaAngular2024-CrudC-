import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ISector {
  codigoHacienda: string;
  codigoSector?: string;
  descripcion?: string;
  jefeSector?: string;
  coordenadaEste?: string;
  coordenadaNorte?: string;
  coordenadaOeste?: string;
  coordenadaSur?: string;
}

export interface ISectorTable extends ISector, IRowTableAttributes { }

export type ISectores = ISector[];
export type ISectoresTable = ISectorTable[];

export interface ISectorResponse {
  totalRegistros: number;
  sectorTypes: ISectores;
}

import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ILaborRealizada {
  id: string;
  labor: string;
  lote: string;
  procesado: number;
  total_procesado: number;
  id_lote: number;
  id_labor: number;
}
export interface ILaborRealizadaTable
  extends ILaborRealizada,
    IRowTableAttributes {}

export type ILaboresRealizadas = ILaborRealizada[];
export type ILaboresRealizadasTable = ILaborRealizadaTable[];

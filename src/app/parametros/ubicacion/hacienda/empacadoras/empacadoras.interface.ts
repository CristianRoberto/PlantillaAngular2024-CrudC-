import { IRowTableAttributes } from "src/app/component/table/table.interface";
export interface IEmpacadora {
  codigoHacienda: string;
  codigoEmpacadora: string;
  nombreEmpacadora: string;
  // estadoEmpacadora: string;
}
export interface IEmpacadoraTable extends IEmpacadora, IRowTableAttributes {}

export type IEmpacadoras = IEmpacadora[];
export type IEmpacadorasTable = IEmpacadoraTable[];

export interface IEmpacadoraResponse {
  totalRegistros: number;
  empacadoraTypes: IEmpacadoras;
}

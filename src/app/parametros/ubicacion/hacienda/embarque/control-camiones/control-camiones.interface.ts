import { IRowTableAttributes } from "src/app/component/table/table.interface";
export interface IControlCamion {
  codigo: string;
  descripcion: string;
  ubicacion: string;
}
export interface IControlCamionTable extends IControlCamion, IRowTableAttributes {}
export type IControlCamiones = IControlCamion[];
export type IControlCamionesTable = IControlCamionTable[];


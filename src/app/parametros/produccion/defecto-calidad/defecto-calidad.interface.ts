import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IDefectoCalidad {
  transaccion: string;
  defecto: string;
  calificarGrado: string;  
  codigoDefecto: string;
  aplicativoId: string;
  estacion: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  horaCreacion: string;
  horaActualizacion: string;
  menuId: string;
  usuarioCreacion: string;
  usuarioActualizacion: string;  
}
export interface IDefectoCalidadTable extends IDefectoCalidad, IRowTableAttributes {}

export type IDefectosCalidad = IDefectoCalidad[];
export type IDefectosCalidadTable = IDefectoCalidadTable[];

export interface IDefectoCalidadResponse {
  totalRegistros: number;
  defectosCalidadType: IDefectosCalidad;
}
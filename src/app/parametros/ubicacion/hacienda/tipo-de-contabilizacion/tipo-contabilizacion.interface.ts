import { IRowTableAttributes } from "src/app/component/table/table.interface";


export interface Itipocontabilizacion {
  codigoProducto: number;
  codigoHacienda?: string;
  tipoLoteNormal: string;
  descripcion: string;
  aplicativoID?: string;
  estacion?: string;
  fechaActualizacion?: Date;
  fechaCreacion?: Date;
  horaCreacion?: Date;
  horaActualizacion?: Date;
  menuID?: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
}
export interface ItipocontabilizacionTable extends Itipocontabilizacion, IRowTableAttributes {

}
export type Itipocontabilizaciones = Itipocontabilizacion[];
export type Itipocontabilizaciontable = ItipocontabilizacionTable[];

export interface ItipocontabilizacionResponse {
  totalRegistros: number;
  tipoContabilizacionTypes: Itipocontabilizaciones;
}

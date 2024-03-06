import { IRowTableAttributes } from "src/app/component/table/table.interface";
export interface IEstacionalidad {
  codigoEstacionalidad: string;
  descripcion: string;
  mesDesde: number;
  mesHasta: number;
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

export interface IEstacionalidadTable
  extends IEstacionalidad,
    IRowTableAttributes {}

export type IEstacionalidades = IEstacionalidad[];
export type IEstacionalidadesTable = IEstacionalidadTable[];

export interface IEstacionalidadResponse {
  totalRegistros: number;
  estacionalidadTypes: IEstacionalidades;
}

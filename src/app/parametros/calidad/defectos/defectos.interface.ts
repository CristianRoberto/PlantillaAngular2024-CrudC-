import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IDefecto {
  defecto:string,
  tipoDefecto: string,
  grupo: string,
  descripcion: string,
  aplicativoId?: string,
  estacion?: string,
  fechaActualizacion?: string,
  fechaCreacion?: string,
  horaCreacion?: string,
  horaActualizacion?: string,
  menuId?: string,
  usuarioCreacion?: string,
  usuarioActualizacion?:string,
  estado:string|number,
  nombreMaquina?: string,
  
}
export interface IDefectoTable
  extends IDefecto,
  IRowTableAttributes { }

export type IDefectos = IDefecto[];
export type IDefectosTable = IDefectosTable[];

export interface IDefectosResponse{
  totalRegistro:number;
  defectoType: IDefectos;
}


import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITipovivienda {
  codigo?: number;
  descripcion: string;
  estacion?: string;
  aplicativoId?: string,
  fechaActualizacion?: string,
  fechaCreacion: string,
  horaCreacion?:string,
  horaActualizacion?: string,
  menuId:string,
  usuarioCreacion: string,
  usuarioActualizacion?: string
  
}
export interface ITipoviviendaTable
  extends ITipovivienda,
  IRowTableAttributes { }

export type ITipoviviendas = ITipovivienda[];
export type ITipoviviendasTable = ITipoviviendaTable[];

export interface ITipoviviendaResponse{
  totalRegistro:number;
  tipoViviendaTypes: ITipoviviendas;
}


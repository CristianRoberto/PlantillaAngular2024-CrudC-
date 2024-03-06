import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITtemLocalizacion{ 
  aplicativoId?: string;
  estacion?: string;
  fechaActualizacion?: Date;
  fechaCreacion?: Date;
  horaCreacion?: Date;
  horaActualizacion?: Date;
  menuId?: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
  codigoHacienda?: string,
  codigoSector?: string,
  codigoLote?: number,
  id?: number;
  codigoLocalidad?:string;
  costCenter: string,
  location:string,
  largo:number,
  ancho:number,
  capacidad:number
}
export interface ILocalizacionTable
  extends ITtemLocalizacion,
  IRowTableAttributes { }

export type ILocalizaciones = ITtemLocalizacion[];
export type ILocalizacionesTable = ILocalizacionTable[];

export interface ILocalizacionResponse{
  totalRegistros:number;
  localizacionType: ILocalizaciones;
}


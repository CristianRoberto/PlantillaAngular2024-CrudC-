import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITransportista {
  abaN8: string; /* ID del tranportista*/
  abalky?: string;
  abtax: string;/*  identificador fiscal*/
  abalph: string;/* transportista nombre*/
  abmcu?: string;
  abaT1?: string;
  abaC06?: string;
  abaC08?: string;
  abC09?: string;
  traeliow?: string;
  traaissor?: string; /* aislar del sorteo*/
  trareacH11?: string;
  trareacH12?: string;
  trareacH21?: string;
  trareacH22?: string;
  jawaudhorin?: Date;
  jawaudusrin?: string;
  jawaudhorup?: Date;
  jawaudusrup?: string;
  trstamigra?: string;
  trusr?: string;
  trhour?: Date;
  trcodloc?: string;
  trmstracti?: string;
  trmstactio?: string;
  lfcodzon?: string;
  camdelgrup?: string;
  aplicativoId?: string;
  estacion?: string;
  fechaActualizacion?: Date;
  fechaCreacion?: Date;
  horaCreacion?: Date;
  horaActualizacion?: Date;
  menuId?: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
  
}

export interface ITransportistaTable extends ITransportista, IRowTableAttributes {
 
}

export type ITransportistas = ITransportista[]
export type ITransportistasTable = ITransportistaTable[

]

export interface ITransportistaResponse {
  totalRegistros: number;
  transportistasType: ITransportistas;
  
}

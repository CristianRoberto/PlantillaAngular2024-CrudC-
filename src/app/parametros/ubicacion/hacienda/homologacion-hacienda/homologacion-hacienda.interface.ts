import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IHomologacionHacienda {
  codigoHaciendaSGAP: string,
  codigoZona: string,
  codigoSubZona: string,
  codigoHacienda: string,
  codigoHaciendaUnix: string,
  nombreHacienda: string,
  aplicativoId: string,
  estacion: string,
  fechaActualizacion: string,
  fechaCreacion: string,
  horaCreacion: string,
  horaActualizacion: string,
  menuId: string,
  usuarioCreacion: string,
  usuarioActualizacion: string
}

export interface IHomologacionHaciendaTable extends IHomologacionHacienda, IRowTableAttributes { }

export type IHomologacionHaciendas = IHomologacionHacienda[];
export type IHomologacionHaciendasTable = IHomologacionHaciendaTable[];

export interface IHomologacionHaciendaResponse {
  totalRegistros: number;
  homologacionHaciendaTypes: IHomologacionHaciendas;
}

import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IHacienda {

  aplicativoID: string;
  estacion?: string;
  fechaActualizacion?: Date;
  fechaCreacion?: Date;
  horaCreacion?: Date;
  horaActualizacion?: Date;
  menuId?: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
  codigoHacienda: string;
  productor: number;
  supervisor?: string;
  codigoZona: string;
  codigoSubZona?: string;
  nombreHacienda: string;
  codigoPNB?: string;
  inscPNB?: string;
  hectareasReales?: number;
  hectareaProduccion?: number;
  hectareaDeclarada?: number;
  eM1g1A?: string;
  eM1g2A?: string;
  eM1g3A?: string;
  eM1g4A?: string;
  eM1g5A?: string;
  eM1g6A?: string;
  eM1g7A?: string;
  eM1g8A?: string;
  eM1g9A?: string;
  eM1gaA?: string;
  eM1gbA?: string;
  eM1gcA?: string;
  eM1gdA?: string;
  eM1geA?: string;
  eM1gfA?: string;
  eM1ggA?: string;
  eM1ghA?: string;
  eM1giA?: string;
  emesthac?: string;
  lfesgpo?: string;
  lfimple?: string;
}

export interface IHaciendaTable extends IHacienda, IRowTableAttributes { }

export type IHaciendas = IHacienda[];
export type IHaciendasTable = IHaciendaTable[];

export interface IHaciendaResponse {
  totalRegistros: number;
  haciendaTypes: IHaciendas;
}

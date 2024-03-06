// tipo param string 3
// id param string 3
// descripción string 50
// núm desde money 4,2
// num hasta money 4,2
// num otro desde money 4,2
// num otro hasta money 4,2
// observación string 30
// status select opcion 1 activo
// adicional string 20

import { IRowTableAttributes } from "src/app/component/table/table.interface";

// texto adicional string 20
export interface IGeneral {
  tipo: string,
  id: string,
  descripcion: string,
  numDesde: number,
  numHasta: number,
  otroNumDesde: number,
  otroNumHasta: number,
  observacion: string,
  status: string,
  adicional: string,
}

export interface IGeneralTable extends IGeneral, IRowTableAttributes { }

export type IGenerales = IGeneral[]
export type IGeneralesTable = IGeneralTable[]

export interface IGeneralResponse {
  totalRegistros: number;
  generalesTypes: IGenerales;
}
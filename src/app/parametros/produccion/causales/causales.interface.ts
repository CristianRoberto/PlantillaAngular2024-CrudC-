import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ICausal {
  categoria: string;
  descripcion: string;
  otrasCausales: number;
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

export interface ICausalTable extends ICausal, IRowTableAttributes {}

export type ICausales = ICausal[];
export type ICausalesTable = ICausalTable[];

export interface ICausalesResponse {
  totalRegistros: number;
  causalesType: ICausales;
}

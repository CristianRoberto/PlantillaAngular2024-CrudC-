import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IEmbalaje {
  codigo: string;
  descripcion: string;
  estado?: string;
  usuarioCrea?: string;
  usuarioActualiza?: string;
  nombrePC?: string;
  menuId?: string;
  fechacrea?: string;
  fechaActualiza?: string;
  horacrea?: string;
  horaActualiza?: string;
}

export interface IEmbalajeTable extends IEmbalaje, IRowTableAttributes {}

export type IEmbalajes = IEmbalaje[];
export type IEmbalajesTable = IEmbalajeTable[];

export interface IEmbalajesResponse {
  totalRegistros: number;
  embalajeType: IEmbalajes;
}

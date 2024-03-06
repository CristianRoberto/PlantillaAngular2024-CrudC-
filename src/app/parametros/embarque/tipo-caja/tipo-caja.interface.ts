import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ITipoCaja {
  claseCodigo: string;
  descripcionTipoCaja: string;
  tipoCaja: string;
  pesoLibras: number;
  estado?: string;
  idPC?: string;
  idMenu?: string;
  porDefectoChar1_02?: string;
  porDefectoChar1_03?: string;
  porDefectoMon_01?: number;
  porDefectoMon_02?: number;
  porDefectoNum10_02?: number;
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

export interface ITipoCajaTable extends ITipoCaja, IRowTableAttributes {}

export type ITiposCajas = ITipoCaja[];
export type ITiposCajasTable = ITipoCajaTable[];

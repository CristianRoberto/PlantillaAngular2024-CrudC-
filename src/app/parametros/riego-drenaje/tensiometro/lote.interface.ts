import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ILote {
     aplicativoId?: string;
     estacion?: string;
     fechaActualizacion?:  string;
     fechaCreacion?:  string;
     horaCreacion?: string;
     horaActualizacion :  string;
     menuId?: string;
     usuarioCreacion?:  string;
     usuarioActualizacion?:  string;
     codigoHacienda?:  string;
     codigoSector?: number,
     codigoLote?: number,
     codigoEmpacadora?:  string;
     codigoProducto?: number,
     descripcionLote?:  string;
     hasTotales?: number,
     hasCultivo?: number,
     hasEnfundadas?: number,
     hasProduccion?: number,
     numeroRenovaciones?: number,
     fechaSiembra?: string;
     codigoLocalidad?: string;
     tipoPlantacion?: string;
     loteActivo?: number;
}

export interface ILoteTable extends ILote, IRowTableAttributes {}

export type ILotes = ILote[];
export type ILotesTable = ILoteTable[];

export interface ILotesResponse {
    totalRegistros: number;
    loteType: ILotes;
}
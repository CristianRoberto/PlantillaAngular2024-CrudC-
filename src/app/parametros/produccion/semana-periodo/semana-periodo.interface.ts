import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ISemanaPeriodo {
    codigoCalendario:string,
    descripcionCalendario: string,
    semana: number,
    periodo: number,
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

export interface ISemanaPeriodoTable extends ISemanaPeriodo, IRowTableAttributes {}

export type ISemanaPeriodos = ISemanaPeriodo[];
export  type ISemanaPeriodosTable = ISemanaPeriodoTable[]

export interface ISemanaResponse {
    totalRegistros: number;
    periodoTypes: ISemanaPeriodosTable;
}


export interface ITipoCalendario {
    codigo: string,
    descripcion: string
}

export interface ITipoCalendarioTable extends ITipoCalendario, IRowTableAttributes{}
export type ITipoCalendarios = ITipoCalendario[];
export type ITipoCalendariosTable = ITipoCalendarioTable[];

export interface ITipoCalendarioResponse {
    tipoType: any
}
import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface ILaborRealizada {
    id?: number;
    aplicativoId?: string;
    estacion?: string;
    fechaActualizacion?: string;
    fechaCreacion?: string;
    menuId?: string;
    usuarioCreacion?: string;
    usuarioActualizacion?: string;
    codigoHacienda?: string;
    codigoEmpacador?: string;
    codigoCuadrilla?: string;
    fecha?: string;
    numeroProceso?: number;
    cierreTransaccional?: string;
  }
  



export interface ILaborRealizadaTable
  extends ILaborRealizada,
    IRowTableAttributes {
}

export type IprocesosRealizadas = ILaborRealizada[];
export type IprocesosRealizadasTable = ILaborRealizadaTable[];


export type IProcesoGetResponse = ILaborRealizada[];

export type IProcesoResponse = {
  mensaje: string
}


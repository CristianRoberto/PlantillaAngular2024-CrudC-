import { IRowTableAttributes } from  "src/app/component/table/table.interface" ;

export interface IProceso {
    aplicativoId?: string,
    estacion?:  string,
    fechaActualizacion?: string,
    fechaCreacion?:  string,
    horaCreacion?:  string,
    horaActualizacion?:  string,
    menuId?:  string ,
    usuarioCreacion?:  string ,
    usuarioActualizacion?:  string ,
    codigoHacienda:  string ,
    codigoEmpacador:  string ,
    codigoCuadrilla:  string ,
    fecha:  string,
    numeroProceso: number,
    cierreTransaccional?:  string 
}

export interface IProcesoTable extends IProceso, IRowTableAttributes {}

export type IProcesos = IProceso[];
export type IProcesosTable = IProcesoTable[];

export interface IProcesoResponse {
  totalRegistros: number;
  procesoTypes: IProcesos;
}
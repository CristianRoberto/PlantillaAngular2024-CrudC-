import { IRowTableAttributes } from "src/app/component/table/table.interface";

export interface IJefesSectores{
    idMenu: string,
    usuarioCreador: string,
    codigoHacienda:string,
    codigoLote:number,
    codigoJefeSector:number,
    codigoSector:number,
    codigoEmpacadora:string,
    estado:string,
    nombre:string,
    apellido:string,
    cedula:string,
}
export interface IJefeSectoresTable extends IJefesSectores,IRowTableAttributes{}
export type IJefeSectorLoteTable=IJefeSectoresTable [];
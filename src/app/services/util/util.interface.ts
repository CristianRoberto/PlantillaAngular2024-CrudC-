export interface IUtilReporte {
  formatoInforme: FormatoUtilReporte;
  reporteType: IUtilReporteDetail;
}
export interface IUtilReporteDetail {
  fechaReporte: string;
  codigoReporte: string;
  tituloReporte: string;
  usuario: string;
  compania: string;
  columnas: string[];
  contenidoColumnas: string[][];
}
export type FormatoUtilReporte = "PDF" | "EXCEL" | "CSV";

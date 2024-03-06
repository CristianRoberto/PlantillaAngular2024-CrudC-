import { IColumnsTable } from "src/app/component/table/table.interface";
import { IJefeSectorLoteTable } from "./jefe-sector-lote.interface";
export const EmpacadorasData: IJefeSectorLoteData = {
  columns: [
    {
      type: "checkbox",
    },
    {
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      sortActive: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      align: "center",
      sortActive: true,
    },
    {
      title: "Acciones",
      type: "actions",
      /* actions: [{ icon: "fas fa-sort" }], */
    },
  ],
  dataTable: [
    {
      key: "01",
      idMenu: "",
      usuarioCreador: "",
      codigoHacienda: "",
      codigoLote: 0,
      codigoJefeSector: 0,
      codigoSector: 0,
      codigoEmpacadora: "",
      estado: "",
      nombre: "",
      apellido: "",
      cedula: "",
    },
  ],
  backButtonOptions: ["Hacienda San Vicente", "Zona:", "Fumisa"],
};
interface IJefeSectorLoteData {
  columns: IColumnsTable;
  dataTable: IJefeSectorLoteTable;
  backButtonOptions: string[];
}

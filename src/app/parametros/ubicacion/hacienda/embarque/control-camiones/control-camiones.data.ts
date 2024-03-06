import { IColumnsTable } from "src/app/component/table/table.interface";
import { IControlCamionTable } from "./control-camiones.interface";

export const ControlCamionData: IControlCamionData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      sortActive: true,
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
    },
    {
      title: "Acciones",
      type: "actions",
    },
  ],
  defaultEmptyRowTable: {
    codigo: "",
    descripcion: "",
    ubicacion: "",
    isEditingRow: true,
  },
  backButtonOptions: ["Zumisa", "ubicación", "Los Ríos"],
};
interface IControlCamionData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IControlCamionTable;
  backButtonOptions: string[];
}

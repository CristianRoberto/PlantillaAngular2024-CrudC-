import { IColumnsTable } from "src/app/component/table/table.interface";
import { ISubzonaTable } from "./subzonas.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const SubzonaData: ISubzonaData = {
  columns: [
    {
      title: "Código",
      dataIndex: "subZonaCodigo",
      align: "center",
      sortActive: true,
      colType: "number",
      width: "175px",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "165px",
      actions: [
        { materialIcon: "edit", id: "editOnTable" },
        { materialIcon: "content_copy", id: "cloneOnTable" },
        { materialIcon: "delete_forever", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoZona: "",
    subZonaCodigo: "",
    descripcion: "",
    ubicacion: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "subZonaCodigo",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "ubicacion",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
  ],
  colsToFilterByText: ["subZonaCodigo", "descripcion", "ubicacion"],
};
interface ISubzonaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ISubzonaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

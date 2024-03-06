import { IColumnsTable } from "src/app/component/table/table.interface";
import { IZonaTable } from "./zona.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const ZonaData: IZonaData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigo",
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
      title: "N° Subzona",
      dataIndex: "numeroDeZonas",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "185px",
      actions: [
        { materialIcon: "edit", id: "editOnTable", tooltip: "Editar" },
        {
          materialIcon: "holiday_village",
          id: "redirect",
          tooltip: "Subzona",
        },
        {
          materialIcon: "house",
          id: "redirect",
          tooltip: "Hacienda",
        },
        {
          materialIcon: "content_copy",
          id: "cloneOnTable",
          tooltip: "Duplicar",
        },
        {
          materialIcon: "delete_forever",
          id: "delete",
          tooltip: "Suprimir",
        },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigo: "",
    descripcion: "",
    ubicacion: "",
    numeroDeZonas: 0,
    isEditingRow: true,
    traaissor: "",
  },
  tableInputsEditRow: [
    {
      id: "codigo",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "ubicacion",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
    {
      id: "numeroDeZonas",
      type: "visualization",
      disabled: true,
    },
  ],
  colsToFilterByText: ["codigo", "descripcion", "ubicacion", "numeroDeZonas"],
};
interface IZonaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IZonaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

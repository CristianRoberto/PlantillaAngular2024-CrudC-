import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ITransportistaTable } from "./transportista.interface";

export const TransportistaData: ITrasnportistaData = {
  columns: [
    {
      title: "Transportista Id ",
      dataIndex: "abaN8",
      align: "center",
      sortActive: true,
      colType: "string",
      width: "200px",
    },
    {
      title: "Identificación fiscal",
      dataIndex: "abtax",
      sortActive: true,
      colType: "string",
      align: "center",
    },
    {
      title: "Transportista nombre",
      dataIndex: "abalph",
      sortActive: true,
      colType: "string",
      align: "center",
    },
    {
      title: "Aislar del sorteo",
      type: "bool",
      dataIndex: "traaissor",
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "140px",
      align: "center",
      actions: [
        { materialIcon: "edit", id: "editOnTable", tooltip: "Editar" },
        {
          materialIcon: "local_shipping",
          id: "redirect",
          tooltip: "Transportista por camiones",
        },
      ],
    },
  ],

  defaultEmptyRowTable: {
    abaN8: "",
    abtax: "",
    abalph: "",
    traaissor: "",
    isEditingRow: false,
  },
  tableInputsEditRow: [
    {
      id: "abaN8",
      type: "number",
      maxLength: 3,
      required: true,
      disabled: true,
    },
    {
      id: "abtax",
      type: "string",
      maxLength: 20,
      required: true,
      disabled: true,
    },
    {
      id: "abalph",
      type: "string",
      maxLength: 40,
      required: true,
      disabled: true,
    },
    {
      id: "traaissor",
      type: "toggle",
    },
  ],
  colsToFilterByText: ["abaN8", "abtax", "abalph", "traaissor"],
};

interface ITrasnportistaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ITransportistaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

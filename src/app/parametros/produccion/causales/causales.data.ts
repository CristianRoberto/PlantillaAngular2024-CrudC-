import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ICausalTable } from "./causales.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const CausalesData: ICausalesData = {
  columns: [
    {
      title: "Categoría",
      dataIndex: "categoria",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Otras Causales",
      dataIndex: "otrasCausales",
      sortActive: true,
      colType: "number",
      type: "bool",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    categoria: "",
    descripcion: "",
    otrasCausales: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "categoria",
      type: "string",
      maxLength: 2,
      required: true,
      allowedKeys: ["notzero"],
      inputMessageError: "Ingrese la categoria",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 20,
      required: true,
      allowedKeys: ["space"],
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "otrasCausales",
      type: "toggle",
    },
  ],
  colsToFilterByText: ["categoria", "descripcion", "otrasCausales"],
};

interface ICausalesData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ICausalTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

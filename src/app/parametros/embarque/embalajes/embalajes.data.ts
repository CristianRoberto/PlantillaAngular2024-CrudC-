import { IColumnsTable } from "src/app/component/table/table.interface";
import { IEmbalajeTable } from "./embalajes.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const EmbalajeData: EmbalajeData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    codigo: "",
    descripcion: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigo",
      type: "string",
      maxLength: 4,
      required: true,
      allowedKeys: ["notzero"],
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 20,
      required: true,
      allowedKeys: ["space"],
      inputMessageError: "Ingrese la descripción",
    },
  ],
  colsToFilterByText: ["codigo", "descripcion"],
};

interface EmbalajeData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IEmbalajeTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

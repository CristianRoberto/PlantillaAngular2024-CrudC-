import { IColumnsTable } from "src/app/component/table/table.interface";
import { ITipoviviendaTable } from "./tipo-vivienda.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const TipoviviendaData: ITipoviviendaData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      sortActive: true,
      colType: "number",
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
    descripcion: "",
    fechaCreacion: "2024-01-04",
    menuId: "MENU001",
    usuarioCreacion: "Usuario123",
    isEditingRow: true,
    traaissor: "",
  },
  tableInputsEditRow: [
    {
      id: "codigo",
      type: "string",
      allowedKeys: [],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      allowedKeys: [],
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
  ],
  colsToFilterByText: ["codigo", "descripcion"],
};

interface ITipoviviendaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ITipoviviendaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

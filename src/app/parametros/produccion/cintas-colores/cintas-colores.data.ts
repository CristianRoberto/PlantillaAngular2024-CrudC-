import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ICintasColoresTable } from "./cintas-colores.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const CintaColoresData: ICintaColoresData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigoColores",
      width: "150px",
      sortActive: true,
      colType: "string",
      align: "center",
    },
    {
      title: "Color",
      dataIndex: "descripcionColor",
      sortActive: true,
      colType: "string",
      type: "color",
    },
    {
      title: "Secuencia",
      dataIndex: "secuencia",
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
    fechaIngreso: "2024-02-14T07:22:14.039Z",
    idMenu: "MENU001",
    usuarioCreador: "Usuario123",
    codigoColores: "",
    descripcion: "",
    descripcionColor: "",
    secuencia: null,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoColores",
      type: "string",
      maxLength: 3,
      allowedKeys: [],
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcionColor",
      type: "color",
      maxLength: 3,
      allowedKeys: [],
      required: true,
      inputMessageError: "Ingrese el color",
    },
    {
      id: "secuencia",
      type: "number",
      allowedKeys: [],
      maxLength: 1,
      required: true,
      inputMessageError: "Ingrese secuencia",
    },
    {
      id: "descripcion",
      type: "string",
      allowedKeys: [],
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripcion",
    },
  ],
  colsToFilterByText: [
    "codigoColores",
    "descripcionColor",
    "secuencia",
    "descripcion",
  ],
};
interface ICintaColoresData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ICintasColoresTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

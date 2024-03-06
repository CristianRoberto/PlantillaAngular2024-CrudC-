import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ILocalizacionTable } from "./localizacion.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const LocalizacionData: ILocalizacionData = {
  columns: [
    {
      title: "Costcenter",
      dataIndex: "costCenter",
      sortActive: true,
      width: "250px",
      colType: "string",
    },
    {
      title: "Location",
      dataIndex: "location",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Largo",
      dataIndex: "largo",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Ancho",
      dataIndex: "ancho",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Capacidad",
      dataIndex: "capacidad",
      sortActive: true,
      colType: "number",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    costCenter: "",
    location: "",
    largo: null,
    ancho: null,
    capacidad: null,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "costCenter",
      type: "select",
      required: true,
      placeholder: "Seleccione",
      inputMessageError: "Seleccione",
      options: [],
    },

    {
      id: "largo",
      type: "money",
      maxLength: 10,
      required: true,
      placeholder: "0.00",
      inputMessageError: "Ingrese campo largo",
    },

    {
      id: "ancho",
      type: "money",
      maxLength: 10,
      required: true,
      placeholder: "0.00",
      inputMessageError: "Ingrese el ancho",
    },
    {
      id: "capacidad",
      type: "number",
      maxLength: 10,
      placeholder: "0.00",
      required: true,
      inputMessageError: "Ingrese campo capacidad",
    },
  ],
  colsToFilterByText: ["capacidad", "costCenter", "largo", "ancho"],
};

interface ILocalizacionData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ILocalizacionTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

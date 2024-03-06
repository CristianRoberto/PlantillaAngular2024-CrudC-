import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ITensiometroTable } from "./tensiometro.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const TensiometroData: ITensiometroData = {
  columns: [
    {
      title: "Hacienda",
      dataIndex: "codigoHacienda",
      align: "center",
      dataIndexesToJoin: ["codigoHacienda", "hacienda"],
      sortActive: true,
      colType: "string",
    },
    {
      title: "Código Lote",
      dataIndex: "codigoLote",
      dataIndexesToJoin: ["codigoLote", "lote"],
      sortActive: true,
      colType: "number",
    },
    {
      title: "Código Sector",
      dataIndex: "codigoSector",
      dataIndexesToJoin: ["codigoSector", "sector"],
      sortActive: true,
      colType: "number",
    },
    {
      title: "N° Estacion",
      dataIndex: "numeroEstacion",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Profundidad",
      dataIndex: "profundidad",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    hacienda: "",
    codigoLote: 0,
    lote: "",
    codigoSector: 0,
    sector: "",
    numeroEstacion: 0,
    profundidad: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoHacienda",
      type: "string",
      required: true,
      disabled: true,
      inputMessageError: "Ingrese el codigo hacienda",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "hacienda",
      type: "string",
      required: true,
      disabled: true,
      inputMessageError: "Ingrese la descripcion hacienda",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "codigoLote",
      type: "number",
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el codigo lote",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "lote",
      type: "string",
      required: true,
      disabled: true,
      inputMessageError: "Ingrese la descripcion del lote",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "codigoSector",
      type: "number",
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el codigo sector",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "sector",
      type: "string",
      required: true,
      disabled: false,
      inputMessageError: "Ingrese la descripcion del sector",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "numeroEstacion",
      type: "number",
      maxLength: 4,
      required: true,
      inputMessageError: "Ingrese la descripción",
      allowedKeys: ["alphanumeric"],
    },
    {
      id: "profundidad",
      type: "number",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese la ubicación",
      allowedKeys: ["alphanumeric"],
    },
  ],
  filterFormInputs: [
    {
      id: "codigoHacienda",
      type: "select",
      label: "Hacienda",
      placeholder: "Seleccione",
      colWidth: "4",
    },
    {
      id: "codigoLote",
      type: "select",
      label: "Lote",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
    },
  ],
  filterFormSearchButtonProps: {
    colWidth: "12",
    functionName: "onSubmitForm",
  },
  colsToFilterByText: [
    "codigoHacienda",
    "hacienda",
    "codigoLote",
    "lote",
    "numeroEstacion",
    "profundidad",
    "sector",
    "codigoSector",
  ],
};

interface ITensiometroData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ITensiometroTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

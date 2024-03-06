import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableComponentData } from "src/app/component/table/table.data";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ITaraTable } from "./tara.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const TaraData: ITaraData = {
  numberPage: 1,
  pageSize: TableComponentData.defaultRowPerPage,
  columns: [
    {
      title: "Código Hacienda",
      dataIndex: "codigoHacienda",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Código Empacadora",
      dataIndex: "codigoEmpacadora",
      sortActive: true,
      colType: "string",
    },
    {
      title: "SA peso por tara racimo",
      dataIndex: "taraRacimo",
      sortActive: true,
      colType: "number",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    codigoEmpacadora: "",
    taraRacimo: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoHacienda",
      type: "string",
      required: true,
      allowedKeys: ["alphanumeric"],
      inputMessageError: "Ingrese el código de hacienda",
      disabled: true,
    },
    {
      id: "codigoEmpacadora",
      type: "string",
      disabled: true,
      required: true,
      allowedKeys: ["alphanumeric"],
      inputMessageError: "Ingrese el código de empacadora",
    },
    {
      id: "taraRacimo",
      type: "money",
      maxLength: 6,
      required: true,
      allowedKeys: ["alphanumeric"],
      inputMessageError: "Ingrese el peso tara",
    },
  ],
  filterFormInputs: [
    {
      id: "codigoHacienda",
      type: "select",
      label: "Hacienda",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
    },
    {
      id: "codigoEmpacadora",
      type: "select",
      label: "Empacadora",
      placeholder: "Seleccione",
      colWidth: "4",
      required: true,
    },
  ],
  filterFormSearchButtonProps: {
    colWidth: "12",
  },
  colsToFilterByText: ["codigoHacienda", "codigoEmpacadora", "taraRacimo"],
};

interface ITaraData {
  numberPage: number;
  pageSize: number;
  columns: IColumnsTable;
  defaultEmptyRowTable: ITaraTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableComponentData } from "src/app/component/table/table.data";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ISemanaPeriodoTable } from "./semana-periodo.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const SemanaPeriodoData: ISemanaPeriodoData = {
  numberPage: 1,
  pageSize: TableComponentData.defaultRowPerPage,
  columns: [
    {
      title: "Código Calendario",
      dataIndex: "codigoCalendario",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripcion Calendario",
      dataIndex: "descripcionCalendario",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Semana",
      dataIndex: "semana",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Periodo",
      dataIndex: "periodo",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    codigoCalendario: "",
    descripcionCalendario: "",
    semana: 0,
    periodo: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoCalendario",
      type: "string",
      required: true,
      inputMessageError: "Ingrese el código del Calendario",
      disabled: false,
    },
    {
      id: "descripcionCalendario",
      type: "string",
      disabled: false,
      required: true,
      inputMessageError: "Ingrese la descripcion del calendario",
    },
    {
      id: "semana",
      type: "number",
      maxLength: 6,
      required: true,
      inputMessageError: "Ingrese la semana",
    },
    {
      id: "periodo",
      type: "number",
      maxLength: 6,
      required: true,
      inputMessageError: "Ingrese el periodo",
    },
  ],
  filterFormInputs: [
    {
      id: "codigoCalendario",
      type: "select",
      label: "Calendario",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
      options: [
        /*  { label: "Produccion - PR", value: "PR" },
        { label: "Administracion - AD", value: "AD" }, */
      ],
    },
  ],
  filterFormSearchButtonProps: {
    colWidth: "12",
  },
  colsToFilterByText: [
    "codigoCalendario",
    "descripcionCalendario",
    "semana",
    "periodo",
  ],
};

interface ISemanaPeriodoData {
  numberPage: number;
  pageSize: number;
  columns: IColumnsTable;
  defaultEmptyRowTable: ISemanaPeriodoTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

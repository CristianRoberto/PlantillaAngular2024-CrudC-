import { IColumnsTable } from "src/app/component/table/table.interface";
import { IHitoMuestreoTable } from "./hito-muestreo.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";

export const HitoMuestreosData: IHitoMuestreosData = {
  columns: [
    {
      title: "Hacienda",
      dataIndex: "descripcionHacienda",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Lote",
      dataIndex: "descripcionLote",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "N° de hito",
      dataIndex: "numeroHito",
      sortActive: true,
      colType: "number",
      align: "center",
    },
    {
      title: "Latitud GPS",
      dataIndex: "latitud_GPS",
      sortActive: true,
      colType: "number",
      align: "center",
    },
    {
      title: "Longitud GPS",
      dataIndex: "longitud_GPS",
      sortActive: true,
      colType: "number",
      align: "center",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "175px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "delete" },
        { icon: "far fa-copy", id: "cloneOnTable" },
        { icon: "fas fa-trash-alt", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    descripcionHacienda: "",
    descripcionLote: "",
    numeroHito: 0,
    latitud_GPS: 0,
    longitud_GPS: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "descripcionHacienda",
      type: "string",
      disabled: true,
    },
    {
      id: "descripcionLote",
      type: "string",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese el lote",
    },
    {
      id: "numeroHito",
      type: "number",
      required: true,
      disabled: false,
      maxLength: 4,
      inputMessageError: "Ingrese el numero de hito",
    },
    {
      id: "latitud_GPS",
      type: "number",
      required: true,
      maxLength: 9,
      inputMessageError: "Ingrese la latitud",
    },
    {
      id: "longitud_GPS",
      type: "number",
      required: true,
      maxLength: 9,
      inputMessageError: "Ingrese la longitud",
    },
  ],
  filterFormInputs: [
    {
      id: "hacienda",
      type: "select",
      label: "Hacienda",
      placeholder: "Seleccione",
      colWidth: "4",
    },
    {
      id: "lote",
      type: "select",
      label: "Lote",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
    },
  ],
  filterFormSearchButtonProps: {
    colWidth: "12",
  },
  colsToFilterByText: [
    "descripcionHacienda",
    "descripcionLote",
    "numeroHito",
    "latitud_GPS",
    "longitud_GPS",
  ],
};

interface IHitoMuestreosData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IHitoMuestreoTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

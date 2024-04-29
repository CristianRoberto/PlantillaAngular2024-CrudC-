import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableComponentData } from "src/app/component/table/table.data";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ILaborRealizadaTable } from "./numero_procesos.interface";

export const ProcesoData: IProcesoData = {
  // numberPage: 1,
  // pageSize: TableComponentData.defaultRowPerPage,
  columns: [
    {
      title: "Hacienda,",
      dataIndex: "codigoHacienda",
      dataIndexesToJoin: ["codigoHacienda", "nombreHacienda"],
      width: "200px",
      sortActive: true,
      colType: "string",
    },



    {
      title: "Empacadora,",
      dataIndex: "codigoEmpacador",
      dataIndexesToJoin: ["codigoEmpacador", "nombreEmpacador"],
      width: "200px",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Cuadrilla,",
      dataIndex: "codigoCuadrilla",


      dataIndexesToJoin: ["codigoCuadrilla", "nombreCuadrilla"],
      width: "200px",
      sortActive: true,
      colType: "string",

    },
    {
      title: "N° proceso",
      dataIndex: "numeroProceso",
      colType: "number",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "125px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "editOnTable" },
        { icon: "far fa-copy", id: "cloneOnTable" },
        // { icon: "far fa-copy", id: "cloneOnTable" },
        { icon: "fas fa-trash-alt", id: "delete", tooltip: 'delete' },
      ],
    },
  ],

  defaultEmptyRowTable: {
    id: 0,
    codigoHacienda: "",
    fecha: "",
    codigoEmpacador: "",
    codigoCuadrilla:"",
    numeroProceso: 0,
    isEditingRow: true,
    aplicativoId: "",
    estacion: "",
    fechaActualizacion: "",
    fechaCreacion: "",
    menuId: "",
    usuarioCreacion: "",
    usuarioActualizacion: "",
    cierreTransaccional: ""
  },

  dropdownOptionsExport: [
  {
    name: "PDF",
    icon: "fas fa-file-pdf",
    id: "downloadDataTablePDF",
  },
      {
      name: "CSV",
      icon: "fas fa-file-excel",
      id: "downloadDataTableCSV",
    },
    {
      name: "TXT",
      icon: "fas fa-file-alt",
      id: "downloadDataTableTXT",
    },
  ],
  tableInputsEditRow: [
      {
        id: "codigoHacienda",
        type: "string",
        maxLength: 12,
        required: true,
        inputMessageError: "Ingrese el código de hacienda",
        // disabled: true,
      },
      {
        id: "fecha",
        type: "string",
        // disabled: true,
        required: true,
        inputMessageError: "Ingrese la fecha",
      },
      {
        id: "codigoEmpacadora",
        type: "string",
        maxLength: 2,
        // disabled: true,
        required: true,
        inputMessageError: "Ingrese el código de empacadora",
      },
      {
        id: "codigoCuadrilla",
        type: "string",
        maxLength: 4,
        disabled: false,
        required: true,
        inputMessageError: "Ingrese el código de cuadrilla",
      },
      {
        id: "numeroProceso",
        type: "number",
        maxLength: 6,
        required: true,
        inputMessageError: "Ingrese el numero de proceso",
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
        //   options: [
        //     { label: "hacienda 1", value: "1" },
        //     { label: "hacienda 2", value: "2" },
        //     { label: "hacienda 2111", value: "2111" },
        //   ],
      },
      {
        id: "codigoEmpacadora",
        type: "select",
        label: "Empacadora",
        colWidth: "4",
        placeholder: "Seleccione",
        required: true,
      },
      {
        id: "codigoCuadrilla",
        type: "select",
        label: "Cuadrilla",
        colWidth: "4",
        placeholder: "Seleccione",
        required: true,
      },
    ],
    filterFormSearchButtonProps: {
      colWidth: "12",
    },
    colsToFilterByText: [
      "codigoHacienda",
      "fecha",
      "codigoEmpacadora",
      "codigoCuadrilla",
      "numeroProceso",
    ],
    };
interface IProcesoData {
  // numberPage: number;
  // pageSize: number;
  columns: IColumnsTable;
  dropdownOptionsExport: IDropdownOptions;
  defaultEmptyRowTable: ILaborRealizadaTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

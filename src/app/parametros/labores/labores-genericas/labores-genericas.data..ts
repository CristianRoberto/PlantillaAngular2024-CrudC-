import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";

export const LaboresGenericasData: ILaboresGenericasData = {
  columns: [
    {
      title: "Código Producto",
      dataIndex: "codigoProducto",
      align: "center",
      sortActive: true,
      colType: "string",
      width: "175px",
    },
    {
      title: "Descripción del Producto",
      dataIndex: "descripcionProducto",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Código de Labor",
      dataIndex: "codigoLabor",
      align: "center",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Descripción de Labor",
      dataIndex: "descripcionLabor",
      sortActive: true,
      colType: "string",
      align: "center",
      width: "165px",
    },
    {
      title: "Código de Labor Genérica",
      dataIndex: "codigoGenerica",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Descripción de Labor Genérica",
      dataIndex: "descripcionGenerica",
      sortActive: true,
      colType: "string",
      align: "center",
      width: "165px",
    },
    {
      title: "Unidad de medida",
      dataIndex: "unidadMedida",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Descripción de Unidad de medida",
      dataIndex: "descripcionMedida",
      sortActive: true,
      colType: "string",
      align: "center",
      width: "165px",
    },
    {
      title: "Labor Excepción",
      dataIndex: "laborExcepcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "185px",
      actions: [
        { materialIcon: "edit", id: "editOnTable" },
        { materialIcon: "content_copy", id: "cloneOnTable" },
        { materialIcon: "delete_forever", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoProducto: 0,
    descripcionProducto: "",
    codigoLabor: 0,
    descripcionLabor: "",
    codigoGenerica: 0,
    descripcionGenerica: "",
    unidadMedida: 0,
    descripcionMedida: "",
    laborExcepcion: 0,
    isEditingRow: true,
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
      id: "codigoProducto",
      type: "number",
      maxLength: 3,
      required: true,
      disabled: true,
      inputMessageError: "Còdigo no existente",
    },
    {
      id: "descripcionProducto",
      type: "string",
      maxLength: 30,
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el código de producto",
    },
    {
      id: "codigoLabor",
      type: "number",
      maxLength: 4,
      required: true,
      inputMessageError: "Código no existente",
    },
    {
      id: "descripcionLabor",
      type: "string",
      maxLength: 30,
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el código de labor",
    },
    {
      id: "codigoGenerica",
      type: "number",
      maxLength: 8,
      required: true,
      inputMessageError: "Código no existente",
    },
    {
      id: "descripcionLabor",
      type: "string",
      maxLength: 30,
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el código de labor genérico",
    },
    {
      id: "unidadMedida",
      type: "number",
      maxLength: 2,
      required: true,
      inputMessageError: "Ingrese unidad",
    },
    {
      id: "descripcionMedida",
      type: "string",
      maxLength: 30,
      disabled: true,
      required: true,
      inputMessageError: "Ingrese unidad de medida",
    },
    {
      id: "laborExcepcion",
      type: "checkbox",
      maxLength: 11,
      required: true,
      inputMessageError: "Ingrese el costo de mano de obra",
    },
  ],
};

interface ILaboresGenericasData {
  columns: IColumnsTable;
  dropdownOptionsExport: IDropdownOptions;
  defaultEmptyRowTable: any;
  tableInputsEditRow: IInputsComponent;
}

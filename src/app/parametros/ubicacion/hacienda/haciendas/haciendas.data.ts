import { IColumnsTable } from "src/app/component/table/table.interface";
import { IHacienda, IHaciendaTable } from "./haciendas.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const HaciendasData: IHaciendaData = {
  columns: [
    {
      title: "Codigo",
      dataIndex: "codigoHacienda",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Hacienda",
      dataIndex: "nombreHacienda",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Sector",
      dataIndex: "",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Productor",
      dataIndex: "productor",
      sortActive: true,
      colType: "string",
      align: "center",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "175px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "redirect", tooltip: "Editar" },
        {
          icon: "fas fa-solid fa-chart-pie",
          id: "redirect",
          tooltip: "Sectores",
        },
        { icon: "fas fa-solid fa-box", id: "redirect", tooltip: "Empacadoras" },
        { icon: "fas fa-sitemap", id: "redirect", tooltip: "Lotes" },
        {
          icon: "fa fa-clipboard",
          id: "redirect",
          tooltip: "Tipo Contabilización",
        },
        { icon: "far fa-copy", id: "redirect", tooltip: "Clonar" },
        { icon: "fas fa-trash-alt", id: "delete", tooltip: "Eliminar" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    nombreHacienda: "",
    codigoZona: "",
    productor: null,
    isEditingRow: true,
    aplicativoID: "",
  },
  tableInputsEditRow: [
    {
      id: "codigo",
      type: "string",
      maxLength: 12,
      required: true,
      inputMessageError: "Ingrese el codigo de hacienda",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese la descripcion de la hacienda",
    },
    {
      id: "zona",
      type: "string",
      required: true,
      maxLength: 30,
      inputMessageError: "Ingrese la zona",
    },
    {
      id: "sector",
      type: "string",
      required: true,
      maxLength: 10,
      inputMessageError: "Ingrese el sector",
    },
    {
      id: "productor",
      type: "string",
      required: true,
      maxLength: 40,
      inputMessageError: "Ingrese codigo del productor",
    },
    {
      id: "productor",
      type: "string",
      required: true,
      maxLength: 40,
      inputMessageError: "Ingrese nombre del productor",
    },
  ],
  colsToFilterByText: [
    "codigoHacienda",
    "nombreHacienda",
    "codigoZona",
    "productor",
  ],
};

interface IHaciendaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IHaciendaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: Array<keyof IHacienda>;
}

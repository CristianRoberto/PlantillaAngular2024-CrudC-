import { IColumnsTable } from "src/app/component/table/table.interface";
import { IVivienda, IViviendaTable } from "./vivienda.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const ViviendasData: IViviendaData = {
  columns: [
    {
      title: "Vivienda",
      align: "center",
      dataIndex: "codigoVivienda",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Hacienda",
      dataIndexesToJoin: ["codigoHacienda", "nombreHacienda"],
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Sector",
      align: "center",

      dataIndexesToJoin: ["codigoSector", "descripcionSector"],
      sortActive: true,
      colType: "string",
    },

    {
      title: "Tipo de vivienda",
      align: "center",
      dataIndexesToJoin: ["codigoTipoVivienda", "descripcionTipoVivienda"],
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "175px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "redirect", tooltip: "Editar" },
        { icon: "fas fa-info-circle", id: "redirect", tooltip: "Visualizar" },
        { icon: "far fa-copy", id: "redirect", tooltip: "Clonar" },
        { icon: "fas fa-trash-alt", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    codigoSector: "",
    codigoTipoVivienda: 0,
    codigoVivienda: "",
    numeroPersonas: "",
    responsable: "",
    aplicativoId: "",
    estacion: "",
    fechaActualizacion: "",
    fechaCreacion: "",
    horaCreacion: "",
    horaActualizacion: "",
    menuId: "",
    usuarioCreacion: "",
    usuarioActualizacion: "",
    isEditingRow: true,
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
    "codigoVivienda",
    "codigoSector",
    "numeroPersonas",
    "codigoHacienda",
    "descripcionSector",
    "nombreHacienda",
    "descripcionTipoVivienda",
  ],
};

interface IViviendaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IViviendaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: Array<keyof IVivienda>;
}

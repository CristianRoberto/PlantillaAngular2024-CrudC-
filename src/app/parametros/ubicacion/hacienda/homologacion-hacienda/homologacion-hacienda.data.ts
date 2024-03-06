import { IColumnsTable } from "src/app/component/table/table.interface";
import {
  IHomologacionHacienda,
  IHomologacionHaciendaTable,
} from "./homologacion-hacienda.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const HomologacionHaciendasData: IHomologacionHaciendaData = {
  columns: [
    {
      title: "Hacienda",
      dataIndexesToJoin: ["codigoHacienda"],
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Hacienda SGAP",
      dataIndexesToJoin: ["codigoHaciendaSGAP"],
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Hacienda Unix",
      align: "center",
      dataIndexesToJoin: ["codigoHaciendaUnix"],
      sortActive: true,
      colType: "string",
    },

    {
      title: "Nombre",
      align: "center",
      dataIndexesToJoin: ["nombreHacienda"],
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
    codigoHaciendaSGAP: "",
    codigoZona: "",
    codigoSubZona: "",
    codigoHacienda: "",
    codigoHaciendaUnix: "",
    nombreHacienda: "",
    aplicativoId: "",
    estacion: "",
    fechaActualizacion: "",
    fechaCreacion: "",
    horaCreacion: "",
    horaActualizacion: "",
    menuId: "",
    usuarioCreacion: "",
    usuarioActualizacion: "",
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
    "codigoHaciendaSGAP",
    "codigoZona",
    "codigoSubZona",
    "codigoHacienda",
    "codigoHaciendaUnix",
    "nombreHacienda",
    "aplicativoId",
    "estacion",
    "fechaActualizacion",
    "fechaCreacion",
    "horaCreacion",
    "horaActualizacion",
    "menuId",
    "usuarioCreacion",
    "usuarioActualizacion",
  ],
};

interface IHomologacionHaciendaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IHomologacionHaciendaTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: Array<keyof IHomologacionHacienda>;
}

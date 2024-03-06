import {
  IColumnsTable,
  ISelectOptionsTable,
} from "src/app/component/table/table.interface";
import { ILote, ILoteTable } from "./lote.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";

export const LotesData: ILoteData = {
  columns: [
    {
      title: "Código Lote",
      dataIndex: "codigoLote",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcionLote",
      sortActive: true,
      colType: "string",
    },
    {
      title: "N° Renovaciones",
      dataIndex: "numeroRenovaciones",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Sector",
      dataIndex: "codigoSector",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Empacadora",
      dataIndex: "codigoEmpacadora",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Producto",
      dataIndex: "codigoProducto",
      sortActive: true,
      colType: "string",
    },

    {
      title: "Acciones",
      type: "actions",
      width: "200px",
      actions: [
        { icon: "fas fa-map-marker-alt", id: "redirect", tooltip: "Hectareas" },
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
    codigoLote: "",
    codigoEmpacadora: "",
    codigoProducto: "",
    descripcionLote: "",
    hasTotales: "",
    hasCultivo: "",
    hasEnfundadas: "",
    hasProduccion: "",
    numeroRenovaciones: "",
    codigoLocalidad: "",
    tipoPlantacion: "",
    loteActivo: "",
    aplicativoId: "",
    estacion: "",
    fechaActualizacion: "",
    fechaCreacion: "",
    horaCreacion: "",
    horaActualizacion: "",
    menuId: "",
    usuarioCreacion: "",
    usuarioActualizacion: "",
    fechaSiembra: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoSector",
      type: "string",
      maxLength: 12,
      required: true,
      inputMessageError: "Ingrese el codigo del sector",
    },
    {
      id: "descripcion",
      type: "string",
      required: true,
      maxLength: 30,
      inputMessageError: "Ingrese el nombre del sector",
    },
    {
      id: "jefeSector",
      type: "string",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese el Jefe de sector",
    },
  ],
  colsToFilterByText: [
    "codigoHacienda",
    "codigoSector",
    "codigoLote",
    "codigoEmpacadora",
    "codigoProducto",
    "descripcionLote",
    "hasTotales",
    "hasCultivo",
    "hasEnfundadas",
    "hasProduccion",
    "numeroRenovaciones",
    "codigoLocalidad",
    "tipoPlantacion",
    "loteActivo",
  ],
};

interface ILoteData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ILoteTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: Array<keyof ILote>;
}

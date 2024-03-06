import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ITipoCajaTable } from "./tipo-caja.interface";

export const TipoCajaData: ITipoCajaData = {
  columns: [
    {
      title: "Código",
      dataIndex: "claseCodigo",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcionTipoCaja",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Tipo Caja",
      dataIndex: "tipoCaja",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Peso (lb)",
      dataIndex: "pesoLibras",
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
    claseCodigo: "",
    descripcionTipoCaja: "",
    tipoCaja: "",
    pesoLibras: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "claseCodigo",
      type: "string",
      maxLength: 2,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcionTipoCaja",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción de tipo caja",
    },
    {
      id: "tipoCaja",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese el tipo caja",
    },
    {
      id: "pesoLibras",
      type: "number",
      maxLength: 8,
      required: true,
      inputMessageError: "Ingrese el peso en libras",
    },
  ],
};

interface ITipoCajaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ITipoCajaTable;
  tableInputsEditRow: IInputsComponent;
}

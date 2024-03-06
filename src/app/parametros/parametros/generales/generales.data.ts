import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IGeneralTable } from "./generales.interface";

export const GeneralData: IGeneralData = {
  columns: [
    {
      title: "Tipo Param",
      dataIndex: "tipo",
      align: "center",
      sortActive: true,
      colType: "string",
      width: "175px",
    },
    {
      title: "Id param",
      dataIndex: "id",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Núm desde",
      dataIndex: "numDesde",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Núm hasta",
      dataIndex: "numHasta",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Núm otro desde",
      dataIndex: "otroNumDesde",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Núm otro hasta",
      dataIndex: "otroNumHasta",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
    },
    {
      title: "Observación",
      dataIndex: "observacion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Status",
      dataIndex: "status",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Adicional",
      dataIndex: "adicional",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "185px",
      actions: [
        { materialIcon: "edit", id: "delete" },
        { materialIcon: "content_copy", id: "cloneOnTable" },
        { materialIcon: "delete_forever", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    tipo: "",
    id: "",
    descripcion: "",
    numDesde: 0,
    numHasta: 0,
    otroNumDesde: 0,
    otroNumHasta: 0,
    observacion: "",
    status: "",
    adicional: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "tipo",
      type: "string",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "id",
      type: "string",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
    {
      id: "numDesde",
      type: "number",
      maxLength: 7,
    },
    {
      id: "numHasta",
      type: "number",
      maxLength: 7,
    },
    {
      id: "otroNumDesde",
      type: "number",
      maxLength: 7,
    },
    {
      id: "otroNumHasta",
      type: "number",
      maxLength: 7,
    },
    {
      id: "observacion",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
    {
      id: "status",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
    {
      id: "adicional",
      type: "string",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
  ],
};

interface IGeneralData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IGeneralTable;
  tableInputsEditRow: IInputsComponent;
}

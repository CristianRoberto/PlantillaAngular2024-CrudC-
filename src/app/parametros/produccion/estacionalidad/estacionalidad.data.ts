import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { IEstacionalidadTable } from "./estacionalidad.interface";

export const EstacionalidadData: IEstacionalidadData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigoEstacionalidad",
      align: "center",
      sortActive: true,
      colType: "string",
      width: "175px",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Mes Desde",
      dataIndex: "mesDesde",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Mes Hasta",
      dataIndex: "mesHasta",
      sortActive: true,
      colType: "number",
      align: "center",
      width: "165px",
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
    codigoEstacionalidad: "",
    descripcion: "",
    mesDesde: 0,
    mesHasta: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoEstacionalidad",
      type: "number",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "mesDesde",
      type: "number",
      maxLength: 2,
      required: true,
      inputMessageError: "Ingrese el mes desde",
    },
    {
      id: "mesHasta",
      type: "number",
      maxLength: 2,
      required: true,
      inputMessageError: "Ingrese el mes hasta",
    },
  ],
};

interface IEstacionalidadData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IEstacionalidadTable;
  tableInputsEditRow: IInputsComponent;
}

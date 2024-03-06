import { IColumnsTable } from "src/app/component/table/table.interface";
import { IEmpacadoraTable } from "./empacadoras.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const EmpacadoraData: IEmpacadoraData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigoEmpacadora",
      align: "center",
      sortActive: true,
      colType: "number",
      width: "175px",
    },
    {
      title: "Nombre",
      dataIndex: "nombreEmpacadora",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "165px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "editOnTable" },
        { icon: "far fa-copy", id: "cloneOnTable" },
        { icon: "fas fa-trash-alt", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    codigoEmpacadora: "",
    nombreEmpacadora: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoEmpacadora",
      type: "string",
      maxLength: 2,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "nombreEmpacadora",
      type: "string",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese el nombre",
    },
  ],

  colsToFilterByText: ["codigoEmpacadora", "nombreEmpacadora"],
};
interface IEmpacadoraData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IEmpacadoraTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { IPuertoTable } from "./puertos.interface";

export const PuertosData: IPuertosData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigoPuerto",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcionPuerto",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Código interno",
      dataIndex: "codigoIntPuerto",
      sortActive: true,
      align: "center",
      colType: "string",
    },
    {
      title: "Código de pais",
      dataIndex: "codigoPais",
      sortActive: true,
      colType: "string",
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
    codigoPuerto: "",
    descripcionPuerto: "",
    codigoIntPuerto: "",
    codigoPais: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoPuerto",
      type: "string",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el código",
    },
    {
      id: "descripcionPuerto",
      type: "string",
      maxLength: 25,
      required: true,
      inputMessageError: "Ingrese la descripción de puerto",
    },
    {
      id: "codigoPais",
      type: "select",
      maxLength: 40,
      required: true,
      inputMessageError: "Ingrese el código de país",
      options: [
        {
          label: "A - descripcion",
          value: "A",
        },
        {
          label: "X - no",
          value: "X",
        },
      ],
    },
    {
      id: "codigoIntPuerto",
      type: "string",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el código interno puerto",
    },
  ],
};

interface IPuertosData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IPuertoTable;
  tableInputsEditRow: IInputsComponent;
}

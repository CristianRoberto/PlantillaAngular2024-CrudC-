import { IColumnsTable } from "src/app/component/table/table.interface";
import { ISector, ISectorTable } from "./sectores.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";

export const SectoresData: ISectorData = {
  columns: [
    {
      title: "Codigo",
      dataIndex: "codigoSector",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Sector",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Jefe de Sector",
      dataIndex: "jefeSector",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "175px",
      actions: [
        { icon: "fas fa-pencil-alt", id: "redirect", tooltip: "Editar" },
        { icon: "fas fa-map-marker-alt", id: "redirect", tooltip: "Hectareas" },
        { icon: "fas fa-info-circle", id: "redirect", tooltip: "Visualizar" },
        { icon: "far fa-copy", id: "redirect", tooltip: "Clonar" },
        { icon: "fas fa-trash-alt", id: "delete" },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    codigoSector: "",
    descripcion: "",
    jefeSector: "",
    coordenadaNorte: "",
    coordenadaSur: "",
    coordenadaEste: "",
    coordenadaOeste: "",
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
  colsToFilterByText: ["codigoSector", "descripcion", "jefeSector"],
};

interface ISectorData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ISectorTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: Array<keyof ISector>;
}

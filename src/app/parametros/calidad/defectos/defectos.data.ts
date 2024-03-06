import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IDefectoTable } from "./defectos.interface";

export const DefectoData: IDefectoData = {
  columns: [
    {
      title: "Defecto",
      dataIndex: "defecto",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción defecto",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },

    {
      title: "Tipo defecto",
      dataIndex: "tipoDefecto",
      dataIndexesToJoin: ["descripcion", "tipoDefecto"],
      width: "200px",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Grupo Defecto",
      dataIndex: "grupo",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      sortActive: false,
      colType: "number",
      type: "bool",
    },
    {
      title: "Acciones",
      type: "actions",
      width: "175px",
      actions: [
        { materialIcon: "edit", id: "editOnTable", tooltip: "Editar" },
        {
          materialIcon: "delete_forever",
          id: "delete",
          tooltip: "Suprimir ",
        },
      ],
    },
  ],
  defaultEmptyRowTable: {
    defecto: "",
    grupo: "",
    descripcion: "",
    tipoDefecto: "",
    fechaCreacion: "2024-01-04",
    menuId: "MENU001",
    estado: 1,
    usuarioCreacion: "Usuario123",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "defecto",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el defecto",
    },
    {
      id: "grupo",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      allowedKeys: ["isAllowedDescription"],
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "tipoDefecto",
      type: "select",
      required: true,
      placeholder: "Seleccione",
      inputMessageError: "Seleccione",
      options: [],
    },
    {
      id: "descripcionCategoria",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "estado",
      type: "toggle",
    },
  ],
  colsToFilterByText: ["defecto", "grupo", "descripcion", "tipoDefecto"],
};
interface IDefectoData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IDefectoTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

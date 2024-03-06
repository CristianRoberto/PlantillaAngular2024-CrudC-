import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { ItipocontabilizacionTable } from "./tipo-contabilizacion.interface";

export const tipocontabilizacionData: ItipocontabilizacionData = {
  columns: [
    {
      title: "Producto",
      dataIndex: "codigoProducto",
      dataIndexesToJoin: ["codigoProducto", "descripcion"],
      sortActive: true,
      colType: "number",
      width: "500px",
    },

    {
      title: "Tipo",
      dataIndex: "tipoLoteNormal",
      sortActive: true,
      colType: "string",
    },

    {
      title: "Acciones",
      type: "actions",
      width: "150px",
      actions: [
        { materialIcon: "edit", id: "editOnTable", tooltip: "Editar" },
        {
          materialIcon: "cancel",
          id: "delete",
          tooltip: "Eliminar",
        },
      ],
    },
  ],
  defaultEmptyRowTable: {
    codigoProducto: 0,
    descripcion:  "",
    tipoLoteNormal: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoProducto",
      allowedKeys: ["alphanumeric"],
      type: "number",
      disabled: true,
    },

    {
      id: "tipoLoteNormal",
      type: "select",
      required: true,
      placeholder: "Seleccione",
      inputMessageError: "Seleccione",
      options: [],
    },
  ],

  filterFormSearchButtonProps: {
    colWidth: "2",
  },
  colsToFilterByText: [ "codigoProducto","tipoLoteNormal","descripcion"],
  filterFormInput: []
};
interface ItipocontabilizacionData {
  filterFormInput: IFormItems;
  columns: IColumnsTable;
  defaultEmptyRowTable: ItipocontabilizacionTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
  filterFormSearchButtonProps: ISearchButtonForm;
}

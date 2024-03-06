import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IDefectoCalidadTable } from "./defecto-calidad.interface";

export const DefectoCalidadData: IDefectoCalidadData = {
  columns: [
    {
      title: "Transacción",
      dataIndex: "transaccion",
      width: "150px",
      sortActive: true,
      colType: "string",
      align: "center",
    },
    {
      title: "Defecto",
      dataIndex: "defecto",
      sortActive: true,
      colType: "string",
    },

    {
      title: "Calificar Grado",
      dataIndex: "calificarGrado",
      sortActive: true,
      colType: "string",
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
    transaccion: "",
    defecto: "",
    calificarGrado: "1",
    codigoDefecto: "1",
    aplicativoId: "",
    estacion: "",
    fechaActualizacion: "2024-01-25T16:38:19.4371074+00:00",
    fechaCreacion: "2024-01-25T16:38:19.4371074+00:00",
    horaCreacion: "2024-01-25T16:38:19.4371074+00:00",
    horaActualizacion: "2024-01-25T16:38:19.4371074+00:00",
    menuId: "1",
    usuarioCreacion: "1",
    usuarioActualizacion: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "transaccion",
      type: "select",
      maxLength: 20,
      required: true,
      inputMessageError: "Ingrese la transacción",
    },
    {
      id: "defecto",
      type: "select",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el defecto",
    },
    {
      id: "calificarGrado",
      type: "toggle",
      maxLength: 1,
      required: true,
      inputMessageError: "Ingrese calificar grado",
    },
  ],
};
interface IDefectoCalidadData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IDefectoCalidadTable;
  tableInputsEditRow: IInputsComponent;
}

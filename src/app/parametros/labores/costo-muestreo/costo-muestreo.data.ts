import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ICostoMuestreoTable } from "./costo-muestreo.interface";

export const CostoMuestreoData: ICostoMuestroData = {
  columns: [
    {
      title: "Código Hacienda",
      dataIndex: "codigoHacienda",
      align: "center",
      sortActive: true,
      colType: "string",
      width: "175px",
    },
    {
      title: "Tipo de Muestreo",
      dataIndex: "tipoMuestreo",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Costo de Análisis",
      dataIndex: "costoAnalisis",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Costo de Mano de Obra",
      dataIndex: "costoManoObra",
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
    codigoHacienda: "",
    tipoMuestreo: "",
    costoAnalisis: 0,
    costoManoObra: 0,
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoHacienda",
      type: "string",
      maxLength: 4,
      required: true,
      disabled: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "tipoMuestreo",
      type: "select",
      maxLength: 40,
      disabled: true,
      required: true,
      inputMessageError: "Ingrese el tipo de muestreo",
      options: [
        {
          label: "Opcion 1 Suelo",
          value: "Suelo",
        },
        {
          label: "Opcion 2 Raíz",
          value: "Raíz",
        },
        {
          label: "Opcion 3 Hoja",
          value: "Hoja",
        },
      ],
    },
    {
      id: "costoAnalisis",
      type: "number",
      maxLength: 11,
      required: true,
      inputMessageError: "Ingrese el costo de analisis",
    },
    {
      id: "costoManoObra",
      type: "number",
      maxLength: 11,
      required: true,
      inputMessageError: "Ingrese el costo de mano de obra",
    },
  ],
};

interface ICostoMuestroData {
  columns: IColumnsTable;
  defaultEmptyRowTable: ICostoMuestreoTable;
  tableInputsEditRow: IInputsComponent;
}

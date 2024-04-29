import { IColumnsTable } from "src/app/component/table/table.interface";

export const LaboresRealizadasData: ILaboresRealizadasData = {
  columns: [
    {
      title: "Labor",
      dataIndex: "labor",
      align: "center",
      sortActive: true,
    },
    {
      title: "Lote",
      dataIndex: "lote",
      sortActive: true,
    },
    {
      title: "Procesado",
      dataIndex: "procesado",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Total procesado",
      dataIndex: "total_procesado",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Acciones",
      type: "actions",
      actions: [
        /* { icon: "fas fa-pencil-alt", id: "redirectToEdit" }, */
        // { icon: "far fa-copy", id: "" },
        // { icon: "fas fa-exclamation-circle", id: "" },
        /* { icon: "fas fa-trash-alt", id: "deleteRow" }, */
      ],
    },
  ],
};
interface ILaboresRealizadasData {
  columns: IColumnsTable;
}

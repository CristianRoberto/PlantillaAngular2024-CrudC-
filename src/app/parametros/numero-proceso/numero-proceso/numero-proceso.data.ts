import { IColumnsTable } from "src/app/component/table/table.interface";
import {IFormItems,ISearchButtonForm,} from "src/app/component/form/form.interface";
import { IHitoMuestreoTable } from "../../ubicacion/hacienda/hito-muestreo/hito-muestreo.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";


export const NumeroProcesoData: INumeroProcesoData = {
  columns: [
    {
      title: "Hacienda",
      dataIndex: "labor",
      align: "center",
      // sortActive: true,
    },
    {
      title: "Empacadora",
      dataIndex: "lote",
      // sortActive: true,
    },
    {
      title: "Cuadrilla",
      dataIndex: "procesado",
      // sortActive: true,
      colType: "number",
    },
    {
      title: "N° Proceso",
      dataIndex: "total_procesado",
      // sortActive: true,
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
  filterFormInputs: [
    {
      id: "hacienda",
      type: "select",
      label: "Hacienda",
      placeholder: "Seleccione",
      colWidth: "4",
    },
    {
      id: "lote",
      type: "select",
      label: "Lote",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
    },
  ],
  filterFormSearchButtonProps: {
    colWidth: "12",
  },
  colsToFilterByText: [
    "descripcionHacienda",
    "descripcionLote",
    "numeroHito",
    "latitud_GPS",
    "longitud_GPS",
  ],
  defaultEmptyRowTable: undefined,
  tableInputsEditRow: []
};

interface INumeroProcesoData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IHitoMuestreoTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}





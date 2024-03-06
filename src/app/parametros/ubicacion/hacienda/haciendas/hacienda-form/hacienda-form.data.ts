import { IFormItems } from "src/app/component/form/form.interface";

export const HaciendaFormData: IHaciendaFormData = {
  haciendaForm: [
    {
      id: "codigoHacienda",
      type: "string",
      label: "Hacienda",
      labelPosition: "horizontal",
      colWidth: "2",
    },
    {
      id: "nombreHacienda",
      type: "string",
      colWidth: "4",
    },
    {
      id: "productor",
      type: "select",
      label: "Productor",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "lfimple",
      type: "checkbox",
      label: "Implementada",
      labelPosition: "horizontal",
      colWidth: "3",
    },
    {
      id: "lfesgpo",
      type: "checkbox",
      label: "Pertenece al grupo",
      labelPosition: "horizontal",
      colWidth: "3",
    },
  ],
  ubicacionForm: [
    {
      id: "provincia",
      type: "select",
      label: "Provincia",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "canton",
      type: "select",
      label: "Cantón",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "codigoSubZona",
      type: "select",
      label: "Subzona",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "sector",
      type: "select",
      label: "Sector",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
  ],
  ubicacionPNBForm: [
    {
      id: "codigoPNB",
      type: "string",
      label: "Código",
      labelPosition: "horizontal",
      colWidth: "4",
    },
    {
      id: "inscPNB",
      type: "string",
      label: "Código Insc",
      labelPosition: "horizontal",
      colWidth: "4",
    },
    {
      id: "codigo_geografico",
      type: "string",
      label: "Código geografico",
      labelPosition: "horizontal",
      colWidth: "4",
    },
    {
      id: "provincia",
      type: "select",
      label: "Provincia",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "canton",
      type: "select",
      label: "Cantón",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
    {
      id: "sector",
      type: "select",
      label: "Sector",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },
  ],
};
interface IHaciendaFormData {
  haciendaForm: IFormItems;
  ubicacionForm: IFormItems;
  ubicacionPNBForm: IFormItems;
}

import { IFormItems } from "src/app/component/form/form.interface";
export const LoteFormData: ILoteFormData = {
  loteForm: [
    {
      id: "codigoLote",
      type: "number",
      label: "Lote",
      labelPosition: "horizontal",
      colWidth: "2",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo del Lote",
    },
    {
      id: "descripcionLote",
      type: "string",
      colWidth: "4",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción del Lote",
    },
    {
      id: "",
      type: "number",
      label: "Subledger",
      labelPosition: "horizontal",
      colWidth: "6",
      maxLength: 8,
      required: true,
      inputMessageError: "Ingrese un valor",
    },
    {
      id: "",
      type: "string",
      label: "Tipo de plantación",
      labelPosition: "horizontal",
      colWidth: "3",
    },
    {
      id: "",
      type: "select",
      colWidth: "3",
    },
    {
      id: "",
      type: "number",
      label: "Subledger Auxiliar",
      labelPosition: "horizontal",
      colWidth: "6",
      maxLength: 8,
      required: true,
      inputMessageError: "Ingrese un valor",
    },
  ],
  hectareasForm: [
    {
      id: "hasCultivo",
      type: "money",
      label: "Cultivo",
      labelPosition: "horizontal",
      colWidth: "4",
      required: true,
      inputMessageError: "Ingrese un valor",
    },
    {
      id: "hasEnfundadas",
      type: "money",
      label: "Enfundadas",
      labelPosition: "horizontal",
      colWidth: "4",
      required: true,
      inputMessageError: "Ingrese un valor",
    },
    {
      id: "hasProduccion",
      type: "money",
      label: "Producción",
      labelPosition: "horizontal",
      colWidth: "4",
      required: true,
      inputMessageError: "Ingrese un valor",
    },
    {
      id: "hasTotales",
      type: "string",
      label: "Total",
      disabled: true,
      labelPosition: "horizontal",
      colWidth: "4",
    },
    {
      id: "numeroRenovaciones",
      type: "string",
      disabled: true,
      label: "N° renovación",
      labelPosition: "horizontal",
      colWidth: "4",
    },
  ],
  aplicacionForm: [
    {
      id: "",
      type: "number",
      label: "Código",
      disabled: true,
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 3,
    },
    {
      id: "",
      type: "string",
      label: "Descripción",
      disabled: true,
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 30,
    },
  ],
};
interface ILoteFormData {
  loteForm: IFormItems;
  hectareasForm: IFormItems;
  aplicacionForm: IFormItems;
}

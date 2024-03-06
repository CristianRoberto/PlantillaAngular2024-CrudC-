import { IFormItems } from "src/app/component/form/form.interface";

export const ViviendaFormData: IViviendaFormData = {
  viviendaForm: [
    {
      id: "codigoVivienda",
      type: "number",
      label: "Código",
      labelPosition: "horizontal",
      colWidth: "3",
      allowedKeys: ["alphanumeric"],
      maxLength: 2,
      required: true,
    },
    {
      id: "numeroPersonas",
      type: "number",
      label: "Número de personas",
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 3,
      required: true,
    },

    {
      colWidth: "5",
      id: "",
      type: "visualization"
    },
    {
      id: "responsable",
      label: "Responsable",
      labelPosition: "horizontal",
      type: "string",
      colWidth: "5",
      maxLength: 30,
      required: true,
    },
  ],
  tipoViviendaForm: [

    {
      id: "codigoTipoVivienda",
      type: "select",
      label: "Tipo de vivienda",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
    },

  ],
};
interface IViviendaFormData {
  viviendaForm: IFormItems;
  tipoViviendaForm: IFormItems;
}

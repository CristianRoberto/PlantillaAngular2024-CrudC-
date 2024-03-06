import { IFormItems } from "src/app/component/form/form.interface";

export const SectorFormData: ISectorFormData = {
  sectorForm: [
    {
      id: "codigoSector",
      type: "number",
      label: "Sector",
      labelPosition: "horizontal",
      colWidth: "2",
      maxLength: 2,
      required: true,
    },
    {
      id: "descripcion",
      type: "string",
      colWidth: "4",
      maxLength: 30,
      required: true,
    },
  ],
  jefeSectorForm: [
    // {
    //   id: "",
    //   type: "string",
    //   label: "Jefe de sector",
    //   labelPosition: "horizontal",
    //   colWidth: "3",
    // },
    {
      id: "dataJefeSector",
      type: "select",
      label: "Jefe de sector",
      placeholder: "Seleccione",
      labelPosition: "horizontal",
      colWidth: "6",
      options: [
        // Lista de jefes de sector manualmente creada
        {
          value: "12 - Santiago de los Monteros ",
          label: "12 - Santiago de los Monteros ",
        },
        {
          value: "23 - Sebastián Benalcanzar",
          label: "23 - Sebastián Benalcanzar",
        },
        { value: "42 - Pamela Montenegro", label: "42 - Pamela Montenegro" },
        { value: "45 - Andrés Andrade", label: "45 - Andrés Andrade" },
      ],
    },
    {
      id: "",
      label: "Activo/Inactivo",
      type: "toggle",
      colWidth: "1",
    },
  ],
  coordenadas1Form: [
    {
      id: "coordenadaNorte",
      type: "string",
      label: "Norte",
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 30,
      required: true,
    },
    {
      id: "coordenadaSur",
      type: "string",
      label: "Sur",
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 30,
      required: true,
    },
  ],
  coordenadas2Form: [
    {
      id: "coordenadaEste",
      type: "string",
      label: "Este",
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 30,
      required: true,
    },
    {
      id: "coordenadaOeste",
      type: "string",
      label: "Oeste",
      labelPosition: "horizontal",
      colWidth: "4",
      maxLength: 30,
      required: true,
    },
  ],
};
interface ISectorFormData {
  sectorForm: IFormItems;
  jefeSectorForm: IFormItems;
  coordenadas1Form: IFormItems;
  coordenadas2Form: IFormItems;
}

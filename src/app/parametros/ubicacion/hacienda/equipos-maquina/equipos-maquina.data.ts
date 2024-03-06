import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IMaquinariaTable } from "src/app/services/maquinaria/maquinaria.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const EquiposMaquinaData: IEquiposMaquinaData = {
  columns: [
    {
      title: "Hacienda",
      dataIndex: "codigoHacienda",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      sortActive: true,
      colType: "string",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      sortActive: true,
      colType: "string",
    },
    {
      title: "N Serie",
      dataIndex: "numeroSerie",
      sortActive: true,
      colType: "string",
    },
    {
      title: "N Motor",
      dataIndex: "numeroDeMotor",
      sortActive: true,
      colType: "string",
    },
    {
      title: "N Chasis",
      dataIndex: "numeroChasis",
      sortActive: true,
      colType: "string",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    codigoHacienda: "",
    descripcion: "",
    marca: "",
    modelo: "",
    numeroChasis: "",
    numeroDeMotor: "",
    numeroSerie: "",
    tipo: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigoHacienda",
      type: "string",
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
      disabled: true,
    },
    {
      id: "tipo",
      type: "string",
      maxLength: 3,
      disabled: true,
      inputMessageError: "Ingrese el tipo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
    {
      id: "ubicacion",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la ubicación",
    },
    {
      id: "modelo",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese el modelo",
    },
    {
      id: "marca",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese la marca",
    },
    {
      id: "numeroSerie",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese el número de serie",
    },
    {
      id: "numeroDeMotor",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese el número de motor",
    },
    {
      id: "numeroChasis",
      type: "string",
      maxLength: 50,
      required: true,
      inputMessageError: "Ingrese el número de chasis",
    },
  ],
  filterFormInputs: [
    {
      id: "tipo",
      type: "select",
      label: "Tipo",
      colWidth: "4",
      placeholder: "Seleccione",
      required: true,
    },
    {
      id: "hacienda",
      type: "select",
      label: "Hacienda",
      placeholder: "Seleccione",
      colWidth: "4",
    },
  ],
  colsToFilterByText: ["codigo", "descripcion", "ubicacion", "numeroDeZonas"],
  filterFormSearchButtonProps: {
    colWidth: "12",
  },
};
interface IEquiposMaquinaData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IMaquinariaTable;
  tableInputsEditRow: IInputsComponent;
  filterFormInputs: IFormItems;
  filterFormSearchButtonProps: ISearchButtonForm;
  colsToFilterByText: string[];
}

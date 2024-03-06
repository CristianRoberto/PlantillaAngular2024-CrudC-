import { IColumnsTable } from "src/app/component/table/table.interface";
import { IItemCatalogoTable } from "src/app/services/catalogo/catalogo.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { PlantillaAData } from "src/app/plantilla/plantilla A/plantillaA.data";

export const TipoDefectoData: ITipodefectoData = {
  columns: [
    {
      title: "Código",
      dataIndex: "codigo",
      align: "center",
      sortActive: true,
      colType: "number",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
      sortActive: true,
      colType: "string",
    },
    PlantillaAData.defaultActions,
  ],
  defaultEmptyRowTable: {
    catalogoId: "TIPO_DEFECTOS",
    codigo: "",
    descripcion: "",
    isEditingRow: true,
  },
  tableInputsEditRow: [
    {
      id: "codigo",
      type: "string",
      allowedKeys: ["alphanumeric"],
      maxLength: 3,
      required: true,
      inputMessageError: "Ingrese el codigo",
    },
    {
      id: "descripcion",
      type: "string",
      maxLength: 30,
      required: true,
      inputMessageError: "Ingrese la descripción",
    },
  ],
  colsToFilterByText: ["codigo", "descripcion"],
};
interface ITipodefectoData {
  columns: IColumnsTable;
  defaultEmptyRowTable: IItemCatalogoTable;
  tableInputsEditRow: IInputsComponent;
  colsToFilterByText: string[];
}

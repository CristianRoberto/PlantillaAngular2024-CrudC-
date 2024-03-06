import { Component } from "@angular/core";
import { IFormItems } from "src/app/component/form/form.interface";

@Component({
  selector: "plantilla-d-component",
  templateUrl: "./plantillaD.component.html",
})
export class PlantillaDComponent {
  public form: IFormItems = [
    {
      id: "tipo_calendario",
      type: "select",
      label: "Tipo de calendario",
      colWidth: "6",
      placeholder: "Seleccione",
    },
    {
      id: "anio",
      type: "year",
      label: "Año",
      colWidth: "3",
    },
  ];
}

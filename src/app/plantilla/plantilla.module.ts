import { NgModule } from "@angular/core";
import { PlantillaAComponent } from "./plantilla A/plantillaA.component";
import { ComponentsModule } from "../component/component.module";
import { PlantillaBComponent } from "./plantilla B/plantillaB.component";
import { CommonModule } from "@angular/common";
import { PlantillaCComponent } from "./plantilla C/plantillaC.component";
import { PlantillaDComponent } from "./plantilla D/plantillaD.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    PlantillaAComponent,
    PlantillaBComponent,
    PlantillaCComponent,
    PlantillaDComponent,
  ],
  exports: [
    PlantillaAComponent,
    PlantillaBComponent,
    PlantillaCComponent,
    PlantillaDComponent,
  ],
  imports: [ComponentsModule, CommonModule, NgbModule],
})
export class PlantillaModule {}

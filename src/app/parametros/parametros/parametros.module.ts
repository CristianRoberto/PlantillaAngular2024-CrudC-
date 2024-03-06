import { NgModule } from "@angular/core";
import { GeneralesComponent } from "./generales/generales.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { ParametrosRoutes } from "./parametros.routing";

@NgModule({
  declarations: [
    GeneralesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ParametrosRoutes),
    PlantillaModule,
  ],
})
export class ParametrosModule { }
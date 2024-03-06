import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefectosComponent } from "./defectos/defectos.component";
import { RouterModule } from "@angular/router";
import { CalidadRoutes } from "./calidad.routing";
import { ComponentsModule } from "src/app/component/component.module";
import { TipoDefectoComponent } from "./tipo-defecto/tipo-defecto.component";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";

@NgModule({
  declarations: [DefectosComponent, TipoDefectoComponent],
  imports: [
    RouterModule.forChild(CalidadRoutes),
    ComponentsModule,
    PlantillaModule,
    CommonModule,
  ],
})
export class CalidadModule {}

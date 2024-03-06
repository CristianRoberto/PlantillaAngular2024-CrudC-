import { NgModule } from "@angular/core";
import { TransportistaComponent } from "./transportistas/transportista.component";
import { RouterModule } from "@angular/router";
import { CamionesRoutes } from "./camiones.routing";
import { ComponentsModule } from "src/app/component/component.module";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    TransportistaComponent,
    
  ],
  imports: [
    RouterModule.forChild(CamionesRoutes),
    ComponentsModule,
    PlantillaModule,
    CommonModule,
  ],
})
export class CamionesModule { }
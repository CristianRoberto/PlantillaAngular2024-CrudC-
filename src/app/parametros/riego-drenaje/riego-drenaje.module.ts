import { NgModule } from "@angular/core";
import { TensiometroComponent } from "./tensiometro/tensiometro.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RiegoDrenajeRoutes } from "./riego-drenaje.routing";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";

@NgModule({
  declarations: [
    TensiometroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RiegoDrenajeRoutes),
    PlantillaModule,
  ],
})
export class RiegoDrenajeModule {}

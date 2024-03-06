import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { loteRoutes } from "./lote.routing";
import { ComponentsModule } from "src/app/component/component.module";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { LocalizacionComponent } from "../../localizacion/localizacion.component";
@NgModule({
  declarations: [LocalizacionComponent],
  imports: [
    RouterModule.forChild(loteRoutes),
    ComponentsModule,
    PlantillaModule,
  ],
})
export class LoteModule {}

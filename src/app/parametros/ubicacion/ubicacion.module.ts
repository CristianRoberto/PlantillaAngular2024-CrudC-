import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UbicacionRoutes } from "./ubicacion.routing";
import { FumigacionComponent } from "./fumigacion/fumigacion.component";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { ComponentsModule } from "src/app/component/component.module";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";

@NgModule({
  declarations: [FumigacionComponent],
  imports: [
    RouterModule.forChild(UbicacionRoutes),
    ComponentsModule,
    PlantillaModule,
    CatalogoViewComponent,
  ],
})
export class UbicacionModule {}

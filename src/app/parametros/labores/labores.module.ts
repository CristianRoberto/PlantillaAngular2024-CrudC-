import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { LaboresRoutes } from "./labores.routing";
import { CostoMuestreoComponent } from "./costo-muestreo/costo-muestreo.component";
import { LaboresGenericasComponent } from "./labores-genericas/labores-genericas.component";
import { CodigoPlagaComponent } from "./codigo-plaga/codigo-plaga.component";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";

@NgModule({
  declarations: [
    CostoMuestreoComponent,
    LaboresGenericasComponent,
    CodigoPlagaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LaboresRoutes),
    PlantillaModule,
    CatalogoViewComponent,
  ],
})
export class LaboresModule {}

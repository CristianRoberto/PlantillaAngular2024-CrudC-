import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialesRoutes } from "./materiales.routing";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { TipoComponenteComponent } from "./tipo-componente/tipo-componente.component";
import { UnidadComparacionComponent } from "./unidad-comparacion/unidad-comparacion.component";
import { OptimoMaterialesComponent } from "./optimo-materiales/optimo-materiales.component";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";

@NgModule({
  declarations: [
    TipoComponenteComponent,
    UnidadComparacionComponent,
    OptimoMaterialesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialesRoutes),
    PlantillaModule,
    CatalogoViewComponent,
  ],
})
export class MaterialesModule {}

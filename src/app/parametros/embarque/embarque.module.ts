import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmbarqueRoutes } from "./embarque.routing";
import { ComponentsModule } from "src/app/component/component.module";
import { BuquesComponent } from "./buques/buques.component";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { EmbalajesComponent } from "./embalajes/embalajes.component";
import { TipoCajaComponent } from "./tipo-caja/tipo-caja.component";
import { PuertosComponent } from "./puertos/puertos.component";
import { MarcasComponent } from "./marcas/marcas.component";
import { PlasticosComponent } from "./plasticos/plasticos.component";
import { ProductoFrutaComponent } from "./producto-fruta/producto-fruta.component";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";

@NgModule({
  declarations: [
    BuquesComponent,
    EmbalajesComponent,
    TipoCajaComponent,
    PuertosComponent,
    MarcasComponent,
    PlasticosComponent,
    ProductoFrutaComponent,
  ],
  imports: [
    RouterModule.forChild(EmbarqueRoutes),
    ComponentsModule,
    PlantillaModule,
    CatalogoViewComponent,
  ],
})
export class EmbarqueModule {}

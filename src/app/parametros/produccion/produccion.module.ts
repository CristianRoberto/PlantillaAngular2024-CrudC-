import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProduccionRoutes } from "./produccion.routing";
import { CintasColoresComponent } from "./cintas-colores/cintas-colores.component";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { CausalesComponent } from "./causales/causales.component";
import { TaraComponent } from "./tara/tara.component";
import { UnidadEmpaqueComponent } from "./unidad-empaque/unidad-empaque.component";
import { DefectoCalidadComponent } from "./defecto-calidad/defecto-calidad.component";
import { EstacionalidadComponent } from "./estacionalidad/estacionalidad.component";
import { CalendarioBananeroComponent } from "./calendario-bananero/calendario-bananero.component";
import { SemanaPeriodoComponent } from "./semana-periodo/semana-periodo.component";
import { NumeroProcesosComponent } from "./numero-procesos/numero-procesos.component";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";

@NgModule({
  declarations: [
    CintasColoresComponent,
    CausalesComponent,
    TaraComponent,
    UnidadEmpaqueComponent,
    DefectoCalidadComponent,
    EstacionalidadComponent,
    CalendarioBananeroComponent,
    SemanaPeriodoComponent,
    NumeroProcesosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProduccionRoutes),
    PlantillaModule,
    CatalogoViewComponent,
  ],
})
export class ProduccionModule {}

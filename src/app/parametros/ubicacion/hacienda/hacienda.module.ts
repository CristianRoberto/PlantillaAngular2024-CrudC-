import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { ComponentsModule } from "src/app/component/component.module";
import { PlantillaModule } from "src/app/plantilla/plantilla.module";
import { EmpacadorasComponent } from "./empacadoras/empacadoras.component";
import { EquiposMaquinaComponent } from "./equipos-maquina/equipos-maquina.component";
import { HaciendaRoutes } from "./hacienda.routing";
import { HitoMuestreoComponent } from "./hito-muestreo/hito-muestreo.component";
import { SubzonasComponent } from "./subzonas/subzonas.component";
import { TipoViviendaComponent } from "./tipo-vivienda/tipo-vivienda.component";
import { VehiculoComponent } from "./vehiculo/vehiculo.component";
import { ZonasComponent } from "./zonas/zonas.component";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HaciendasComponent } from "./haciendas/haciendas.component";
import { ControlCamionesComponent } from "./embarque/control-camiones/control-camiones.component";
import { JefeSectorLoteComponent } from "./jefe-sector-lote/jefe-sector-lote.component";
import { HaciendasFormComponent } from "./haciendas/hacienda-form/hacienda-form.component";
import { SectoresComponent } from "./sector/sectores.component";
import { SectorFormComponent } from "./sector/sector-form/sector-form.component";
import { LoteComponent } from "./lote/lote.component";
import { LoteFormComponent } from "./lote/lote-form/lote-form.component";
import { TipoContabilizacionComponent } from "./tipo-de-contabilizacion/tipo-contabilizacion.component";
import { CatalogoViewComponent } from "src/app/services/catalogo/catalogo.component";
import { ViviendaComponent } from "./vivienda/vivienda.component";
import { ViviendaFormComponent } from "./vivienda/vivienda-form/vivienda-form.component";
import { HomologacionHaciendaComponent } from "./homologacion-hacienda/homologacion-hacienda.component";
import { HomologacionHaciendaFormComponent } from "./homologacion-hacienda/homologacion-hacienda-form/homologacion-hacienda-form.component";
// import { procesosAgricolasModule } from "./numeros_procesos/numero_procesos.module";
import { procesosAgricolasModule } from ".//numero-proceso/numero-proceso.module";




@NgModule({
  declarations: [
    ZonasComponent,
    SubzonasComponent,
    EmpacadorasComponent,
    EquiposMaquinaComponent,
    TipoViviendaComponent,
    VehiculoComponent,
    HitoMuestreoComponent,
    HaciendasComponent,
    ControlCamionesComponent,
    JefeSectorLoteComponent,
    HaciendasFormComponent,
    SectoresComponent,
    SectorFormComponent,
    LoteComponent,
    LoteFormComponent,
    TipoContabilizacionComponent,
    ViviendaComponent,
    ViviendaFormComponent,
    HomologacionHaciendaComponent,
    HomologacionHaciendaFormComponent,
  ],
  imports: [
    RouterModule.forChild(HaciendaRoutes),
    ComponentsModule,
    PlantillaModule,
    NgSelectModule,
    FormsModule,
    NgIf,
    procesosAgricolasModule,
    NgFor,
    CommonModule,
    CatalogoViewComponent,
  ],
})
export class HaciendaModule {}

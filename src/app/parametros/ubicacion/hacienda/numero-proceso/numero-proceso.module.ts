import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { procesosAgricolasRoutes } from "./numero-proceso.routing";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { SimpleDatepickerBasic } from "../../../../component/datepicker/simpledatepicker.component";
import { Custommonth } from "../../../../component/datepicker/customonth.component";
import { FeatherModule } from "angular-feather";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NumeroProcesoComponent } from "./numero-proceso/numero-proceso.component";
import { ComponentsModule } from "../../../../component/component.module";
 import { FormularioprocesosRealizadasComponent } from "./numero-proceso/formulario-numero_procesos/formulario-numero_procesos.component";
import { PlantillaModule } from "../../../../plantilla/plantilla.module";


@NgModule({
    declarations: [
        NumeroProcesoComponent,
        FormularioprocesosRealizadasComponent,
    ],
    imports: [
        RouterModule.forChild(procesosAgricolasRoutes),
        NgbDatepickerModule,
        SimpleDatepickerBasic,
        Custommonth,
        FeatherModule,
        NgSelectModule,
        NgxDatatableModule,
        NgIf,
        FormsModule,
        NgFor,
        CommonModule,
        ComponentsModule,
        PlantillaModule
    ]
})
export class procesosAgricolasModule {}

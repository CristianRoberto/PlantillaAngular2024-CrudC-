import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LaboresAgricolasRoutes } from "./labores_agricolas.routing";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { SimpleDatepickerBasic } from "../../component/datepicker/simpledatepicker.component";
import { Custommonth } from "../../component/datepicker/customonth.component";
import { FeatherModule } from "angular-feather";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LaboresRealizadasComponent } from "./labores_realizadas/labores-realizadas.component";
import { ComponentsModule } from "../../component/component.module";
import { FormularioLaboresRealizadasComponent } from "./labores_realizadas/formulario-labores-realizadas/formulario-labores-realizadas.component";

@NgModule({
  declarations: [
    LaboresRealizadasComponent,
    FormularioLaboresRealizadasComponent,
  ],
  imports: [
    RouterModule.forChild(LaboresAgricolasRoutes),
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
  ],
})
export class LaboresAgricolasModule {}

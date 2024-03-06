import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ComponentsRoutes } from "./component.routing";
import { InputComponent } from "./input/input.component";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";
import ModalComponent from "./modal/modal.component";
import { BackButtonComponent } from "./back-button/back-button.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import {
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
  NgbPopoverModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormComponent } from "./form/form.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { CalendarComponent } from "./calendar/calendar.component";

@NgModule({
  imports: [
    RouterModule.forChild(ComponentsRoutes),
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgSelectModule,
    NgbPopoverModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [
    InputComponent,
    TableComponent,
    ModalComponent,
    BackButtonComponent,
    DropdownComponent,
    FormComponent,
    TooltipComponent,
    CalendarComponent,
  ],
  exports: [
    InputComponent,
    TableComponent,
    ModalComponent,
    BackButtonComponent,
    DropdownComponent,
    FormComponent,
    TooltipComponent,
    CalendarComponent,
  ],
})
export class ComponentsModule {}

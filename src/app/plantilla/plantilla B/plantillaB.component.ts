import { Component, Input } from "@angular/core";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";

@Component({
  selector: "plantilla-b-component",
  templateUrl: "./plantillaB.component.html",
})
export class PlantillaBComponent {
  /* Plantilla B */
  @Input() public backButtonData: IBackButtonComponent;
  /* Plantilla A */
  @Input({ required: false }) public colIdToDisable: string = "";
  @Input({ required: false }) public keyNameTable: string = "";
  @Input() public colsToFilterByText: string[] = [];
  @Input({ required: false }) public defaultEmptyRowTable: any;
  @Input({ required: false }) public IdRowToClone: string = null;
  @Input() public columnsTable: IColumnsTable = [];
  @Input() public originalDataTable: any[] = [];
  @Input() public placeholderHeaderInputText: string = "";
  @Input() public contexto: any;
  @Input() public onCreateNewRow: string = "onCreateRow";
  @Input() public onCancelEditRowTable: string = "onCancelEditRowTable";
  @Input() public tableInputsEditRow: IInputsComponent;
  @Input() public totalRowsInTable: number = 0;
  @Input() public onChangePaginationTable: string = "onChangePaginationTable";
  @Input() public filterFormInputs: IFormItems = [];
  @Input() public filterFormSearchButtonProps: ISearchButtonForm = null;
  @Input() public titleReport: string = "";
}

import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";

@Component({
  selector: "plantilla-c-component",
  templateUrl: "./plantillaC.component.html",
})
export class PlantillaCComponent implements OnChanges {
  /* Plantilla C */
  @Input({ required: false }) public backButtonData: IBackButtonComponent;
  public onCreateFunction: string = "redirectToCreate";
  public hasBackButtonOptions: boolean = false;
  /* Plantilla A */
  @Input({ required: false }) public keyNameTable: string = "";
  @Input() public colsToFilterByText: string[] = [];
  @Input({ required: false }) public defaultEmptyRowTable: any;
  @Input({ required: false }) public IdRowToClone: string = null;
  @Input() public textButtonDropdowm: string;
  @Input() public columnsTable: IColumnsTable = [];
  @Input() public originalDataTable: any[] = [];
  @Input() public placeholderHeaderInputText: string = "";
  @Input() public contexto: any;
  @Input() public onCreateNewRow: string;
  @Input() public dropdownOptionsExport: IDropdownOptions;
  @Input() public onCancelEditRowTable: string;
  @Input() public tableInputsEditRow: IInputsComponent;
  @Input() public totalRowsInTable: number = 0;
  @Input() public onChangePaginationTable: string;
  @Input() public onCheckTable: string;
  @Input() public filterFormInputs: IFormItems = [];
  @Input() public filterFormSearchButtonProps: ISearchButtonForm = null;
  @Input() public onChangeHeaderFilterForm: string;
  @Input() public titleReport: string = "";
  public ngOnChanges(changes: SimpleChanges): void {
    this.validateHasBackButtonOptions();
  }
  private validateHasBackButtonOptions() {
    this.hasBackButtonOptions = this.backButtonData !== undefined;
  }
}

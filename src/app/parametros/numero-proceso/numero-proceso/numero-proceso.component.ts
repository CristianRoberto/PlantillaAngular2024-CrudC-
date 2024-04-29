import { Component } from '@angular/core';
import { IBackButtonComponent } from 'src/app/component/back-button/back-button.interface';
import { IFormItems, ISearchButtonForm } from 'src/app/component/form/form.interface';
import { IInputsComponent } from 'src/app/component/input/input.interface';
import { IColumnsTable } from 'src/app/component/table/table.interface';
import { NumeroProcesoData } from './numero-proceso.data';

@Component({
  selector: 'app-numero-proceso',
  templateUrl: './numero-proceso.component.html',
  styleUrls: ['./numero-proceso.component.scss']
})
export class NumeroProcesoComponent {
columnsTable: IColumnsTable = NumeroProcesoData.columns; //aqui estoy llamando a la tabla que esta en numero-proceso.data.ts
dataTable: any[]= [];
tableInputsEditRow: IInputsComponent;


 filterFormInputs: IFormItems = NumeroProcesoData.filterFormInputs;
 filterFormSearchButtonProps: ISearchButtonForm =  NumeroProcesoData.filterFormSearchButtonProps;


colsToFilterByText: string[]= [];
defaultEmptyRowTable: any;
IdRowToClone: string;
backButtonData: IBackButtonComponent;

}

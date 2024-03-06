import { Component,  ViewChild,  HostListener, AfterViewInit,
  ElementRef,
  OnInit,
  Input,
} from "@angular/core";

import { NgSelectComponent } from '@ng-select/ng-select';
import { ProcesoService } from "./numero-procesos.service";
import { Router } from "@angular/router";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {  IColumnsTable,  idActionType,} from "src/app/component/table/table.interface";
import { ProcesoData } from './numero_procesos.data';
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ILaborRealizada, ILaborRealizadaTable, IprocesosRealizadas, IprocesosRealizadasTable } from './numero_procesos.interface';
import { UtilService } from 'src/app/services/util/util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TableService } from "src/app/component/table/table.service";





@Component({
  selector: 'app-numero-proceso',
  templateUrl: './numero-proceso.component.html',
  styleUrls: ['./numero-proceso.component.scss']
})
export class NumeroProcesoComponent implements AfterViewInit, OnInit  {

     public selected_hacienda: any;
     public dataTable:  ILaborRealizada[] = [];
     model: NgbDateStruct;
     public columnsTable: IColumnsTable = ProcesoData.columns;
     public tableInputsEditRow: IInputsComponent = ProcesoData.tableInputsEditRow;
     public colsToFilterByText: string[] = ProcesoData.colsToFilterByText;
     public defaultEmptyRowTable: ILaborRealizadaTable = ProcesoData.defaultEmptyRowTable;
     public IdRowToClone: string = null;
     public hasFiltered: boolean = false;

     @Input({ required: true }) public originalDataTable: any[] = [];


     constructor(private router: Router,
      private ProcesoService: ProcesoService,
      private utilService: UtilService ,
      private tableService: TableService,

      ){}



      public ngOnInit(): void {
              this.getDataToTable();
    }


    private getDataToTable() {
      return this.ProcesoService.index().subscribe({
        next: (response) => {
          console.log(response)
          // console.log(response.procesoTypes)
          this.dataTable = response;
          console.log('Data recibida:', this.dataTable); // Aquí se imprime la data recibida en la consola
        //  const response_formatted = this.formatDataToTable(response);
        //  this.dataTable = response_formatted;
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }



    data_haciendas = [
      { codigoHacienda: 10021, hacienda: "Poza de Naranjo" },
      { codigoHacienda: 10022, hacienda: "Paraiso" },
      { codigoHacienda: 10023, hacienda: "J.J." },
      { codigoHacienda: 10024, hacienda: "San Francisco" },
    ];
  
    data_productos = [
      { id: 1, name: "Banano" },
      { id: 2, name: "Maduro" },
      { id: 3, name: "Maracuyá" },
    ];


    onSearch() {
      // this.getDataToTable();
      // this.savefilterPage();
      this.searchByHaciendaAndFecha();
      this.hasFiltered = true;
    }

    //busqueda por filtro  
    private searchByHaciendaAndFecha() {
      // Obtener el valor de hacienda y fecha
      const haciendaValue = this.selected_hacienda;
      const fechaValue = this.inputDateFecha.nativeElement.value;
        
      // Imprimir los parámetros que estás enviando al servicio
      console.log('Hacienda:', haciendaValue);
      console.log('Fecha:', fechaValue);
    
      // // // Llama al servicio para realizar la búsqueda utilizando los parámetros proporcionados
      return this.ProcesoService.searchByCodigoHaciendaAndFecha(haciendaValue, fechaValue).subscribe({
        next: (response) => {
          this.dataTable = response;
          console.log('Data recibida:', this.dataTable); // Aquí se imprime la data recibida en la consola
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
    
    private extractHacienda(option: any): any | null {
      }
  
      /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */

    private onDelete(key: string) {
      if (!this.originalDataTable) {
        console.error("El arreglo originalDataTable no está definido.");
        return;
      }
    
      // Buscar la fila correspondiente a la clave proporcionada
      const rowToDelete = this.dataTable.find((row) => row.id === Number(key));
      console.log(rowToDelete)
      if (!rowToDelete) {
        console.error("No se encontró ninguna fila con la clave proporcionada.");
        return;
      }
    
      // Obtener el código de hacienda de la fila
      const id = rowToDelete.id;
    
      // Llamar al servicio de eliminación con el código de hacienda
      this.ProcesoService.delete(id).subscribe({
        next: (response) => {
          // Actualizar los datos de la tabla después de eliminar la fila
          this.getDataToTable();
          // Mostrar una respuesta modal de éxito
          this.utilService.modalResponse(response, "success");
        },
        error: (error: HttpErrorResponse) =>
          // Mostrar una respuesta modal de error en caso de error
          this.utilService.modalResponse(error.error, "error"),
      });
    }

     /**
   * Función para guardar la creacion o modificacion de la tabla
   *
   * @param rowData Objeto con la informacion de la fila
   * @param finishedClonningRow valida si al finalizar clona o no el ultimo registro
   */
  private onSaveRowTable(rowData: ILaborRealizada, finishedClonningRow: boolean) {
    if (rowData.id) {
      /* Actualizar */
      this.ProcesoService.update(rowData).subscribe({
        next: (response) => {
          
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados Actualizados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              // this.IdRowToClone = response.codigo.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
    
    

   

    
 
  /* Hacer foco sobrehacienda cuando se renderiza la pantalla */
  @ViewChild("inputSelectHacienda") inputSelectHacienda!: NgSelectComponent;
  ngAfterViewInit() {
    this.inputSelectHacienda.focus();
  }
    
     /* Funcion para hacer focus al select de producto */
      @ViewChild("inputSelectHacienda") inputSelectProducto!: NgSelectComponent;
      public onChangeHacienda() {
        this.inputSelectProducto.focus();
      }

            /* Funcion para hacer focus al input de fecha */
        @ViewChild("inputDateFecha") inputDateFecha!: ElementRef;
        public onChangeFecha() {
          this.inputDateFecha.nativeElement.focus();
  }

    /* Funcion para hacer focus al input de fecha */
    @ViewChild("buttonSearch") buttonSearch!: ElementRef;
    public onChangeTrabajador() {
      this.buttonSearch.nativeElement.focus();
    }


}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import Swal from "sweetalert2";
import { HitoMuestreosData } from "./hito-muestreo.data";
import { IHitoMuestreoTable } from "./hito-muestreo.interface";
import { HitoMuestreoService } from "./hito-muestreo.service";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { environment } from "src/environments/environment";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { UtilService } from "src/app/services/util/util.service";
import { HaciendasService } from "../haciendas/haciendas.service";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-hito-muestreo",
  templateUrl: "./hito-muestreo.component.html",
})
export class HitoMuestreoComponent implements OnInit {
  public selected_hacienda: number;
  public selected_lote: number;
  public hasFiltered: boolean = false;
  public columnsTable: IColumnsTable = HitoMuestreosData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    HitoMuestreosData.tableInputsEditRow;
  public filterFormInputs: IFormItems = HitoMuestreosData.filterFormInputs;
  public filterFormSearchButtonProps: ISearchButtonForm =
    HitoMuestreosData.filterFormSearchButtonProps;

  constructor(
    private hitoMuestreoService: HitoMuestreoService,
    private tableService: TableService,
    private haciendaService: HaciendasService,
    private inputService: InputService,
    private validationsService: ValidationsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
    this.getComboHacienda();
  }
  private getComboHacienda() {
    this.haciendaService.index().subscribe({
      next: (response) => {
        const comboHacienda = this.inputService.formatDataToOptions(
          response.haciendaTypes,
          "nombreHacienda",
          "codigoHacienda"
        );
        this.filterFormInputs[0].options = comboHacienda;
      },
    });
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    this.hitoMuestreoService.indexPaginated(1, 100).subscribe({
      next: (response) => {
        this.dataTable = response.hitosMuestreoTypes;
      },
    });
  }

  private deleteEquipoMaquinaria(key: string) {
    this.hitoMuestreoService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private async validateToSave(
    rowData: IHitoMuestreoTable,
    finishedClonningRow: boolean
  ) {
    const loteNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigoLote.toString()
    );
    const numHitoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.numeroHito.toString()
    );
    const latitudGPSNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.latitud_GPS.toString()
    );
    const longitudGPSNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.longitud_GPS.toString()
      );
    if (
      loteNotEmpty &&
      numHitoNotEmpty &&
      latitudGPSNotEmpty &&
      longitudGPSNotEmpty
    ) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
  private onSaveRowTable(rowData: any, finishedClonningRow: boolean) {
    if (rowData.key) {
      /* Actualizar */
      this.hitoMuestreoService.update(rowData).subscribe({
        next: (response) => {
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.hitoMuestreoService.store(rowData).subscribe({
        next: (response) => {
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";

import { tipocontabilizacionData } from "./tipo-contabilizacion.data";
import { TipocontabilizacionService } from "./tipo-contabilizacion.service";
import {
  ItipocontabilizacionTable
} from "./tipo-contabilizacion.interface";
import Swal from "sweetalert2";
import { TableService } from "src/app/component/table/table.service";
import {
  IInputsComponent,
  ISelectOptions,
} from "src/app/component/input/input.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { environment } from "src/environments/environment";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { BackButtonComponentData } from "src/app/component/back-button/back-button.data";
import { FormService } from "src/app/component/form/form.service";
import { HaciendasService } from "../haciendas/haciendas.service";
import { IFormItems } from "src/app/component/form/form.interface";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";
import { ValidationsService } from "src/app/services/validations/validations.service";

@Component({
  templateUrl: "./tipo-contabilizacion.component.html",
})
export class TipoContabilizacionComponent implements OnInit {
  public columnsTable: IColumnsTable = tipocontabilizacionData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent =
    BackButtonComponentData.defaultConf;
  public tableInputsEditRow: IInputsComponent =
    tipocontabilizacionData.tableInputsEditRow;
  private idHacienda: string = "";
  public filterFormInput: IFormItems = tipocontabilizacionData.filterFormInput;
  public IdRowToClone: string = null;
  public colsToFilterByText: string[] =
    tipocontabilizacionData.colsToFilterByText;
  public defaultEmptyRowTable: ItipocontabilizacionTable =
   tipocontabilizacionData.defaultEmptyRowTable;
  public dataCombotipo: ISelectOptions = [];

  constructor(
    private tipocontabilizacionService: TipocontabilizacionService,
    private haciendasService: HaciendasService,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private inputService: InputService,
    private validationsService: ValidationsService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.getIdHaciendasFromRoute();
    this.getDataToTable();
    this.getDataToCombo();
    this.getDetailToBackButtonData();
  }

  private getIdHaciendasFromRoute() {
    this.route.params.subscribe((params: { idHacienda: string }) => {
      this.idHacienda = params.idHacienda.trim();
    });
  }

  private getDetailToBackButtonData() {
    this.haciendasService.getById(this.idHacienda).subscribe({
      next: (response) => {
        this.backButtonData = {
          mainText: response.nombreHacienda,
          onBackFunction: "goBackPage",
          textDetails: [`Producto: ${response.productor}`],
        };
      },
    });
  }

  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.tipocontabilizacionService.index().subscribe({
      next: (response) => {
        this.dataTable = response.tipoContabilizacionTypes;
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private onDelete(key: string) {
    this.tipocontabilizacionService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  /**
   * Función para guardar la creacion o modificacion de la tabla
   *
   * @param rowData Objeto con la informacion de la fila
   * @param finishedClonningRow valida si al finalizar clona o no el ultimo registro
   */
  private onSaveRowTable(
    rowData: ItipocontabilizacionTable,
    finishedClonningRow: boolean
  ) {
    rowData.codigoHacienda = this.idHacienda
    if (rowData.key) {
      /* Actualizar */
      this.tipocontabilizacionService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(true);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoProducto.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      debugger
      this.tipocontabilizacionService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoProducto.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
  /**
   * Función para realizar validaciones antes de crear/actualizar
   *
   * @param rowData Objeto con la informacion de la fila
   * @param finishedClonningRow valida si al finalizar clona o no el ultimo registro
   */
  private async validateToSave(
    rowData: ItipocontabilizacionTable,
    finishedClonningRow: boolean
  ) {
    const aislaNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.tipoLoteNormal
    );
    if (!aislaNotEmpty) {
      return;
    }
    if (
      !environment.modalConfirmation ||
      (await Swal.fire(UtilData.messageToSave)).isConfirmed
    ) {
      this.onSaveRowTable(rowData, finishedClonningRow);
    }
  }

  private getDataToCombo() {
    return this.tipocontabilizacionService.index().subscribe({
      next: (response) => {
        this.dataCombotipo = this.inputService.formatDataToOptions(
          response.tipoContabilizacionTypes,
          "descripcion",
          "codigoProducto"
        );
        this.tableInputsEditRow = this.formService.changeValuePropFormById(
          "tipoLoteNormal",
          this.tableInputsEditRow,
          "options",
          this.dataCombotipo
        );
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  private goBackPage() {
    this.router.navigate([`parametros/ubicacion/hacienda/haciendas/17`]);
  }
}

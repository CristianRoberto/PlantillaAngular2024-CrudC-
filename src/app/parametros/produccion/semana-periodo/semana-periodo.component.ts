import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { SemanaPeriodoService } from "./semana-periodo.service";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { FormService } from "src/app/component/form/form.service";
import { SemanaPeriodoData } from "./semana-periodo.data";
import { ISemanaPeriodoTable } from "./semana-periodo.interface";
import { UtilService } from "src/app/services/util/util.service";
import { environment } from "src/environments/environment";
import { CatalogoService } from "src/app/services/catalogo/catalogo.service";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./semana-periodo.component.html",
})
export class SemanaPeriodoComponent implements OnInit {
  public columnsTable: IColumnsTable = SemanaPeriodoData.columns;
  public filterFormSearchButtonProps: ISearchButtonForm =
    SemanaPeriodoData.filterFormSearchButtonProps;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    SemanaPeriodoData.tableInputsEditRow;
  public filterFormInputs: IFormItems = SemanaPeriodoData.filterFormInputs;
  public colsToFilterByText: string[] = SemanaPeriodoData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: ISemanaPeriodoTable =
    SemanaPeriodoData.defaultEmptyRowTable;

  constructor(
    private catalogosService: CatalogoService,
    private SemanaPeriodoService: SemanaPeriodoService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private formService: FormService,
    private utilService: UtilService,
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
    this.getDataToCombo();
  }
  private getDataToCombo() {
    this.catalogosService.indexItemCatalogo("TIPO_CALENDARIO").subscribe({
      next: (response) => {
        const combo = this.inputService.formatDataToOptionsValueInLabel(
          response.itemCatalogoTypes,
          "codigo",
          "descripcion"
        );
        this.filterFormInputs = this.formService.changeValuePropFormById(
          "codigoCalendario",
          this.filterFormInputs,
          "options",
          combo
        );
      },
    });
  }
  /**
   * Función para filtrar la tabla por el texto obtenido en el input text
   *
   * @param textToFilter texto a filtrar por la tabla
   */
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.SemanaPeriodoService.index().subscribe({
      next: (response) => {
        this.dataTable = response.periodoTypes;
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
    const rowToDelete: ISemanaPeriodoTable = this.dataTable.find(
      (x: ISemanaPeriodoTable) => x.codigoCalendario === key
    );
    this.SemanaPeriodoService.delete(
      rowToDelete.codigoCalendario,
      rowToDelete.semana
    ).subscribe({
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
   */
  private onSaveRowTable(
    rowData: ISemanaPeriodoTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.SemanaPeriodoService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoCalendario;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      console.log(rowData);
      this.SemanaPeriodoService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoCalendario;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }

  private async validateToSave(
    rowData: ISemanaPeriodoTable,
    finishedClonningRow: boolean
  ) {
    const codigoHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.codigoCalendario
      );
    const codigoEmpacadoraNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.descripcionCalendario
      );

    if (codigoHaciendaNotEmpty && codigoEmpacadoraNotEmpty) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        debugger;
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }

  private onChangeHeaderFilterForm(formValue: any) {
    this.catalogosService.indexItemCatalogo("TIPO_CALENDARIO").subscribe({
      next: (response) => {
        const calendario = response.itemCatalogoTypes.find(
          (c) => c.descripcion === formValue.codigoCalendario
        );
        console.log(calendario);
        this.defaultEmptyRowTable = {
          ...SemanaPeriodoData.defaultEmptyRowTable,
          codigoCalendario: calendario ? calendario.codigo : "",
          descripcionCalendario: calendario ? calendario.descripcion : "",
        };
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
}

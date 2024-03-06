import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TipoviviendaData } from "./tipo-vivienda.data";
import { ITipovivienda, ITipoviviendaTable } from "./tipo-vivienda.interface";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import { UtilService } from "src/app/services/util/util.service";
import { TipoviviendaService } from "./tipo-vivienda.service";
import { UtilData } from "src/app/services/util/util.data";
@Component({
  templateUrl: "./tipo-vivienda.component.html",
})
export class TipoViviendaComponent implements OnInit {
  // inputs para plantilla
  public columnsTable: IColumnsTable = TipoviviendaData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    TipoviviendaData.tableInputsEditRow;
  public colsToFilterByText: string[] = TipoviviendaData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: ITipoviviendaTable =
    TipoviviendaData.defaultEmptyRowTable;

  constructor(
    private tipoviviendasService: TipoviviendaService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }

  private getDataToTable() {
    return this.tipoviviendasService.index().subscribe({
      next: (response) => {
        this.dataTable = response.tipoViviendaTypes;
      },
      error: (error: HttpErrorResponse) => {
        this.utilService.modalResponse(error.error, "error");
      },
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private onDelete(key: string) {
    this.tipoviviendasService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private onSaveRowTable(rowData: ITipovivienda, finishedClonningRow: boolean) {
    if (rowData.codigo) {
      /* Actualizar */
      this.tipoviviendasService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Campos actualizados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigo.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.tipoviviendasService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigo.toString();
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
    rowData: ITipovivienda,
    finishedClonningRow: boolean
  ) {
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
    if (!descripcionNotEmpty) {
      return;
    }
    if (
      !environment.modalConfirmation ||
      (await Swal.fire(UtilData.messageToSave)).isConfirmed
    ) {
      this.onSaveRowTable(rowData, finishedClonningRow);
    }
  }
}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { CausalesData } from "./causales.data";
import { ICausalTable } from "./causales.interface";
import { CausalesService } from "./causales.service";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./causales.component.html",
})
export class CausalesComponent implements OnInit {
  public columnsTable: IColumnsTable = CausalesData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = CausalesData.tableInputsEditRow;
  public colsToFilterByText: string[] = CausalesData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: ICausalTable = CausalesData.defaultEmptyRowTable;

  constructor(
    private causalesService: CausalesService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }

  /**
   * Función para filtrar la tabla por el texto obtenido en el input text
   *
   * @param textToFilter texto a filtrar por la tabla
   */
  private getDataToTable() {
    return this.causalesService.indexCausales().subscribe({
      next: (response) => {
        this.dataTable = response.causalesType;
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
    this.causalesService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        Swal.fire({
          icon: "success",
          title: response,
          showConfirmButton: false,
          timer: 1500,
        });
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
  private onSaveRowTable(rowData: ICausalTable, finishedClonningRow: boolean) {
    CausalesData.columns[
      CausalesData.columns.findIndex(
        (input) => input.dataIndex === "otrasCausales"
      )
    ].type = "bool";
    rowData.otrasCausales = rowData.otrasCausales ? 1 : 0;
    if (rowData.key) {
      CausalesData.columns[
        CausalesData.columns.findIndex(
          (input) => input.dataIndex === "otrasCausales"
        )
      ].type = "bool";
      /* Actualizar */
      this.causalesService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.categoria;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      CausalesData.columns[
        CausalesData.columns.findIndex(
          (input) => input.dataIndex === "otrasCausales"
        )
      ].type = "bool";
      this.causalesService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.categoria;
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
    rowData: ICausalTable,
    finishedClonningRow: boolean
  ) {
    //cambio el toggle por el bool para renderizar
    CausalesData.columns[
      CausalesData.columns.findIndex(
        (input) => input.dataIndex === "otrasCausales"
      )
    ].type = "bool";
    const categoriaNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.categoria
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
    if (categoriaNotEmpty && descripcionNotEmpty) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
}

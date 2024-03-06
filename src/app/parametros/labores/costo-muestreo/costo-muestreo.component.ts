import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { CostoMuestreoData } from "./costo-muestreo.data";
import { ICostoMuestreoTable } from "./costo-muestreo.interface";
import { CostoMuestreoService } from "./costo-muestreo.service";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./costo-muestreo.component.html",
})
export class CostoMuestreoComponent implements OnInit {
  public columnsTable: IColumnsTable = CostoMuestreoData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    CostoMuestreoData.tableInputsEditRow;

  constructor(
    private costoMuestreoService: CostoMuestreoService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.costoMuestreoService
      .indexPaginated(1, 10)
      .subscribe((response) => {
        this.dataTable = response.muestreoTypes;
      });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteCostoMuestreo(key: string) {
    const rowToDelete: ICostoMuestreoTable = this.dataTable.find(
      (x: ICostoMuestreoTable) => x.key === key
    );
    this.costoMuestreoService.delete(rowToDelete).subscribe({
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
  private onSaveRowTable(
    rowData: ICostoMuestreoTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.costoMuestreoService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          Swal.fire({
            icon: "success",
            title: "Datos ingresados correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("dfsdf");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.costoMuestreoService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          Swal.fire({
            icon: "success",
            title: "Registro creado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("dfsdf");
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
    rowData: ICostoMuestreoTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigoHacienda
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.tipoMuestreo);
    if (codigoNotEmpty && descripcionNotEmpty) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
}

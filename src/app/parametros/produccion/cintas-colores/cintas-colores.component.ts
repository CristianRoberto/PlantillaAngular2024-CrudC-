import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { CintaColoresData } from "./cintas-colores.data";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableService } from "src/app/component/table/table.service";
import { CintasColoresService } from "./cintas-colores.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { ICintasColoresTable } from "./cintas-colores.interface";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-cintas-colores",
  templateUrl: "./cintas-colores.component.html",
})
export class CintasColoresComponent implements OnInit {
  public columnsTable: IColumnsTable = CintaColoresData.columns;
  public dataTable: any[] = [];
  public colsToFilterByText: string[] = CintaColoresData.colsToFilterByText;
  public IdRowToClone: string = null;
  public tableInputsEditRow: IInputsComponent =
    CintaColoresData.tableInputsEditRow;
  public defaultEmptyRowTable: ICintasColoresTable =
    CintaColoresData.defaultEmptyRowTable;
  constructor(
    private tableService: TableService,
    private validationsService: ValidationsService,
    private cintasColoresService: CintasColoresService,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.getDataToTable();
  }
  /**
   * Función para guardar la creacion o modificacion de la tabla
   *
   * @param rowData Objeto con la informacion de la fila
   */
  private onSaveRowTable(
    rowData: ICintasColoresTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.cintasColoresService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.secuencia.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.cintasColoresService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.secuencia.toString();
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
    rowData: ICintasColoresTable,
    finishedClonningRow: boolean
  ) {
    const codigoColorNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.codigoColores);

    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.descripcionColor
      );
    const secuenciaNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.secuencia.toString()
    );
    if (!(codigoColorNotEmpty && descripcionNotEmpty && secuenciaNotEmpty)) {
      return;
    }
    if (
      !environment.modalConfirmation ||
      (await Swal.fire(UtilData.messageToSave)).isConfirmed
    ) {
      this.onSaveRowTable(rowData, finishedClonningRow);
    }
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private onDelete(key: string) {
    this.cintasColoresService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.cintasColoresService.index().subscribe({
      next: (response) => {
        this.dataTable = response.cintaColorType;
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
}

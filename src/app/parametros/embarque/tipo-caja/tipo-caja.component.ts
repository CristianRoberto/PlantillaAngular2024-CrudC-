import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import Swal from "sweetalert2";
import { TipoCajaData } from "./tipo-caja.data";
import { ITipoCajaTable } from "./tipo-caja.interface";
import { TipoCajaService } from "./tipo-caja.service";
import { UtilService } from "src/app/services/util/util.service";

@Component({
  selector: "root",
  templateUrl: "./tipo-caja.component.html",
})
export class TipoCajaComponent implements OnInit {
  public columnsTable: IColumnsTable = TipoCajaData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = TipoCajaData.tableInputsEditRow;

  constructor(
    private tipoCajaService: TipoCajaService,
    private tableService: TableService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }

  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.tipoCajaService.indexPaginated(1, 100).subscribe((response) => {
      this.dataTable = response;
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteTipoCaja(key: string) {
    this.tipoCajaService.delete(key).subscribe({
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
    rowData: ITipoCajaTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.tipoCajaService.update(rowData).subscribe({
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
              console.log("----cambiar");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.tipoCajaService.store(rowData).subscribe({
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
              console.log("----cambiar");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
}

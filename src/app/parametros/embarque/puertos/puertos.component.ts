import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import Swal from "sweetalert2";
import { PuertosData } from "./puertos.data";
import { IPuertoTable } from "./puertos.interface";
import { PuertosService } from "./puertos.service";
import { UtilService } from "src/app/services/util/util.service";

@Component({
  templateUrl: "./puertos.component.html",
})
export class PuertosComponent implements OnInit {
  public columnsTable: IColumnsTable = PuertosData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = PuertosData.tableInputsEditRow;

  constructor(
    private puertosService: PuertosService,
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
    return this.puertosService.indexPaginated(1, 100).subscribe((response) => {
      this.dataTable = response.puertoTypes;
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deletePuerto(key: string) {
    this.puertosService.delete(key).subscribe({
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
  private onSaveRowTable(rowData: IPuertoTable, finishedClonningRow: boolean) {
    if (rowData.key) {
      /* Actualizar */
      this.puertosService.update(rowData).subscribe({
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
              console.log("cambiar sss");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.puertosService.store(rowData).subscribe({
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
              console.log("cambiar sss");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
}

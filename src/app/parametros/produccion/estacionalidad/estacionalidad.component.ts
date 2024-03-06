import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { EstacionalidadData } from "./estacionalidad.data";
import { IEstacionalidadTable } from "./estacionalidad.interface";
import { EstacionalidadService } from "./estacionalidad.service";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-estacionalidad",
  templateUrl: "./estacionalidad.component.html",
})
export class EstacionalidadComponent implements OnInit {
  public columnsTable: IColumnsTable = EstacionalidadData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    EstacionalidadData.tableInputsEditRow;

  constructor(
    private estacionalidadService: EstacionalidadService,
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
    return this.estacionalidadService
      .indexPaginated(1, 100)
      .subscribe((response) => {
        this.dataTable = response.estacionalidadTypes;
      });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteEstacionalidad(key: string) {
    this.estacionalidadService.delete(key).subscribe({
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
    rowData: IEstacionalidadTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.estacionalidadService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("dsfsdf");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.estacionalidadService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("dsfsdf");
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
    rowData: IEstacionalidadTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigoEstacionalidad
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
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

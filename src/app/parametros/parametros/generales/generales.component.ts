import { Component, OnInit } from "@angular/core";
import { GeneralData } from "./generales.data";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IGeneralTable } from "./generales.interface";
import { environment } from "src/environments/environment";
import { GeneralesService } from "./generales.service";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./generales.component.html",
})
export class GeneralesComponent implements OnInit {
  public columnsTable: IColumnsTable = GeneralData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = GeneralData.tableInputsEditRow;

  constructor(
    private generalesService: GeneralesService,
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
    return this.generalesService
      .indexPaginated(1, 100)
      .subscribe((response) => {
        this.dataTable = response.generalesTypes;
      });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteParamGeneral(key: string) {
    this.generalesService.delete(key).subscribe({
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
  private onSaveRowTable(rowData: IGeneralTable, finishedClonningRow: boolean) {
    if (rowData.key) {
      /* Actualizar */
      this.generalesService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("asfasfd");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.generalesService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("asfasfd");
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
    rowData: IGeneralTable,
    finishedClonningRow: boolean
  ) {
    const tipoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.tipo
    );
    const idNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.id
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
    const observacionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.observacion);
    const statusNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.status
    );
    const adicionalNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.adicional
    );
    if (
      tipoNotEmpty &&
      idNotEmpty &&
      descripcionNotEmpty &&
      observacionNotEmpty &&
      statusNotEmpty &&
      adicionalNotEmpty
    ) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
}

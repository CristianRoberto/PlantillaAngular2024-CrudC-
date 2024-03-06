import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { EmbalajeData } from "./embalajes.data";
import { IEmbalajeTable } from "./embalajes.interface";
import { EmbalajesService } from "./embalajes.service";
import { UtilService } from "src/app/services/util/util.service";
import { FormService } from "src/app/component/form/form.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-embalajes",
  templateUrl: "./embalajes.component.html",
})
export class EmbalajesComponent implements OnInit {
  public columnsTable: IColumnsTable = EmbalajeData.columns;
  public dataTable: any[] = [];
  public colsToFilterByText: string[] = EmbalajeData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: IEmbalajeTable =
    EmbalajeData.defaultEmptyRowTable;

  public tableInputsEditRow: IInputsComponent = EmbalajeData.tableInputsEditRow;

  constructor(
    private embalajeService: EmbalajesService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private utilService: UtilService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.embalajeService.indexEmbalaje().subscribe({
      next: (response) => {
        console.log(response);
        this.dataTable = response.embalajeType;
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
    this.embalajeService.delete(key).subscribe({
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
    rowData: IEmbalajeTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.embalajeService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigo;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      this.embalajeService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigo;
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
    rowData: IEmbalajeTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigo
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

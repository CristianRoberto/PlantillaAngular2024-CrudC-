import { Component, OnInit } from "@angular/core";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { ZonaData } from "./zona.data";
import { ZonasService } from "./zonas.service";
import { IZonaTable } from "./zona.interface";
import Swal from "sweetalert2";
import { TableService } from "src/app/component/table/table.service";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { Router } from "@angular/router";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./zonas.component.html",
})
export class ZonasComponent implements OnInit {
  public columnsTable: IColumnsTable = ZonaData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = ZonaData.tableInputsEditRow;
  public IdRowToClone: string = null;
  public colsToFilterByText: string[] = ZonaData.colsToFilterByText;
  public defaultEmptyRowTable: IZonaTable = ZonaData.defaultEmptyRowTable;

  constructor(
    private zonasService: ZonasService,
    private tableService: TableService,
    private router: Router,
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
    return this.zonasService.index().subscribe({
      next: (response) => {
        this.dataTable = response.zonaTypes;
      },
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private onDelete(key: string) {
    this.zonasService.delete(key).subscribe({
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
  private onSaveRowTable(rowData: IZonaTable, finishedClonningRow: boolean) {
    if (rowData.key) {
      /* Actualizar */
      this.zonasService.update(rowData).subscribe({
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
    } else {
      /* Crear */
      this.zonasService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(true);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
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
    rowData: IZonaTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigo
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
    const ubicacionNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.ubicacion
    );
    if (codigoNotEmpty && descripcionNotEmpty && ubicacionNotEmpty) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
  private clickOnActionTable(
    key: string,
    idAction: idActionType,
    tooltip: string
  ) {
    if (tooltip === "Subzona") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/subzonas/${key.trim()}`,
      ]);
    } else if (tooltip === "Hacienda") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendas/${key.trim()}`,
      ]);
    }
  }
}

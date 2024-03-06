import { Component, OnInit } from "@angular/core";
import { TransportistaData } from "./transportista.data";
import { environment } from "src/environments/environment";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ITransportistaTable } from "./transportista.interface";
import { TransportistaService } from "./transportista.service";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilService } from "src/app/services/util/util.service";
import { Router } from "@angular/router";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./transportista.component.html",
})
export class TransportistaComponent implements OnInit {
  public columnsTable: IColumnsTable = TransportistaData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    TransportistaData.tableInputsEditRow;
  public colsToFilterByText: string[] = TransportistaData.colsToFilterByText;
  public defaultEmptyRowTable: ITransportistaTable =
    TransportistaData.defaultEmptyRowTable;
  public IdRowToClone: string = null;

  constructor(
    private transportistaService: TransportistaService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.transportistaService.index().subscribe({
      next: (response) => {
        this.dataTable = response.transportistasType.map((x) => ({
          ...x,
          traaissor: x.traaissor === "s",
        }));
      },
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteTransportista(key: string) {
    this.transportistaService.delete(key).subscribe({
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
    rowData: ITransportistaTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.traaissor && (rowData.traaissor || rowData.traaissor === "s")) {
      rowData.traaissor = "s";
    } else {
      rowData.traaissor = "n";
    }
    if (rowData.key) {
      /* Actualizar */
      this.transportistaService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(true);
          this.utilService.modalResponse(
            "Datos guardados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.traaissor.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear*/
      this.transportistaService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.traaissor;
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
    rowData: ITransportistaTable,
    finishedClonningRow: boolean
  ) {
    const aislarNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.traaissor.toString()
    );
    if (aislarNotEmpty) {
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
    if (tooltip === "Transportista por camiones") {
      this.router.navigate([
        `parametros/camiones/transportistas/starter/${key.trim()}`,
      ]);
    }
  }
}

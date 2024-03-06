import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { DefectoCalidadData } from "./defecto-calidad.data";
import { DefectoCalidadService } from "./defecto-calidad.service";
import { IDefectoCalidadTable } from "./defecto-calidad.interface";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { TableService } from "src/app/component/table/table.service";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import { UtilService } from "src/app/services/util/util.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-defecto-calidad",
  templateUrl: "./defecto-calidad.component.html",
})
export class DefectoCalidadComponent implements OnInit {
  public columnsTable: IColumnsTable = DefectoCalidadData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    DefectoCalidadData.tableInputsEditRow;

  constructor(
    private defectoCalidadsService: DefectoCalidadService,
    private tableService: TableService,
    private utilService: UtilService,
    private validationsService: ValidationsService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    this.defectoCalidadsService.indexPaginated(1, 100).subscribe((response) => {
      this.dataTable = response.defectosCalidadType;
    });

    const transac = DefectoCalidadData.tableInputsEditRow.find(
      (x) => x.id == "transaccion" && x.type === "select"
    );
    if (transac) {
      transac.options = [
        { label: "CAMBIAR CLAVE", value: "AUD_CAMBIARCLAVE" },
        { label: "SEGUIMIENTO POR COMPANIA", value: "AUD_SEGUIXCIA" },
        { label: "SEGUIMIENTO POR TIPO DE DOC", value: "AUD_SEGUIXTIPO" },
        { label: "TRANS ANULADAS X DOC", value: "AUD_TRANANULXDOC" },
        { label: "TRANS ANULADAS X USUARIO", value: "AUD_TRANANULXUSU" },
      ];
    }

    const defec = DefectoCalidadData.tableInputsEditRow.find(
      (x) => x.id == "defecto" && x.type === "select"
    );
    if (defec) {
      defec.options = [
        { label: "MANCHA DE MADUREZ", value: "05" },
        { label: "ALTERADOS", value: "06" },
        { label: "DEDOS MAL FORMADO", value: "07" },
        { label: "CODIGO ILEGIBLE", value: "08" },
        { label: "OTROS DAÑOS", value: "09" },
      ];
    }
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private deleteDefectoCalidad(key: string) {
    this.defectoCalidadsService.delete(key).subscribe({
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
  private onSaveRowTable(
    rowData: IDefectoCalidadTable,
    finishedClonningRow: boolean
  ) {
    rowData.calificarGrado = rowData.calificarGrado ? "1" : "0";
    if (rowData.key) {
      /* Actualizar */
      this.defectoCalidadsService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.defectoCalidadsService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          Swal.fire({
            icon: "success",
            title: "Registro creado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDataToTable();
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
   */
  private async validateToSave(
    rowData: IDefectoCalidadTable,
    finishedClonningRow: boolean
  ) {
    const transaccionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.transaccion);
    const defectoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.defecto
    );

    if (transaccionNotEmpty && defectoNotEmpty) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
}

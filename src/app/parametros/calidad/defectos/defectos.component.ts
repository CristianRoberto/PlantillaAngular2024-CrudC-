import { Component } from "@angular/core";
import { DefectoData } from "./defectos.data";
import {
  IInputsComponent,
  ISelectOptions,
} from "src/app/component/input/input.interface";
import { environment } from "src/environments/environment";
import { FormService } from "src/app/component/form/form.service";
import { UtilService } from "src/app/services/util/util.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { DefectosService as DefectoService } from "./defectos.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InputService } from "src/app/component/input/input.service";
import { CatalogoService } from "src/app/services/catalogo/catalogo.service";
import { IDefectoTable } from "./defectos.interface";
import Swal from "sweetalert2";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./defectos.component.html",
})
export class DefectosComponent {
  public columnsTable: IColumnsTable = DefectoData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent = DefectoData.tableInputsEditRow;
  public colsToFilterByText: string[] = DefectoData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: IDefectoTable = DefectoData.defaultEmptyRowTable;
  dataComboDefecto: ISelectOptions = [];
  
  constructor(
    private validationsService: ValidationsService,
    private utilService: UtilService,
    private tableService: TableService,
    private catalogosService: CatalogoService,
    private defectoService: DefectoService,
    private inputService: InputService,
    private formService: FormService
  ) {}
  ngOnInit(): void {
    this.getDataToCombo();
    this.getDataToTable();
  }

  private getDataToTable() {
    return this.defectoService.index().subscribe({
      next: (response) => {
        response.defectoType.forEach((defecto) => {
          defecto.estado = defecto.estado === "A" ? 1 : 0;
        });
        this.dataTable = response.defectoType;
      },
      error: (error: HttpErrorResponse) => {
        this.utilService.modalResponse(error.error, "error");
      },
    });
  }
  /**
   * Funcion para eliminar un registro
   *
   * @param key Id del registro
   */
  private onDelete(key: string) {
    this.defectoService.delete(key).subscribe({
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
  private onSaveRowTable(rowData: IDefectoTable, finishedClonningRow: boolean) {
    rowData.estado = Number(rowData.estado) === 1 ? "A" : "I";
    if (rowData.key) {
      /* Actualizar */
      this.defectoService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.defecto;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.defectoService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(true);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.defecto;
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
    rowData: IDefectoTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.defecto
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.descripcion);
    const grupoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.grupo
    );

    const categoriaNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.tipoDefecto
    );
    if (
      !(
        codigoNotEmpty &&
        descripcionNotEmpty &&
        grupoNotEmpty &&
        categoriaNotEmpty
      )
    ) {
      return;
    }
    if (
      !environment.modalConfirmation ||
      (await Swal.fire(UtilData.messageToSave)).isConfirmed
    ) {
      this.onSaveRowTable(rowData, finishedClonningRow);
    }
  }

  private getDataToCombo() {
    return this.catalogosService.indexItemCatalogo("TIPO_DEFECTOS").subscribe({
      next: (response) => {
        this.dataComboDefecto = this.inputService.formatDataToOptions(
          response.itemCatalogoTypes,
          "descripcion",
          "codigo"
        );
        this.tableInputsEditRow = this.formService.changeValuePropFormById(
          "tipoDefecto",
          this.tableInputsEditRow,
          "options",
          this.dataComboDefecto
        );
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
}

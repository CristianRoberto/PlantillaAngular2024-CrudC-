import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TaraData } from "./tara.data";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { ITaraTable } from "./tara.interface";
import { TaraService } from "./tara.service";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { FormService } from "src/app/component/form/form.service";
import { HaciendasService } from "../../ubicacion/hacienda/haciendas/haciendas.service";
import { UtilService } from "src/app/services/util/util.service";
import { environment } from "src/environments/environment";
import { EmpacadoraService } from "../../ubicacion/hacienda/empacadoras/empacadora.service";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  selector: "app-tara",
  templateUrl: "./tara.component.html",
})
export class TaraComponent implements OnInit {
  public columnsTable: IColumnsTable = TaraData.columns;
  public filterFormSearchButtonProps: ISearchButtonForm =
    TaraData.filterFormSearchButtonProps;
  public dataTable: any[] = [];
  public ubicacionForm: IFormItems;
  public tableInputsEditRow: IInputsComponent = TaraData.tableInputsEditRow;
  public filterFormInputs: IFormItems = TaraData.filterFormInputs;
  public colsToFilterByText: string[] = TaraData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: ITaraTable = TaraData.defaultEmptyRowTable;

  constructor(
    private taraService: TaraService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private formService: FormService,
    private haciendasService: HaciendasService,
    private utilService: UtilService,
    private empacadorasServices: EmpacadoraService,
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
    this.getDataToCombo();
  }

  private getDataToCombo() {
    this.haciendasService
      .index()
      .subscribe({
        next: (response) => {
          const combo = this.inputService.formatDataToOptionsValueInLabel(
            response.haciendaTypes,
            "nombreHacienda",
            "codigoHacienda"
          );
          //filterformInput buscalo en el .data
          this.filterFormInputs = this.formService.changeValuePropFormById(
            "codigoHacienda",
            this.filterFormInputs,
            "options",
            combo
          );
        },
      })
      .add(() => {
        //aca empieza el otro combo select de empacadora
        this.empacadorasServices.index().subscribe({
          next: (response) => {
            const combo = this.inputService.formatDataToOptionsValueInLabel(
              //En este orden
              response.empacadoraTypes,
              "nombreEmpacadora",
              "codigoEmpacadora"
            );
            this.filterFormInputs = this.formService.changeValuePropFormById(
              "codigoEmpacadora",
              this.filterFormInputs,
              "options",
              combo
            );
          },
        });
      });
  }

  /**
   * Función para filtrar la tabla por el texto obtenido en el input text
   *
   * @param textToFilter texto a filtrar por la tabla
   */
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.taraService.index().subscribe({
      next: (response) => {
        this.dataTable = response.taraTypes;
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
    const rowToDelete: ITaraTable = this.dataTable.find(
      (x: ITaraTable) => x.codigoHacienda === key
    );

    console.log(rowToDelete.codigoEmpacadora);
    this.taraService
      .delete(rowToDelete.codigoHacienda, rowToDelete.codigoEmpacadora)
      .subscribe({
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
   */
  private onSaveRowTable(rowData: ITaraTable, finishedClonningRow: boolean) {
    if (rowData.key) {
      this.taraService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoHacienda;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      this.taraService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoHacienda;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }

  private async validateToSave(
    rowData: ITaraTable,
    finishedClonningRow: boolean
  ) {
    const codigoHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.codigoHacienda);
    const codigoEmpacadoraNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.codigoEmpacadora
      );
    const taraRacimoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.taraRacimo.toString()
    );
    if (
      codigoHaciendaNotEmpty &&
      codigoEmpacadoraNotEmpty &&
      taraRacimoNotEmpty
    ) {
      if (
        !environment.modalConfirmation ||
        (await Swal.fire(UtilData.messageToSave)).isConfirmed
      ) {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }

  private onChangeHeaderFilterForm(formValue: any) {
    this.haciendasService.index().subscribe({
      next: (response) => {
        const hacienda = response.haciendaTypes.find(
          (h) => h.codigoHacienda === formValue.codigoHacienda
        );
        console.log(hacienda);
        this.defaultEmptyRowTable = {
          ...TaraData.defaultEmptyRowTable,
          codigoHacienda: formValue.codigoHacienda,
          codigoEmpacadora: formValue.codigoEmpacadora,
        };
      },
    });
  }
}

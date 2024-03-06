import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ProcesoData } from "./numero-procesos.data";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { IProcesoTable } from "./numero-procesos.interface";
import { ProcesoService } from "./numero-procesos.service";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { HaciendasService } from "../../ubicacion/hacienda/haciendas/haciendas.service";
import { IHaciendaResponse } from "../../ubicacion/hacienda/haciendas/haciendas.interface";
import { UtilService } from "src/app/services/util/util.service";
import { environment } from "src/environments/environment";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./numero-procesos.component.html",
})
export class NumeroProcesosComponent implements OnInit {
  public columnsTable: IColumnsTable = ProcesoData.columns;
  public filterFormSearchButtonProps: ISearchButtonForm =
    ProcesoData.filterFormSearchButtonProps;
  public dataTable: any[] = [];
  public dropdownOptionsExport: IDropdownOptions =
    ProcesoData.dropdownOptionsExport;
  public tableInputsEditRow: IInputsComponent = ProcesoData.tableInputsEditRow;
  public filterFormInputs: IFormItems = ProcesoData.filterFormInputs;

  constructor(
    private ProcesoService: ProcesoService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private haciendasService: HaciendasService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.tableService.initializeAll();
    this.getDataToTable();
    this.obtenerHaciendasParaFiltro();
  }
  obtenerHaciendasParaFiltro() {
    this.haciendasService.indexPaginated(1, 10).subscribe({
      next: (response: IHaciendaResponse) => {
        const haciendasOptions = response.haciendaTypes.map((hacienda) => ({
          label: hacienda.nombreHacienda,
          value: hacienda.codigoHacienda,
        }));

        // Encuentra el objeto filterFormInputs en ProcesoData y actualiza las opciones
        const filterFormInputsIndex = ProcesoData.filterFormInputs.findIndex(
          (input) => input.id === "codigoHacienda"
        );
        if (filterFormInputsIndex !== -1) {
          ProcesoData.filterFormInputs[filterFormInputsIndex].options =
            haciendasOptions;
        } else {
          console.error(
            'No se encontró el objeto filterFormInputs en ProcesoData con el id "codigoHacienda"'
          );
        }

        // Resto del código...
      },
      error: (error) => {
        console.error("Error al obtener las haciendas", error);
      },
    });
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.ProcesoService.indexPaginated(1, 100).subscribe({
      next: (response) => {
        this.dataTable = response.procesoTypes;
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
  private deleteProceso(key: string) {
    const rowToDelete: IProcesoTable = this.dataTable.find(
      (x: IProcesoTable) => x.key === key
    );
    this.ProcesoService.delete(
      rowToDelete.codigoHacienda,
      rowToDelete.fecha,
      rowToDelete.codigoEmpacador,
      rowToDelete.codigoCuadrilla
    ).subscribe({
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
  private onSaveRowTable(rowData: IProcesoTable, finishedClonningRow: boolean) {
    if (rowData.key) {
      this.ProcesoService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("cambiar");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      this.ProcesoService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              console.log("cambiar");
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }

  private async validateToSave(
    rowData: IProcesoTable,
    finishedClonningRow: boolean
  ) {
    const codigoHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.codigoHacienda);
    const codigoEmpacadoraNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.codigoEmpacador);
    const fechaNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.fecha.toString()
    );
    const codigoCuadrillaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.codigoCuadrilla.toString()
      );
    if (
      codigoHaciendaNotEmpty &&
      codigoEmpacadoraNotEmpty &&
      fechaNotEmpty &&
      codigoCuadrillaNotEmpty
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

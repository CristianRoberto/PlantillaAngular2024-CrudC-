import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import {
  IInputsComponent,
  ISelectOptions,
} from "src/app/component/input/input.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { TensiometroData } from "./tensiometro.data";
import { ITensiometro, ITensiometroTable } from "./tensiometro.interface";
import { TensiometroService } from "./tensiometro.service";
import { FormService } from "src/app/component/form/form.service";
import { UtilService } from "src/app/services/util/util.service";
import { HaciendasService } from "../../ubicacion/hacienda/haciendas/haciendas.service";
import { LotesServices } from "./lote.services";
import { ILote } from "./lote.interface";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";
import { SectoresService } from "../../ubicacion/hacienda/sector/sectores.service";

@Component({
  templateUrl: "./tensiometro.component.html",
})
export class TensiometroComponent implements OnInit {
  public columnsTable: IColumnsTable = TensiometroData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    TensiometroData.tableInputsEditRow;
  public defaultEmptyRowTable: ITensiometroTable =
    TensiometroData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  public colsToFilterByText: string[] = TensiometroData.colsToFilterByText;
  dataComboDefecto: ISelectOptions = [];
  public filterFormInputs: IFormItems = TensiometroData.filterFormInputs;

  public filterFormSearchButtonProps: ISearchButtonForm =
    TensiometroData.filterFormSearchButtonProps;

  constructor(
    private tensiometroService: TensiometroService,
    private tableService: TableService,
    private validationsService: ValidationsService,
    private formService: FormService,
    private utilService: UtilService,
    private sectorService: SectoresService,
    private haciendasService: HaciendasService,
    private lotesService: LotesServices,
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
        this.lotesService.indexLote().subscribe({
          next: (response) => {
            const combo =
              this.inputService.formatDataToOptionsValueInLabel<ILote>(
                //En este orden
                response.loteType,
                "codigoLote",
                "descripcionLote"
              );
            this.filterFormInputs =
              this.formService.changeValuePropFormById<ILote>(
                "codigoLote",
                this.filterFormInputs,
                "options",
                combo
              );
          },
        });
      });
  }
  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.tensiometroService.index().subscribe({
      next: (response) => {
        this.dataTable = response.tensiometroTypes;
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
    const rowToDelete: ITensiometroTable = this.dataTable.find(
      (x: ITensiometroTable) => x.codigoHacienda === key
    );
    this.tensiometroService.delete(rowToDelete).subscribe({
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
    rowData: ITensiometroTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.tensiometroService.update(rowData).subscribe({
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
      /* Crear */
      const nuevoTensiometro: ITensiometro = {
        codigoHacienda: "2111",
        hacienda: "Zulema 3",
        codigoSector: 1,
        sector: "SECTOR 2",
        codigoLote: 15,
        lote: "LOTE 15",
        numeroEstacion: 3,
        profundidad: 13,
        // ... completar con otros valores según sea necesario
      };
      this.tensiometroService.store(nuevoTensiometro).subscribe({
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
  /**
   * Función para realizar validaciones antes de crear/actualizar
   *
   * @param rowData Objeto con la informacion de la fila
   * @param finishedClonningRow valida si al finalizar clona o no el ultimo registro
   */
  private async validateToSave(
    rowData: ITensiometroTable,
    finishedClonningRow: boolean
  ) {
    const codigoHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(rowData.codigoHacienda);
    if (codigoHaciendaNotEmpty) {
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
        this.lotesService.indexLote().subscribe({
          next: (response) => {
            let lote = response.loteType.find(
              (l) => l.descripcionLote === formValue.codigoLote
            );
            this.sectorService
              .indexByHacienda(formValue.codigoHacienda)
              .subscribe({
                next: (response) => {
                  let sector = response.sectorTypes.find(
                    (s) => s.codigoHacienda === formValue.codigoHacienda
                  );

                  this.defaultEmptyRowTable = {
                    ...TensiometroData.defaultEmptyRowTable,
                    codigoHacienda: formValue.codigoHacienda,
                    hacienda: hacienda ? hacienda.nombreHacienda : "",
                    lote: lote ? lote.codigoLote.toString() : "",
                    codigoLote: formValue.codigoLote,
                    codigoSector: lote ? lote.codigoSector : 0,
                    sector: sector ? sector.descripcion : "",
                  };
                },
              });
            debugger;
            this.defaultEmptyRowTable = {
              ...TensiometroData.defaultEmptyRowTable,
              codigoHacienda: formValue.codigoHacienda,
              hacienda: hacienda ? hacienda.nombreHacienda : "",
              lote: lote ? lote.codigoLote.toString() : "",
              codigoLote: formValue.codigoLote,
              codigoSector: lote ? lote.codigoSector : 0,
            };
          },
          error: (error: HttpErrorResponse) =>
            this.utilService.modalResponse(error.error, "error"),
        });

        this.defaultEmptyRowTable = {
          ...TensiometroData.defaultEmptyRowTable,
          codigoHacienda: formValue.codigoHacienda,
          hacienda: hacienda ? hacienda.nombreHacienda : "",
          lote: hacienda ? hacienda.nombreHacienda : "",
          codigoLote: formValue.codigoLote,
        };
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  private onSubmitForm(formValue: any) {
    console.log("-------formValue--------onSubmitForm", formValue);
  }
}

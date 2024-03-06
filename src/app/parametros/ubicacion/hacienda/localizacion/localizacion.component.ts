import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { LocalizacionData } from "./localizacion.data";
import {
  IInputsComponent,
  ISelectOptions,
} from "src/app/component/input/input.interface";
import { environment } from "src/environments/environment";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { TableService } from "src/app/component/table/table.service";
import { ILocalizacionTable } from "./localizacion.interface";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilService } from "src/app/services/util/util.service";
import { LocalizacionService } from "./localizacion.service";
import { HaciendasService } from "../haciendas/haciendas.service";
import { IHacienda } from "../haciendas/haciendas.interface";
import { LotesServices } from "src/app/parametros/riego-drenaje/tensiometro/lote.services";
import { ILote } from "src/app/parametros/riego-drenaje/tensiometro/lote.interface";
import { SectoresService } from "../sector/sectores.service";
import { ISector } from "../sector/sectores.interface";
import { FormService } from "src/app/component/form/form.service";
import { InvFactService } from "src/app/services/invfact/invfact.service";
import { IInvConsultarLocaciones } from "src/app/services/invfact/invfact.interface";
import { InputService } from "src/app/component/input/input.service";
import { UtilData } from "src/app/services/util/util.data";
@Component({
  selector: "app-localizacion",
  templateUrl: "./localizacion.component.html",
})
export class LocalizacionComponent implements OnInit {
  public columnsTable: IColumnsTable = LocalizacionData.columns;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    LocalizacionData.tableInputsEditRow;
  public colsToFilterByText: string[] = LocalizacionData.colsToFilterByText;
  public IdRowToClone: string = null;
  public defaultEmptyRowTable: ILocalizacionTable =
    LocalizacionData.defaultEmptyRowTable;
  dataPruebasHaciendas: IHacienda[];
  dataCodigoLote: ILote[];
  dataSector: ISector[];
  dataComboCostLocation: ISelectOptions = [];
  constructor(
    private tableService: TableService,
    private lotesServices: LotesServices,
    private sectorService: SectoresService,
    private haciendasService: HaciendasService,
    private localizacionService: LocalizacionService,
    private validationsService: ValidationsService,
    private utilService: UtilService,
    private formService: FormService,
    private inputService: InputService,
    private invFactService: InvFactService
  ) {}

  ngOnInit(): void {
    this.getDataToCombo();
    this.getDataToTable();
    this.datosPruebasHacienda();
    this.datosPruebaLote();
    this.datosSector();
  }
  private getDataToCombo() {
    this.invFactService
      .index<IInvConsultarLocaciones>("ConsultarLocaciones")
      .subscribe({
        next: (response) => {
          this.dataComboCostLocation = this.inputService.formatDataToOptions(
            response,
            "location",
            "costCenter"
          );
          this.tableInputsEditRow = this.formService.changeValuePropFormById(
            "costCenter",
            this.tableInputsEditRow,
            "options",
            this.dataComboCostLocation
          );
        },
        error: (error: HttpErrorResponse) => {
          this.utilService.modalResponse(error.error, "error");
        },
      });
  }

  /**
   * Función para obtener todos los datos de la tabla
   */
  private getDataToTable() {
    return this.localizacionService.index().subscribe({
      next: (response) => {
        this.dataTable = response.localizacionType;
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
    //logica propuesta hasta solucionar otra forma
    const rowToDelete: ILocalizacionTable = this.dataTable.find(
      (x: ILocalizacionTable) => x.codigoLocalidad === key
    );
    this.localizacionService
      .deleteItemLocalizacion(rowToDelete.costCenter, rowToDelete.location)
      .subscribe({
        next: (response) => {
          this.getDataToTable();
          this.utilService.modalResponse(response, "success");
        },
        error: (error: HttpErrorResponse) => {
          this.utilService.modalResponse(error.error, "error");
        },
      });
  }
  /**
   * Función para guardar la creacion o modificacion de la tabla
   *
   * @param rowData Objeto con la informacion de la fila
   * @param finishedClonningRow valida si al finalizar clona o no el ultimo registro
   */
  private onSaveRowTable(
    rowData: ILocalizacionTable,
    finishedClonningRow: boolean
  ) {
    if (rowData.key) {
      /* Actualizar */
      this.localizacionService.updateItemLocalizacion(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.costCenter;
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      const codigoHacienda: IHacienda = this.dataPruebasHaciendas[0];
      if (!codigoHacienda) {
        return alert("CODIGO HACIENDA NO EXISTE");
      }
      rowData.codigoHacienda = codigoHacienda.codigoHacienda;

      const codigoLote: ILote = this.dataCodigoLote[0];
      if (!codigoLote) {
        return alert("CODIGO LOTE NO EXISTE");
      }
      rowData.codigoLote = codigoLote.codigoLote;

      const codigoSector: ISector = this.dataSector[0];
      if (!codigoSector) {
        return alert("CODIGO DE SECOTR NO EXISTE");
      }
      rowData.codigoSector = codigoSector.codigoSector;
      //logica para reasignar los valores
      const comboCostLocation = this.dataComboCostLocation.find(
        (constLocation) => constLocation.value === rowData.costCenter
      );
      rowData.location = comboCostLocation.label;
      rowData.costCenter = comboCostLocation.value;
      this.localizacionService.storeItemLocalizacion(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.costCenter;
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.utilService.modalResponse(error.error, "error");
        },
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
    rowData: ILocalizacionTable,
    finishedClonningRow: boolean
  ) {
    const costCenterNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.costCenter
    );
    const largoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.largo.toString()
    );
    const anchoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.ancho.toString()
    );

    const capacidadNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.capacidad.toString()
    );
    if (
      !(
        costCenterNotEmpty &&
        largoNotEmpty &&
        anchoNotEmpty &&
        capacidadNotEmpty
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

  // FUNCIONES PARA PROBAR SERVICIO ESTAS FUNCIONES SERAN
  //ELIMINADAS UNA VEZ Q SE IMPLENTE LAS VERDADERAS
  public datosPruebasHacienda() {
    this.haciendasService.index().subscribe({
      next: (response) => {
        this.dataPruebasHaciendas = response.haciendaTypes;
      },
      error: (error: HttpErrorResponse) => {
        this.utilService.modalResponse(error.error, "error");
      },
    });
  }
  public datosPruebaLote() {
    this.lotesServices.indexLote().subscribe({
      next: (response) => {
        this.dataCodigoLote = response.loteType;
      },
      error: (error: HttpErrorResponse) => {
        this.utilService.modalResponse(error.error, "error");
      },
    });
  }
  public datosSector() {
    this.sectorService.index().subscribe({
      next: (response) => {
        this.dataSector = response.sectorTypes;
      },
      error: (error: HttpErrorResponse) => {
        this.utilService.modalResponse(error.error, "error");
      },
    });
  }
}

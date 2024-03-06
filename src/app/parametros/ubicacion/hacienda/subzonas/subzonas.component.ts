import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { SubzonaData } from "./subzonas.data";
import { ISubzonaTable } from "./subzonas.interface";
import { SubzonaService } from "./subzonas.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableService } from "src/app/component/table/table.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { ZonasService } from "../zonas/zonas.service";
import { BackButtonComponentData } from "src/app/component/back-button/back-button.data";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./subzonas.component.html",
})
export class SubzonasComponent implements OnInit {
  public columnsTable: IColumnsTable = SubzonaData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent =
    BackButtonComponentData.defaultConf;
  public tableInputsEditRow: IInputsComponent = SubzonaData.tableInputsEditRow;
  public colsToFilterByText: string[] = SubzonaData.colsToFilterByText;
  public defaultEmptyRowTable: ISubzonaTable = SubzonaData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private idZona: string = "";

  constructor(
    private subzonasService: SubzonaService,
    private zonaService: ZonasService,
    private tableService: TableService,
    private router: Router,
    private validationsService: ValidationsService,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.getIdZonaFromRoute();
    this.getDataToTable();
    this.getDetailToBackButtonData();
  }
  private getIdZonaFromRoute() {
    this.route.params.subscribe((params: { idZona: string }) => {
      this.idZona = params.idZona.trim();
    });
  }
  private getDetailToBackButtonData() {
    this.zonaService.getById(this.idZona).subscribe({
      next: (response) => {
        this.backButtonData = {
          mainText: response.descripcion,
          onBackFunction: "goBackPage",
          textDetails: [`Ubicación: ${response.ubicacion}`],
        };
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private getDataToTable() {
    return this.subzonasService.indexByZona(this.idZona).subscribe({
      next: (response) => {
        this.dataTable = response.subZonaTypes;
      },
      error: (error: HttpErrorResponse) => {
        this.dataTable = [];
      },
    });
  }
  private onDelete(key: string) {
    this.subzonasService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private onSaveRowTable(rowData: ISubzonaTable, finishedClonningRow: boolean) {
    rowData.codigoZona = this.idZona;
    if (rowData.key) {
      /* Actualizar */
      this.subzonasService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.subZonaCodigo.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.subzonasService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.subZonaCodigo.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
  private async validateToSave(
    rowData: ISubzonaTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.subZonaCodigo
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
  private goBackPage() {
    this.router.navigate(["parametros/ubicacion/hacienda/zonas"]);
  }
}

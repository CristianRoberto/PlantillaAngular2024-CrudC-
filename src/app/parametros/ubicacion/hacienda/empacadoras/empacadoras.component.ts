import { Component } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { EmpacadoraData } from "./empacadoras.data";
import { IEmpacadoraTable } from "./empacadoras.interface";
import { EmpacadoraService } from "./empacadora.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableService } from "src/app/component/table/table.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { HaciendasService } from "../haciendas/haciendas.service";
import { BackButtonComponentData } from "src/app/component/back-button/back-button.data";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormService } from "src/app/component/form/form.service";
import { Location } from "@angular/common";
import { ZonasService } from "../zonas/zonas.service";

@Component({
  templateUrl: "./empacadoras.component.html",
})
export class EmpacadorasComponent {
  public columnsTable: IColumnsTable = EmpacadoraData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent =
    BackButtonComponentData.defaultConf;
  public tableInputsEditRow: IInputsComponent =
    EmpacadoraData.tableInputsEditRow;
  public colsToFilterByText: string[] = EmpacadoraData.colsToFilterByText;
  public defaultEmptyRowTable: IEmpacadoraTable =
    EmpacadoraData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private modalConfirmation: boolean = environment.modalConfirmation;
  private idHacienda: string = "";
  private idZona: string = "";

  constructor(
    private empacadoraService: EmpacadoraService,
    private haciendaService: HaciendasService,
    private zonaService: ZonasService,
    private tableService: TableService,
    private router: Router,
    private validationsService: ValidationsService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private formService: FormService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getIdsFromRoute();
    this.getDataToTable();
    this.getDetailToBackButtonData();
  }

  private getIdsFromRoute() {
    this.route.params.subscribe(
      (params: { idHacienda: string; idZona: string }) => {
        this.idHacienda = params.idHacienda.trim();
        this.idZona = params.idZona.trim();
        this.getDetailToBackButtonData();
      }
    );
  }

  private getDetailToBackButtonData() {
    this.haciendaService.getById(this.idHacienda).subscribe({
      next: (response) => {
        this.zonaService.getById(this.idZona).subscribe({
          next: (zonaResponse) => {
            this.backButtonData = {
              mainText: response.nombreHacienda,
              onBackFunction: "goBackPage",
              textDetails: [`Zona: ${zonaResponse.descripcion}`],
            };
          },
          error: (error) => {},
        });
      },
      error: (error) => {},
    });
  }
  private getDataToTable() {
    return this.empacadoraService.indexByHacienda(this.idHacienda).subscribe({
      next: (response) => {
        this.dataTable = response.empacadoraTypes;
      },
    });
  }
  private onDelete(key: string) {
    this.empacadoraService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  private onSaveRowTable(
    rowData: IEmpacadoraTable,
    finishedClonningRow: boolean
  ) {
    rowData.codigoHacienda = this.idHacienda;
    if (rowData.key) {
      /* Actualizar */
      this.empacadoraService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoEmpacadora.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.empacadoraService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable().add(() => {
            if (finishedClonningRow) {
              this.IdRowToClone = response.codigoEmpacadora.toString();
            }
          });
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
  private validateToSave(
    rowData: IEmpacadoraTable,
    finishedClonningRow: boolean
  ) {
    const codigoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.codigoEmpacadora
    );
    const descripcionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        rowData.nombreEmpacadora
      );
    const ubicacionNotEmpty = this.validationsService.isNotEmptyStringVariable(
      rowData.nombreEmpacadora
    );
    if (codigoNotEmpty && descripcionNotEmpty && ubicacionNotEmpty) {
      if (this.modalConfirmation) {
        Swal.fire({
          title: "¿Desea ingresar los datos?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#004998",
          cancelButtonColor: "#dc3545",
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.onSaveRowTable(rowData, finishedClonningRow);
          }
        });
      } else {
        this.onSaveRowTable(rowData, finishedClonningRow);
      }
    }
  }
  private goBackPage() {
    this.location.back();
  }
}

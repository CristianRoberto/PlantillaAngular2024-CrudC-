import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { HaciendasData } from "./haciendas.data";
import { HaciendasService } from "./haciendas.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { PageFormType } from "src/app/component/form/form.interface";
import { ZonasService } from "../zonas/zonas.service";
import { UtilService } from "src/app/services/util/util.service";
import { IHaciendaTable } from "./haciendas.interface";

@Component({
  templateUrl: "./haciendas.component.html",
})
export class HaciendasComponent implements OnInit {
  public columnsTable: IColumnsTable = HaciendasData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent;
  public tableInputsEditRow: IInputsComponent =
    HaciendasData.tableInputsEditRow;
  public colsToFilterByText: string[] = HaciendasData.colsToFilterByText;
  public defaultEmptyRowTable: IHaciendaTable =
    HaciendasData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private idZona: string = "";

  constructor(
    private haciendasService: HaciendasService,
    private zonaService: ZonasService,
    private router: Router,
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
    });
  }
  private getDataToTable() {
    return this.haciendasService.indexByZona(this.idZona).subscribe({
      next: (response) => {
        this.dataTable = response.haciendaTypes;
      },
    });
  }
  private clickOnActionTable(
    key: string,
    idAction: idActionType,
    tooltip: string
  ) {
    if (tooltip === "Editar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendaForm/${this.idZona}/${PageFormType.MODIFICAR}/${key}`,
      ]);
    } else if (tooltip === "Clonar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendaForm/${this.idZona}/${PageFormType.CLONAR}/${key}`,
      ]);
    } else if (tooltip === "Sectores") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendas/${this.idZona}/${key}/sectores`,
      ]);
    } else if (tooltip === "Empacadoras") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendas/${this.idZona}/${key}/empacadoras`,
      ]);
    } else if (tooltip === "Lotes") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/haciendas/${this.idZona}/${key}/lotes`,
      ]);
    } else if (tooltip === "Tipo Contabilización") {
      this.router.navigate([
        `/parametros/ubicacion/hacienda/haciendas/${this.idZona}/${key}/tipo-contabilizacion`,
      ]);
    }
  }

  private redirectToCreate() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendaForm/${this.idZona}/${PageFormType.CREAR}/null`,
    ]);
  }

  private onDelete(key: string) {
    this.haciendasService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private goBackPage() {
    this.router.navigate(["parametros/ubicacion/hacienda/zonas"]);
  }
}

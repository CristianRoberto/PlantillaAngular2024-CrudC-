import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { SectoresData } from "./sectores.data";
import { ISectorTable } from "./sectores.interface";
import { SectoresService } from "./sectores.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { PageFormType } from "src/app/component/form/form.interface";
import { HaciendasService } from "../haciendas/haciendas.service";
import { UtilService } from "src/app/services/util/util.service";
import { ZonasService } from "../zonas/zonas.service";
import { Location } from "@angular/common";

@Component({
  templateUrl: "./sectores.component.html",
})
export class SectoresComponent implements OnInit {
  public columnsTable: IColumnsTable = SectoresData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent;
  public tableInputsEditRow: IInputsComponent = SectoresData.tableInputsEditRow;
  public colsToFilterByText: string[] = SectoresData.colsToFilterByText;
  public defaultEmptyRowTable: ISectorTable = SectoresData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private idZona: string = "";
  private idHacienda: string = "";

  constructor(
    private sectoresService: SectoresService,
    private zonasService: ZonasService,
    private haciendasService: HaciendasService,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getIdsFromRoute();
    this.getDataToTable();
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
    this.haciendasService.getById(this.idHacienda).subscribe({
      next: (response) => {
        this.zonasService.getById(this.idZona).subscribe({
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
    return this.sectoresService.indexByHacienda(this.idHacienda).subscribe({
      next: (response) => {
        this.dataTable = response.sectorTypes;
      },
      error: () => {},
    });
  }
  private clickOnActionTable(
    key: string,
    idAction: idActionType,
    tooltip: string
  ) {
    if (tooltip === "Editar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/sectorForm/${this.idZona}/${this.idHacienda}/${PageFormType.MODIFICAR}/${key}`,
      ]);
    } else if (tooltip === "Clonar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/sectorForm/${this.idZona}/${this.idHacienda}/${PageFormType.CLONAR}/${key}`,
      ]);
    } else if (tooltip === "Visualizar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/sectorForm/${this.idZona}/${this.idHacienda}/${PageFormType.VISUALIZAR}/${key}`,
      ]);
    } else if (tooltip === "Hectareas") {
      console.log("Redirigir a hectáreas");
    }
  }

  private redirectToCreate() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/sectorForm/${this.idZona}/${this.idHacienda}/${PageFormType.CREAR}/null`,
    ]);
  }

  private onDelete(key: string) {
    this.sectoresService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}`,
    ]);
  }
}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { ViviendasData } from "./vivienda.data";
import { ViviendaService } from "./vivienda.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { PageFormType } from "src/app/component/form/form.interface";
import { UtilService } from "src/app/services/util/util.service";
import { IViviendaResponse, IViviendaTable } from "./vivienda.interface";
import { SectoresService } from "../sector/sectores.service";
import { ISector } from "../sector/sectores.interface";
import { HaciendasService } from "../haciendas/haciendas.service";
import { IHacienda } from "../haciendas/haciendas.interface";
import { ITipovivienda } from "../tipo-vivienda/tipo-vivienda.interface";
import { TipoviviendaService } from "../tipo-vivienda/tipo-vivienda.service";

@Component({
  templateUrl: "./vivienda.component.html",
})
export class ViviendaComponent implements OnInit {
  public columnsTable: IColumnsTable = ViviendasData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent;
  public tableInputsEditRow: IInputsComponent =
    ViviendasData.tableInputsEditRow;
  public colsToFilterByText: string[] = ViviendasData.colsToFilterByText;
  public defaultEmptyRowTable: IViviendaTable =
    ViviendasData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private idZona: string = "";
  private sectores: ISector[] = [];
  private haciendas: IHacienda[] = [];
  private tiposVivienda: ITipovivienda[] = [];

  constructor(
    private viviendaService: ViviendaService,
    private sectorService: SectoresService,
    private haciendaService: HaciendasService,
    private tipoviviendaService: TipoviviendaService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }
  private getDataToTable() {
    // Obtener datos de las haciendas
    this.haciendaService.index().subscribe({
      next: (haciendaResponse) => {
        this.haciendas = haciendaResponse.haciendaTypes;
        // Obtener datos de los sectores
        this.sectorService.index().subscribe({
          next: (sectorResponse) => {
            this.sectores = sectorResponse.sectorTypes;
            // Obtener datos de los tipos de vivienda
            this.tipoviviendaService.index().subscribe({
              next: (tipoViviendaResponse) => {
                this.tiposVivienda = tipoViviendaResponse.tipoViviendaTypes;
                // Obtener datos de las viviendas después de obtener los sectores y tipos de vivienda
                this.viviendaService.index().subscribe({
                  next: (viviendaResponse: IViviendaResponse) => {
                    // Mapear las viviendas y asignar descripciones de sectores, haciendas y tipos de vivienda
                    this.dataTable = viviendaResponse.viviendaTypes.map(
                      (vivienda) => {
                        const sector = this.sectores.find(
                          (sector) =>
                            sector.codigoSector === vivienda.codigoSector
                        );
                        const hacienda = this.haciendas.find(
                          (hacienda) =>
                            hacienda.codigoHacienda === vivienda.codigoHacienda
                        );
                        const tipoVivienda = this.tiposVivienda.find(
                          (tipo) => tipo.codigo === vivienda.codigoTipoVivienda
                        );
                        return {
                          ...vivienda,
                          descripcionSector: sector ? sector.descripcion : "",
                          nombreHacienda: hacienda
                            ? hacienda.nombreHacienda
                            : "",
                          descripcionTipoVivienda: tipoVivienda
                            ? tipoVivienda.descripcion
                            : "",
                        };
                      }
                    );
                  },
                  error: (error) => {},
                });
              },
              error: (error) => {},
            });
          },
          error: (error) => {},
        });
      },
      error: (error) => {},
    });
  }

  private clickOnActionTable(
    key: string,
    idAction: idActionType,
    tooltip: string
  ) {
    if (tooltip === "Editar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/viviendaForm/${PageFormType.MODIFICAR}/${key}`,
      ]);
    } else if (tooltip === "Clonar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/viviendaForm/${PageFormType.CLONAR}/${key}`,
      ]);
    } else if (tooltip === "Visualizar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/viviendaForm/${PageFormType.VISUALIZAR}/${key}`,
      ]);
    }
  }

  private redirectToCreate() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/viviendaForm/${PageFormType.CREAR}/null`,
    ]);
  }

  private onDelete(key: string) {
    this.viviendaService.delete(key).subscribe({
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

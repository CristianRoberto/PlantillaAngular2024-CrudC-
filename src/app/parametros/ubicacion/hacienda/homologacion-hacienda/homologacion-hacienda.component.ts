import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { HomologacionHaciendasData } from "./homologacion-hacienda.data";
import { IHomologacionHaciendaTable } from "./homologacion-hacienda.interface";
import { HomologacionHaciendasService } from "./homologacion-hacienda.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { PageFormType } from "src/app/component/form/form.interface";
import { HaciendasService } from "../haciendas/haciendas.service";
import { UtilService } from "src/app/services/util/util.service";
import { ZonasService } from "../zonas/zonas.service";

@Component({
  templateUrl: "./homologacion-hacienda.component.html",
})
export class HomologacionHaciendaComponent implements OnInit {
  public columnsTable: IColumnsTable = HomologacionHaciendasData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent;
  public tableInputsEditRow: IInputsComponent =
    HomologacionHaciendasData.tableInputsEditRow;
  public colsToFilterByText: string[] =
    HomologacionHaciendasData.colsToFilterByText;
  public defaultEmptyRowTable: IHomologacionHaciendaTable =
    HomologacionHaciendasData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  private idZona: string = "";
  private idHacienda: string = "";

  constructor(
    private homologacionHaciendasService: HomologacionHaciendasService,
    private zonasService: ZonasService,
    private haciendasService: HaciendasService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
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
    return this.homologacionHaciendasService.index().subscribe({
      next: (response) => {
        this.dataTable = response.homologacionHaciendaTypes;
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
        `parametros/ubicacion/hacienda/homologacionHaciendaForm/${PageFormType.MODIFICAR}/${key}`,
      ]);
    } else if (tooltip === "Clonar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/homologacionHaciendaForm/${PageFormType.CLONAR}/${key}`,
      ]);
    } else if (tooltip === "Visualizar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/homologacionHaciendaForm/${PageFormType.VISUALIZAR}/${key}`,
      ]);
    } else if (tooltip === "Hectareas") {
      console.log("Redirigir a hectáreas");
    }
  }

  private redirectToCreate() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/homologacionHaciendaForm/${this.idZona}/${this.idHacienda}/${PageFormType.CREAR}/null`,
    ]);
  }

  private onDelete(key: string) {
    const homologacion = this.dataTable.find(
      (item) => item.codigoHaciendaSGAP === key
    );
    if (homologacion) {
      const codigoZona = homologacion.codigoZona;
      const codigoSubzona = homologacion.codigoSubzona;
      console.log("codigoZona", codigoZona);
      console.log("codigoSubzona", codigoSubzona);
      console.log("key", key);
      this.homologacionHaciendasService
        .delete(key, codigoZona, codigoSubzona)
        .subscribe({
          next: (response) => {
            this.getDataToTable();
            this.utilService.modalResponse(response, "success");
          },
          error: (error: HttpErrorResponse) =>
            this.utilService.modalResponse(error.error, "error"),
        });
    } else {
      console.error("No se encontró la homologación con el key proporcionado.");
    }
  }

  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}`,
    ]);
  }
}

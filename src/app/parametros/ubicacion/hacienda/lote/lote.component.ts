import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IInputsComponent } from "src/app/component/input/input.interface";
import {
  IColumnsTable,
  idActionType,
} from "src/app/component/table/table.interface";
import { LotesData } from "./lote.data";
import { LoteService } from "./lote.service";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import { PageFormType } from "src/app/component/form/form.interface";
import { HaciendasService } from "../haciendas/haciendas.service";
import { UtilService } from "src/app/services/util/util.service";
import { ZonasService } from "../zonas/zonas.service";
import { SectoresService } from "../sector/sectores.service";
import { EmpacadoraService } from "../empacadoras/empacadora.service";
import { ILoteTable } from "./lote.interface";

@Component({
  templateUrl: "./lote.component.html",
})
export class LoteComponent implements OnInit {
  public columnsTable: IColumnsTable = LotesData.columns;
  public dataTable: any[] = [];
  public backButtonData: IBackButtonComponent;
  public tableInputsEditRow: IInputsComponent = LotesData.tableInputsEditRow;
  private idZona: string = "";
  private idHacienda: string = "";
  public selected_empacadora: number;
  public dataSectores: any[];
  public dataEmpacadoras: any[];
  public dataProductos = [
    { codigoProducto: 1, name: "Producto 1" },
    { codigoProducto: 2, name: "Producto 2" },
    { codigoProducto: 3, name: "Producto 3" },
  ];
  public dataEstado = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Inactivo" },
  ];
  idJefeSector: string = "012345678";
  nombreJefeSector: string = "Beltrán Vallejo Marcela Alisson";
  mainText: string = "";
  textDetails: string = "";
  public colsToFilterByText: string[] = LotesData.colsToFilterByText;
  public defaultEmptyRowTable: ILoteTable = LotesData.defaultEmptyRowTable;
  public IdRowToClone: string = null;
  constructor(
    private loteService: LoteService,
    private zonasService: ZonasService,
    private haciendasService: HaciendasService,
    private sectorService: SectoresService,
    private empacadoraService: EmpacadoraService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getIdsFromRoute();
    this.getDataToTable();
    this.getDataToCombos();
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
  private getDataToCombos() {
    this.sectorService.indexPaginated(1, 100).subscribe({
      next: (response) => {
        this.dataSectores = response.sectorTypes;
      },
      error: (error) => {},
    });
    this.empacadoraService.index().subscribe({
      next: (response) => {
        this.dataEmpacadoras = response.empacadoraTypes;
      },
      error: (error) => {},
    });
  }

  private getDataToTable() {
    return this.loteService.indexByHacienda(this.idHacienda).subscribe({
      next: (response) => {
        this.dataTable = response.loteType;
      },
      error: () => {},
    });
  }

  private clickOnActionTable(
    key: string,
    idAction: idActionType,
    tooltip: string
  ) {
    if (tooltip === "Hectareas") {
      console.log("Redirigir a hectareas");
    } else if (tooltip === "Editar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/loteForm/${this.idZona}/${this.idHacienda}/${PageFormType.MODIFICAR}/${key}`,
      ]);
    } else if (tooltip === "Clonar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/loteForm/${this.idZona}/${this.idHacienda}/${PageFormType.CLONAR}/${key}`,
      ]);
    } else if (tooltip === "Visualizar") {
      this.router.navigate([
        `parametros/ubicacion/hacienda/loteForm/${this.idZona}/${this.idHacienda}/${PageFormType.VISUALIZAR}/${key}`,
      ]);
    }
  }
  private redirectToCreate() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/loteForm/${this.idZona}/${this.idHacienda}/${PageFormType.CREAR}/null`,
    ]);
  }

  private onDelete(key: string) {
    this.loteService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  public goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}`,
    ]);
  }
}

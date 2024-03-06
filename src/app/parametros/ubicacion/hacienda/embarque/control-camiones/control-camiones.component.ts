import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { ControlCamionData } from "./control-camiones.data";
import { IControlCamion } from "./control-camiones.interface";
import { ControlCamionService } from "./control-camiones.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilService } from "src/app/services/util/util.service";
import { TableService } from "src/app/component/table/table.service";

@Component({
  templateUrl: "./control-camiones.component.html",
})
export class ControlCamionesComponent implements OnInit {
  public columnsTable: IColumnsTable = ControlCamionData.columns;
  public dataTable: any[] = [];
  public backButtonOptions: string[] = ControlCamionData.backButtonOptions;
  public defaultEmptyRowTable: IControlCamion =
    ControlCamionData.defaultEmptyRowTable;
  constructor(
    private controlcamionesService: ControlCamionService,
    private tableService: TableService,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.getDataToTable();
  }
  private getDataToTable() {
    this.controlcamionesService.indexPaginated(1, 100).subscribe((response) => {
      this.dataTable = response;
    });
  }
  private onSaveRowTable(rowData: any) {
    if (rowData.key) {
      /* Actualizar */
      this.controlcamionesService.update(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Datos ingresados correctamente",
            "success"
          );
          this.getDataToTable();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else {
      /* Crear */
      this.controlcamionesService.store(rowData).subscribe({
        next: (response) => {
          this.tableService.changeStateIsAnyEditRowActive(false);
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.getDataToTable();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
}

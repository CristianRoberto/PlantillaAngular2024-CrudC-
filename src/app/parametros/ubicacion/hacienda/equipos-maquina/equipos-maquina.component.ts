import { Component, OnInit } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { EquiposMaquinaData } from "./equipos-maquina.data";
import { HttpErrorResponse } from "@angular/common/http";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { MaquinariaService } from "src/app/services/maquinaria/maquinaria.service";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { UtilService } from "src/app/services/util/util.service";

@Component({
  selector: "app-equipos-maquina",
  templateUrl: "./equipos-maquina.component.html",
})
export class EquiposMaquinaComponent implements OnInit {
  public columnsTable: IColumnsTable = EquiposMaquinaData.columns;
  public filterFormSearchButtonProps: ISearchButtonForm =
    EquiposMaquinaData.filterFormSearchButtonProps;
  public dataTable: any[] = [];
  public tableInputsEditRow: IInputsComponent =
    EquiposMaquinaData.tableInputsEditRow;
  public filterFormInputs: IFormItems = EquiposMaquinaData.filterFormInputs;
  constructor(
    private maquinariaService: MaquinariaService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getDataToTable();
  }

  private getDataToTable() {
    this.maquinariaService.indexPaginated(1, 100, "E").subscribe((response) => {
      this.dataTable = response.maquinariaTypes;
    });
  }
  private deleteEquipoMaquinaria(key: string) {
    this.maquinariaService.delete(key).subscribe({
      next: (response) => {
        this.getDataToTable();
        this.utilService.modalResponse(response, "success");
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }
  private onSaveRowTable(rowData: any) {
    if (rowData.key) {
      /* Actualizar */
      this.maquinariaService.update(rowData).subscribe({
        next: (response) => {
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
      this.maquinariaService.store(rowData).subscribe({
        next: (response) => {
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

import { Component } from "@angular/core";
import { IColumnsTable } from "src/app/component/table/table.interface";

@Component({
  templateUrl: "./jefe-sector-lote.component.html",
  // styleUrls: ["./jefe-sector-lote.component.scss"],
})
export class JefeSectorLoteComponent {
  public columnsTable: IColumnsTable = [];
  public dataTable: any[] = [];
  public backButtonOptions: string[] = [];
}

import {
  Component,
  ViewChild,
  HostListener,
  AfterViewInit,
  ElementRef,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {
  ILaboresRealizadas,
  ILaboresRealizadasTable,
} from "./labores-realizadas.interface";
import { IColumnsTable } from "src/app/component/table/table.interface";
import { LaboresRealizadasData } from "./labores-realizadas.data";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "app-labores-realizadas",
  templateUrl: "./labores-realizadas.component.html",
})
export class LaboresRealizadasComponent implements AfterViewInit, OnInit {
  public dataTable: ILaboresRealizadasTable = [];
  public columnsTable: IColumnsTable = LaboresRealizadasData.columns;
  public hasFiltered: boolean = false;
  public selected_hacienda: number;
  public selected_producto: number;
  public selected_tipo_labor: number;
  public selected_trabajador: number;

  constructor(private router: Router) {}
  public ngOnInit(): void {
    this.validateSetHeadersFilters();
  }

  public onSearch() {
    this.getDataTotable();
    this.savefilterPage();
    this.hasFiltered = true;
  }
  private getDataTotable() {
    const response = this.getDataFromLocalStorage();
    const response_formatted = this.formatDataToTable(response);
    this.dataTable = response_formatted;
  }
  /**
   * Función para obtener la data guardada en el  local storage
   */
  private getDataFromLocalStorage(): ILaboresRealizadas {
    const laboresRealizadas = localStorage.getItem("labores realizadas");
    if (!laboresRealizadas) {
      localStorage.setItem("labores realizadas", JSON.stringify([]));
    }
    return JSON.parse(laboresRealizadas) as ILaboresRealizadas;
  }
  /**
   * Función para formatear la data del response para pasar a la tabla
   *
   * @param response data que me da el servicio
   * @returns la data formateada para pasar a la tabla
   */
  private formatDataToTable(
    response: ILaboresRealizadas
  ): ILaboresRealizadasTable {
    return response.map((labor) => ({
      ...labor,
      key: labor.id,
    }));
  }
  private redirectToEdit(key: string) {
    this.router.navigate([
      `/labores-agricolas/modificar-labores-realizadas/${key}`,
    ]);
  }
  private deleteRow(key: string) {
    Swal.fire({
      text: "¿Estás seguro de realizar esta acción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0056B3",
      cancelButtonColor: "#77797a",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = this.getDataFromLocalStorage();
        const newDataTale = data.filter((x) => x.id !== key);
        localStorage.setItem("labores realizadas", JSON.stringify(newDataTale));
        this.getDataTotable();
        Swal.fire({
          text: "Registro Eliminado.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  private savefilterPage() {
    localStorage.setItem(
      "filtro labores realizadas",
      JSON.stringify({
        hacienda: this.selected_hacienda,
        producto: this.selected_producto,
        tipo_labor: this.selected_tipo_labor,
        trabajador: this.selected_trabajador,
        fecha: this.model,
      })
    );
  }
  private validateSetHeadersFilters() {
    this.hasFiltered = true;
    this.getDataTotable();
    const filtrolaboresRealizadas = JSON.parse(
      localStorage.getItem("filtro labores realizadas")
    ) as {
      hacienda: number;
      producto: number;
      tipo_labor: number;
      trabajador: number;
      fecha: NgbDateStruct;
    };
    this.selected_hacienda = filtrolaboresRealizadas.hacienda;
    this.selected_producto = filtrolaboresRealizadas.producto;
    this.selected_tipo_labor = filtrolaboresRealizadas.tipo_labor;
    this.selected_trabajador = filtrolaboresRealizadas.trabajador;
    this.model = filtrolaboresRealizadas.fecha;
  }

  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  model: NgbDateStruct;
  disabled = true;

  data_haciendas = [
    { id: 10021, name: "Poza de Naranjo" },
    { id: 10022, name: "Paraiso" },
    { id: 10023, name: "J.J." },
    { id: 10024, name: "San Francisco" },
  ];

  data_productos = [
    { id: 1, name: "Banano" },
    { id: 2, name: "Maduro" },
    { id: 3, name: "Maracuyá" },
  ];

  data_tipo_labor = [{ id: 1, name: "Atención a plantación" }];

  data_trabajador = [{ id: 120313, name: "Glorioso Vicente Fajardo" }];

  editing: any = {};
  rows: any = new Array();

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: "name" }, { name: "Gender" }, { name: "Company" }];

  @ViewChild(LaboresRealizadasComponent) table: LaboresRealizadasComponent;

  /* constructor(
    private config: NgSelectConfig,
    private calendar: NgbCalendar,
    private router: Router
  ) {
    this.model = calendar.getToday();

    this.config.notFoundText = "Custom not found";
    this.config.appendTo = "body";
    this.config.bindValue = "value";

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
 */
  updateValue(event: any, cell: any, rowIndex: number) {
    this.editing[rowIndex + "-" + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  PageCrear() {
    this.router.navigate(["/labores-agricolas/crear-labores-realizadas"]);
  }

  Eliminar() {
    Swal.fire({
      text: "¿Estás seguro de realizar esta acción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0056B3",
      cancelButtonColor: "#77797a",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Registro Eliminado.",
          icon: "success",
          confirmButtonColor: "#0056B3",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  /* Hacer qeu vaya a la pantalla de nuevo */
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === "n" && event.altKey) {
      this.PageCrear();
    }
  }
  /* Hacer foco sobrehacienda cuando se renderiza la pantalla */
  @ViewChild("inputSelectHacienda") inputSelectHacienda!: NgSelectComponent;
  ngAfterViewInit() {
    this.inputSelectHacienda.focus();
  }
  /* Funcion para hacer focus al select de producto */
  @ViewChild("inputSelectProducto") inputSelectProducto!: NgSelectComponent;
  public onChangeHacienda() {
    this.inputSelectProducto.focus();
  }
  /* Funcion para hacer focus al input de fecha */
  @ViewChild("inputDateFecha") inputDateFecha!: ElementRef;
  public onChangeProducto() {
    this.inputDateFecha.nativeElement.focus();
  }
  /* Funcion para hacer focus al select de Labor */
  @ViewChild("inputSelectLabor") inputSelectLabor!: NgSelectComponent;
  public onChangeFecha() {
    this.inputSelectLabor.focus();
  }
  /* Funcion para hacer focus al select de trabajador */
  @ViewChild("inputSelectTrabajador") inputSelectTrabajador!: NgSelectComponent;
  public onChangeTipoLabor() {
    this.inputSelectTrabajador.focus();
  }
  /* Funcion para hacer focus al input de fecha */
  @ViewChild("buttonSearch") buttonSearch!: ElementRef;
  public onChangeTrabajador() {
    this.buttonSearch.nativeElement.focus();
  }
}

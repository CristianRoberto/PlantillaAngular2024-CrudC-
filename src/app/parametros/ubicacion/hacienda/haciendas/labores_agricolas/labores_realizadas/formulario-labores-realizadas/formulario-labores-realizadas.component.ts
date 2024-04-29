import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ILaboresRealizadas } from "../labores-realizadas.interface";
import Swal from "sweetalert2";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "app-data-table",
  templateUrl: "./formulario-labores-realizadas.component.html",
})
export class FormularioLaboresRealizadasComponent implements OnInit {
  private id: string = null;
  public isUpdating: boolean = false;
  public selected_lote: number;
  public selected_labor: number;
  public procesado: number;
  public backButtonDetails: string[] = ["Producto: Banano"];
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.validateIsUpdating();
    if (this.isUpdating) {
      this.getdataToUpdate();
    }
  }
  /**
   * Función para validar si estoy en el formulario para modificar el registro
   */
  private validateIsUpdating() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id !== null) {
      this.isUpdating = true;
    }
  }
  private saveInLocalStorage() {
    const labores: ILaboresRealizadas =
      JSON.parse(localStorage.getItem("labores realizadas")) || [];
    const lote = this.data_lote.find((x) => x.id === this.selected_lote);
    const labor = this.data_labor.find((x) => x.id === this.selected_labor);
    labores.push({
      id: Math.random().toString(),
      procesado: this.procesado,
      id_lote: lote.id,
      lote: lote.name,
      id_labor: labor.id,
      labor: labor.name,
      total_procesado: 0,
    });
    localStorage.setItem("labores realizadas", JSON.stringify(labores));
  }
  private updateInLocalStorage() {
    const labores: ILaboresRealizadas =
      JSON.parse(localStorage.getItem("labores realizadas")) || [];
    const lote = this.data_lote.find((x) => x.id === this.selected_lote);
    const labor = this.data_labor.find((x) => x.id === this.selected_labor);
    const laboresWithOutActual = labores.filter((x) => x.id !== this.id);
    laboresWithOutActual.push({
      id: this.id,
      procesado: this.procesado,
      id_lote: lote.id,
      lote: lote.name,
      id_labor: labor.id,
      labor: labor.name,
      total_procesado: 0,
    });
    localStorage.setItem(
      "labores realizadas",
      JSON.stringify(laboresWithOutActual)
    );
  }
  private getdataToUpdate() {
    const labores: ILaboresRealizadas =
      JSON.parse(localStorage.getItem("labores realizadas")) || [];
    const labor = labores.find((x) => x.id === this.id);
    console.log("labor", labor);
    this.selected_lote = labor.id_lote;
    this.selected_labor = labor.id_labor;
    this.procesado = labor.procesado;
  }
  public redirectToLaboresRealizados() {
    this.router.navigate([`/labores-agricolas/labores-realizadas`]);
  }
  public Guardar() {
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
        if (this.isUpdating) {
          this.updateInLocalStorage();
        } else {
          this.saveInLocalStorage();
        }
        Swal.fire({
          text: "Registro Creado.",
          icon: "success",
          confirmButtonColor: "#0056B3",
          showConfirmButton: false,
          timer: 1500,
        });
        this.redirectToLaboresRealizados();
      }
    });
  }
  /*  */
  model: NgbDateStruct;
  disabled = true;

  data_lote: any[] = [
    { id: 1, name: "Lote 1" },
    { id: 2, name: "Lote 2" },
    { id: 3, name: "Lote 3" },
    { id: 4, name: "Lote 4" },
  ];

  data_labor: any[] = [
    { id: 1, name: "Labor 1" },
    { id: 2, name: "Labor 2" },
    { id: 3, name: "Labor 3" },
  ];

  editing: any = {};
  rows: any = new Array();

  loadingIndicator = true;
  reorderable = true;

  /* constructor(private config: NgSelectConfig, private router: Router) {
    this.config.notFoundText = "Custom not found";
    this.config.appendTo = "body";
    this.config.bindValue = "value";

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  } */

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "a" && event.altKey) {
      this.Guardar();
    }
  }
  /* Hacer foco sobre lote cuando se renderiza la pantalla */
  @ViewChild("inputSelectlote") inputSelectlote!: NgSelectComponent;
  ngAfterViewInit() {
    this.inputSelectlote.focus();
  }
  /* Funcion para hacer focus al select de labor */
  @ViewChild("inputSelectLabor") inputSelectLabor!: NgSelectComponent;
  public onChangeLote() {
    this.inputSelectLabor.focus();
  }
  /* Funcion para hacer focus al input de procesado */
  @ViewChild("inputTextProcesado") inputTextProcesado!: ElementRef;
  public onChangeLabor() {
    this.inputTextProcesado.nativeElement.focus();
  }
}

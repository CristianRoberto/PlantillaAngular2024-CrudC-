import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { NgSelectComponent } from "@ng-select/ng-select";

import { HttpErrorResponse } from "@angular/common/http";
import { ProcesoService } from "../numero-procesos.service";
import { ILaborRealizada, IprocesosRealizadas,  IprocesosRealizadasTable,} from "../numero_procesos.interface";
import { UtilService } from "src/app/services/util/util.service";




@Component({
  selector: "app-data-table",
  templateUrl: "./formulario-numero_procesos.component.html",
})
export class FormularioprocesosRealizadasComponent implements OnInit {
  // public dataTable: IprocesosRealizadasTable = [];
  public dataTable: IprocesosRealizadasTable = [];


  fechaSeleccionada: Date;
  private id: string = null;
  public isUpdating: boolean = false;
  

  selectedCodigoEmpacadora:  any = 0;
  selectedCodigoCuadrilla: any = 0;

  public selected_empacadora: any;
  public selected_cuadrilla: any;

  public selected_labor: number;
  public procesado: number;
  // public backButtonDetails: string[] = ["Fecha: Banano"];
  public backButtonDetails: string[] = ["Fecha: " + " " +  new Date().toLocaleDateString()];

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private ProcesoService: ProcesoService,
    private utilService: UtilService ){}
    
  ngOnInit() {
    // this.validateIsUpdating();
    // if (this.isUpdating) {
    //   this.getdataToUpdate();
    // }

    this.getDataToTable();

  }

  private getDataToTable() {
    return this.ProcesoService.index().subscribe({
      next: (response) => {
        this.dataTable = response;
        console.log('Data recibida:', this.dataTable); // Aquí se imprime la data recibida en la consola
      },
      error: (error: HttpErrorResponse) =>
        this.utilService.modalResponse(error.error, "error"),
    });
  }

  

  /**
   * Función para validar si estoy en el formulario para modificar el registro
   */
  // private validateIsUpdating() {
  //   this.id = this.route.snapshot.paramMap.get("id");
  //   if (this.id !== null) {
  //     this.isUpdating = true;
  //   }
  // }
  // private saveInLocalStorage() {
  //   const procesos: IprocesosRealizadas =
  //     JSON.parse(localStorage.getItem("procesos realizadas")) || [];
  //   const lote = this.data_lote.find((x) => x.id === this.selected_lote);
  //   const labor = this.data_labor.find((x) => x.id === this.selected_labor);
  //   // procesos.push({
  //   //   id: Math.random().toString(),
  //   //   // procesado: this.procesado,
  //   //   // id_lote: lote.id,
  //   //   lote: lote.name,
  //   //   id_labor: labor.id,
  //   //   labor: labor.name,
  //   //   total_procesado: 0,
  //   // });
  //   localStorage.setItem("procesos realizadas", JSON.stringify(procesos));
  // }
  // private updateInLocalStorage() {
  //   const procesos: IprocesosRealizadas =
  //     JSON.parse(localStorage.getItem("procesos realizadas")) || [];
  //   const lote = this.data_lote.find((x) => x.id === this.selected_lote);
  //   const labor = this.data_labor.find((x) => x.id === this.selected_labor);
  //   const procesosWithOutActual = procesos.filter((x) => x.id !== this.id);
  //   // procesosWithOutActual.push({
  //   //   id: this.id,
  //   //   // procesado: this.procesado,
  //   //   // id_lote: lote.id,
  //   //   // lote: lote.name,
  //   //   // id_labor: labor.id,
  //   //   // labor: labor.name,
  //   //   // total_procesado: 0,
  //   // });
  //   localStorage.setItem(
  //     "procesos realizadas",
  //     JSON.stringify(procesosWithOutActual)
  //   );
  // }
  // private getdataToUpdate() {
  //   const procesos: IprocesosRealizadas =
  //     JSON.parse(localStorage.getItem("procesos realizadas")) || [];
  //   const labor = procesos.find((x) => x.id === this.id);
  //   console.log("labor", labor);
  //   // this.selected_lote = labor.id_lote;
  //   // this.selected_labor = labor.id_labor;
  //   // this.procesado = labor.procesado;
  // }
  public redirectToprocesosRealizados() {
    console.log("Se hizo clic en el botón de redireccionar a procesos realizados");
    this.router.navigate(['/parametros/ubicacion/hacienda/numero_procesos']);
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
          // Llama al método para actualizar
          this.actualizarRegistro();
        } else {
          // Llama al método para guardar un nuevo registro
          this.guardarNuevoRegistro();
        }
      }
    });
  }

  // interface IProcesoNuevo {
  //   codigoEmpacadora: string;
  //   codigoCuadrilla: string;
  //   // Aquí puedes incluir otros campos de ILaborRealizada si es necesario
  // }
  
  // ...
  
  private guardarNuevoRegistro() {
    // Crear un objeto de tipo IProcesoNuevo
    const data: ILaborRealizada = {
      codigoEmpacador: this.selected_empacadora,
      codigoCuadrilla: this.selected_cuadrilla
      // Aquí puedes agregar otros campos de ILaborRealizada si es necesario
    };
  
    // Llama al servicio para guardar un nuevo registro
    this.ProcesoService.store(data).subscribe({
      next: (response) => {
        Swal.fire({
          text: "Registro Creado.",
          icon: "success",
          confirmButtonColor: "#0056B3",
          showConfirmButton: false,
          timer: 1500,
        });
        this.redirectToprocesosRealizados();
      },
      error: (error: HttpErrorResponse) => {
        // Maneja el error como desees, por ejemplo, mostrando un mensaje de error
        this.utilService.modalResponse(error.error, "error");
      }
    });
  }
  
  


  private actualizarRegistro() {
    // Llama al servicio para actualizar el registro existente
    // Debes proporcionar el ID del registro a actualizar y los nuevos datos
    // this.ProcesoService.actualizarRegistro(this.id, this.selected_empacadora).subscribe({
    //   next: (response) => {
    //     Swal.fire({
    //       text: "Registro Actualizado.",
    //       icon: "success",
    //       confirmButtonColor: "#0056B3",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     this.redirectToprocesosRealizados();
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     // Maneja el error como desees, por ejemplo, mostrando un mensaje de error
    //     this.utilService.modalResponse(error.error, "error");
    //   }
    // });
  }
  






  // /*  */
  // model: NgbDateStruct;
  // disabled = true;


  // editing: any = {};
  // rows: any = new Array();

  // loadingIndicator = true;
  // reorderable = true;

  // /* constructor(private config: NgSelectConfig, private router: Router) {
  //   this.config.notFoundText = "Custom not found";
  //   this.config.appendTo = "body";
  //   this.config.bindValue = "value";

  //   setTimeout(() => {
  //     this.loadingIndicator = false;
  //   }, 1500);
  // } */

  // @HostListener("document:keydown", ["$event"])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.key === "a" && event.altKey) {
  //     this.Guardar();
  //   }
  // }
  /* Hacer foco sobre lote cuando se renderiza la pantalla */
  // @ViewChild("inputSelectlote") inputSelectlote!: NgSelectComponent;
  // ngAfterViewInit() {
  //   this.inputSelectlote.focus();
  // }


  @ViewChild("inputSelectlote") inputSelectlote!: NgSelectComponent;
   public onChangeLote() {
    this.inputSelectlote.focus();
    // Obtener el objeto seleccionado
    const selectedProduct = this.dataTable.find(producto => producto.codigoCuadrilla === this.selected_empacadora);
    // Actualizar la variable seleccionada
    this.selectedCodigoEmpacadora = selectedProduct ? selectedProduct.codigoCuadrilla : '';
  }

      /* Funcion para hacer focus al select de labor */
      @ViewChild("inputSelectloteCuadrilla") inputSelectloteCuadrilla!: NgSelectComponent;
      // Método para cuando cambia el segundo select
    public onChangeCuadrilla() {
    this.inputSelectloteCuadrilla.focus();
    // Obtener el objeto seleccionado
    const selectedProduct = this.dataTable.find(producto => producto.codigoCuadrilla === this.selected_cuadrilla);
    // Actualizar la variable seleccionada
    this.selectedCodigoCuadrilla = selectedProduct ? selectedProduct.codigoCuadrilla : '';
  }


  /* Funcion para hacer focus al input de procesado */
  @ViewChild("inputTextProcesado") inputTextProcesado!: ElementRef;
  public onChangeLabor() {
    this.inputTextProcesado.nativeElement.focus();
  }
}

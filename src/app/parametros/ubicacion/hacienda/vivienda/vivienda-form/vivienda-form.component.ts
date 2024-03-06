import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  IFormItems,
  PageFormType,
} from "src/app/component/form/form.interface";
import { ViviendaFormData } from "./vivienda-form.data";
import { FormService } from "src/app/component/form/form.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ViviendaService } from "../vivienda.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { IVivienda } from "../vivienda.interface";
import { InputService } from "src/app/component/input/input.service";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InvFactService } from "src/app/services/invfact/invfact.service";
import { TipoviviendaService } from "../../tipo-vivienda/tipo-vivienda.service";

@Component({
  templateUrl: "./vivienda-form.component.html",
})
export class ViviendaFormComponent implements OnInit {
  public pageFormType: PageFormType;
  private idVivienda: string;
  public viviendaForm: IFormItems;
  public tipoViviendaForm: IFormItems;
  private modalConfirmation: boolean = environment.modalConfirmation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private tipoviviendaService: TipoviviendaService,
    private viviendaService: ViviendaService,
    private validationsService: ValidationsService,
    private inputService: InputService,
    private utilService: UtilService,
    private invFactService: InvFactService,
  ) { }

  public ngOnInit(): void {
    this.validatePageFormType();
  }
  private validatePageFormType() {
    this.route.params.subscribe(
      (params: {
        idVivienda: string;
        pageFormType: PageFormType;
      }) => {
        this.pageFormType = params.pageFormType;
        this.idVivienda = params.idVivienda;
        switch (params.pageFormType) {
          case PageFormType.CREAR:
            this.getDataToComboBox();
            this.viviendaForm = ViviendaFormData.viviendaForm;
            this.tipoViviendaForm = ViviendaFormData.tipoViviendaForm;
            break;
          case PageFormType.MODIFICAR:
            this.getDataToUpdate(true);
            break;
          case PageFormType.CLONAR:
            this.getDataToUpdate(false);
            break;

          default:
            this.getDataToUpdate();
            break;
        }
      }
    );
  }
  private getDataToUpdate(allowSetKey: boolean = false) {
    this.viviendaService.getById(this.idVivienda).subscribe((response) => {
      /* Sector Form */
      this.viviendaForm = ViviendaFormData.viviendaForm.map((viviendaFormItem) => {
        const newViviendaFormItem = { ...viviendaFormItem };
        const value = response[newViviendaFormItem.id];
        newViviendaFormItem.defaultValue =
          value !== undefined ? value.toString() : "";
        return newViviendaFormItem;
      });

      /* Tipo de vivienda Form */
      this.tipoViviendaForm = ViviendaFormData.tipoViviendaForm.map(
        (tipoViviendaFormItem) => {
          const newtipoViviendaFormItem = { ...tipoViviendaFormItem };
          newtipoViviendaFormItem.defaultValue =
            response[newtipoViviendaFormItem.id]?.toString();
          return newtipoViviendaFormItem;
        }
      );

      if (allowSetKey) {
        this.viviendaForm = this.formService.changeValuePropFormById<IVivienda>(
          "codigoVivienda",
          this.viviendaForm,
          "disabled",
          true
        );
      }

      if (this.pageFormType === PageFormType.VISUALIZAR) {
        this.getDataToComboBox();
        this.viviendaForm = this.viviendaForm.map((field) => {
          return { ...field, disabled: true };
        });
        this.tipoViviendaForm = this.tipoViviendaForm.map((field) => {
          return { ...field, disabled: true };
        });
      }
      this.getDataToComboBox();
      this.selectTipoViviendaOption(response["codigoTipoVivienda"].toString());
    });
  }

  private selectTipoViviendaOption(codigoTipoVivienda: string) {
    if (codigoTipoVivienda) {
      const selectedIndex = this.tipoViviendaForm.findIndex(option => {
        const [codigo] = option.label.split(" - ");
        return codigo === codigoTipoVivienda;
      });
      if (selectedIndex !== -1) {
        this.tipoViviendaForm.forEach((option, index) => {
          option.defaultValue = index === selectedIndex ? option.label.split(" - ")[0] : null;
        });
      }
    }
  }
  


  private getDataToComboBox() {
    this.tipoviviendaService
    .index()
    .subscribe({
      next: (response) => {
        const combo = this.inputService.formatDataToOptions(
          response.tipoViviendaTypes,
          "descripcion",
          "codigo"
        );
        this.tipoViviendaForm = this.formService.changeValuePropFormById(
          "codigoTipoVivienda",
          this.tipoViviendaForm,
          "options",
          combo
        );
      },
    })
  }

  // private getDataToComboBox() {
  //   this.tipoviviendaService
  //     .index()
  //     .subscribe({
  //       next: (response) => {
  //         const combo = response.tipoViviendaTypes.map((item) => ({
  //           value: `${item.codigo} - ${item.descripcion}`,
  //           label: `${item.codigo} - ${item.descripcion}`
  //         }));
  //         this.tipoViviendaForm = this.formService.changeValuePropFormById(
  //           "codigoTipoVivienda",
  //           this.tipoViviendaForm,
  //           "options",
  //           combo
  //         );
  //       },
  //     })
  // }


  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/vivienda`,
    ]);
  }
  public validateToSave() {
    /* Formularios */
    const viviendaForm = this.formService.formValue.viviendaForm;
    const tipoViviendaForm = this.formService.formValue.tipoViviendaForm;
    /* Vivienda */
    const codigoViviendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(viviendaForm.codigoVivienda);
    const numeroPersonasNotEmpty =
      this.validationsService.isNotEmptyStringVariable(viviendaForm.numeroPersonas);
    const responsableNotEmpty =
      this.validationsService.isNotEmptyStringVariable(viviendaForm.responsable);

    /* Tipo de vivienda */
    const tipoViviendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        tipoViviendaForm.codigoTipoVivienda
      );

    if (
      codigoViviendaNotEmpty &&
      numeroPersonasNotEmpty &&
      responsableNotEmpty &&
      tipoViviendaNotEmpty
    ) {
      if (this.modalConfirmation) {
        Swal.fire({
          title: "¿Desea ingresar los datos?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#004998",
          cancelButtonColor: "#dc3545",
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.onSaveForm(viviendaForm, tipoViviendaForm);
          }
        });
      } else {
        this.onSaveForm(viviendaForm, tipoViviendaForm);
      }
    }
  }
  private onSaveForm(
    viviendaForm: any,
    tipoViviendaForm: any,
  ) {
    const request: IVivienda = {
      /* Vivienda */
      codigoHacienda: "2111",
      codigoSector: "0",
      codigoTipoVivienda: tipoViviendaForm.codigoTipoVivienda.split(" - ")[0],
      codigoVivienda: viviendaForm.codigoVivienda,
      numeroPersonas: viviendaForm.numeroPersonas,
      responsable: viviendaForm.responsable,
      aplicativoId: "",
      estacion: "",
      fechaActualizacion: "2024-02-17T04:23:53.5441341+00:00",
      fechaCreacion: "1900-01-02T00:00:00",
      horaCreacion: "2024-02-17T04:23:53.5441356+00:00",
      horaActualizacion: "2024-02-17T04:23:53.5441357+00:00",
      menuId: "1",
      usuarioCreacion: "1",
      usuarioActualizacion: ""
    };
    if ([PageFormType.CREAR, PageFormType.CLONAR].includes(this.pageFormType)) {
      this.viviendaService.store(request).subscribe({
        next: (response) => {
          this.utilService.modalResponse(
            "Registro creado exitosamente",
            "success"
          );
          this.goBackPage();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    } else if (PageFormType.MODIFICAR) {
      this.viviendaService.update(request).subscribe({
        next: (response) => {
          this.utilService.modalResponse(
            "Registro Actualizado exitosamente",
            "success"
          );
          this.goBackPage();
        },
        error: (error: HttpErrorResponse) =>
          this.utilService.modalResponse(error.error, "error"),
      });
    }
  }
}

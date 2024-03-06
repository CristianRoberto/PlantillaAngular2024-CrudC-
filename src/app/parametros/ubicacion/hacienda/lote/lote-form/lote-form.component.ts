import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import {
  IFormItems,
  PageFormType,
} from "src/app/component/form/form.interface";
import { LoteFormData } from "./lote-form.data";
import { FormService } from "src/app/component/form/form.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { LoteService } from "../lote.service";
import { ZonasService } from "../../zonas/zonas.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { ILote } from "../lote.interface";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { HaciendasService } from "../../haciendas/haciendas.service";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./lote-form.component.html",
})
export class LoteFormComponent implements OnInit {
  public pageFormType: PageFormType;
  private idLote: string;
  private idZona: string;
  private idHacienda: string;
  public loteForm: IFormItems;
  public hectareasForm: IFormItems;
  public aplicacionForm: IFormItems;
  private modalConfirmation: boolean = environment.modalConfirmation;
  public backButtonData: IBackButtonComponent;
  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private haciendasService: HaciendasService,
    private zonasService: ZonasService,
    private loteService: LoteService,
    private validationsService: ValidationsService,
    private utilService: UtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.validatePageFormType();
    this.getIdsFromRoute();
  }
  private validatePageFormType() {
    this.route.params.subscribe(
      (params: {
        idLote: string;
        pageFormType: PageFormType;
        idHacienda: string;
      }) => {
        this.pageFormType = params.pageFormType;
        this.idLote = params.idLote;
        this.idHacienda = params.idHacienda;
        switch (params.pageFormType) {
          case PageFormType.CREAR:
            this.loteForm = LoteFormData.loteForm;
            this.hectareasForm = LoteFormData.hectareasForm;
            this.aplicacionForm = LoteFormData.aplicacionForm;
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
    this.loteService.getById(this.idLote).subscribe((response) => {
      /* Lote Form */
      this.loteForm = LoteFormData.loteForm.map((loteFormItem) => {
        const newLoteFormItem = { ...loteFormItem };

        newLoteFormItem.defaultValue = response[newLoteFormItem.id]?.toString();

        return newLoteFormItem;
      });

      this.hectareasForm = LoteFormData.hectareasForm.map(
        (hectareasFormItem) => {
          const newHectareasFormItem = { ...hectareasFormItem };
          newHectareasFormItem.defaultValue =
            response[newHectareasFormItem.id]?.toString();
          return newHectareasFormItem;
        }
      );

      if (allowSetKey) {
        this.loteForm = this.formService.changeValuePropFormById<ILote>(
          "codigoLote",
          this.loteForm,
          "disabled",
          true
        );
        this.loteForm = this.formService.changeValuePropFormById<ILote>(
          "descripcionLote",
          this.loteForm,
          "disabled",
          true
        );
      }
      if (this.pageFormType === PageFormType.VISUALIZAR) {
        this.loteForm = this.loteForm.map((field) => {
          return { ...field, disabled: true };
        });
        this.hectareasForm = this.hectareasForm.map((field) => {
          return { ...field, disabled: true };
        });
      }
    });
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
  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}/${this.idHacienda}/lotes`,
    ]);
  }

  public validateToSave() {
    /* Formularios */
    const loteForm = this.formService.formValue.loteForm;
    const hectareasForm = this.formService.formValue.hectareasForm;
    /* Lote */
    const codigoLoteNotEmpty = this.validationsService.isNotEmptyStringVariable(
      loteForm.codigoLote
    );
    const descripcionLoteNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        loteForm.descripcionLote
      );

    /* Hectáreas */
    const hasCultivoNotEmpty = this.validationsService.isNotEmptyStringVariable(
      hectareasForm.hasCultivo
    );
    const hasEnfundadasNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        hectareasForm.hasEnfundadas
      );
    const hasProduccionNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        hectareasForm.hasProduccion
      );

    if (
      codigoLoteNotEmpty &&
      descripcionLoteNotEmpty &&
      hasCultivoNotEmpty &&
      hasEnfundadasNotEmpty &&
      hasProduccionNotEmpty
      // hasTotalesNotEmpty &&
      // numeroRenovacionesNotEmpty
    ) {
      if (this.modalConfirmation) {
        Swal.fire(UtilData.messageToSave).then((result) => {
          if (result.isConfirmed) {
            this.onSaveForm(loteForm, hectareasForm);
          }
        });
      } else {
        this.onSaveForm(loteForm, hectareasForm);
      }
    }
  }
  private onSaveForm(loteForm: any, hectareasForm: any) {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();
    const request: ILote = {
      /* Lote */
      codigoHacienda: this.idHacienda,
      codigoSector: "1",
      codigoLote: loteForm.codigoLote,
      codigoEmpacadora: "45",
      codigoProducto: "1",
      descripcionLote: loteForm.descripcionLote,
      hasTotales: "100",
      hasCultivo: hectareasForm.hasCultivo,
      hasEnfundadas: hectareasForm.hasEnfundadas,
      hasProduccion: hectareasForm.hasProduccion,
      numeroRenovaciones: "0",
      codigoLocalidad: "1",
      tipoPlantacion: "1",
      loteActivo: "0",
      aplicativoId: "",
      estacion: "",
      fechaActualizacion: "2024-02-14T03:24:09.9738463+00:00",
      fechaCreacion: formattedCurrentDate,
      horaCreacion: formattedCurrentDate,
      horaActualizacion: "2024-02-14T03:24:09.9738463+00:00",
      menuId: "1",
      usuarioCreacion: "1",
      usuarioActualizacion: "",

      fechaSiembra: "2024-02-13T22:59:33.227",
    };
    if ([PageFormType.CREAR, PageFormType.CLONAR].includes(this.pageFormType)) {
      this.loteService.store(request).subscribe({
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
      this.loteService.update(request).subscribe({
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

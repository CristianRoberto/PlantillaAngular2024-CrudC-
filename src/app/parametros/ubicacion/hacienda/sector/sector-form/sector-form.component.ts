import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import {
  IFormItems,
  PageFormType,
} from "src/app/component/form/form.interface";
import { SectorFormData } from "./sector-form.data";
import { FormService } from "src/app/component/form/form.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { SectoresService } from "../sectores.service";
import { ZonasService } from "../../zonas/zonas.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { ISector } from "../sectores.interface";
import { InputService } from "src/app/component/input/input.service";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InvFactService } from "src/app/services/invfact/invfact.service";
import { HaciendasService } from "../../haciendas/haciendas.service";
import { Location } from "@angular/common";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./sector-form.component.html",
})
export class SectorFormComponent implements OnInit {
  public pageFormType: PageFormType;
  private idSector: string;
  private idZona: string;
  private idHacienda: string;
  public sectorForm: IFormItems;
  public jefeSectorForm: IFormItems;
  public coordenadas1Form: IFormItems;
  public coordenadas2Form: IFormItems;
  private modalConfirmation: boolean = environment.modalConfirmation;
  public backButtonData: IBackButtonComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private haciendasService: HaciendasService,
    private zonasService: ZonasService,
    private sectorService: SectoresService,
    private validationsService: ValidationsService,
    private inputService: InputService,
    private utilService: UtilService,
    private invFactService: InvFactService,
    private location: Location
  ) {}

  public ngOnInit(): void {
    this.validatePageFormType();
    this.getIdsFromRoute();
  }
  private validatePageFormType() {
    this.route.params.subscribe(
      (params: {
        idSector: string;
        pageFormType: PageFormType;
        idHacienda: string;
      }) => {
        this.pageFormType = params.pageFormType;
        this.idSector = params.idSector;
        this.idHacienda = params.idHacienda;
        switch (params.pageFormType) {
          case PageFormType.CREAR:
            this.sectorForm = SectorFormData.sectorForm;
            this.jefeSectorForm = SectorFormData.jefeSectorForm;
            this.coordenadas1Form = SectorFormData.coordenadas1Form;
            this.coordenadas2Form = SectorFormData.coordenadas2Form;
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
    this.sectorService.getById(this.idSector).subscribe((response) => {
      /* Sector Form */
      this.sectorForm = SectorFormData.sectorForm.map((sectorFormItem) => {
        const newSectorFormItem = { ...sectorFormItem };
        const value = response[newSectorFormItem.id];
        newSectorFormItem.defaultValue =
          value !== undefined ? value.toString() : "";
        return newSectorFormItem;
      });

      /* Jefe Sector Form */
      this.jefeSectorForm = SectorFormData.jefeSectorForm.map(
        (jefeSectorFormItem) => {
          const newJefeSectorFormItem = { ...jefeSectorFormItem };
          if (
            this.pageFormType === PageFormType.VISUALIZAR ||
            this.pageFormType === PageFormType.CLONAR
          ) {
            // Obtener el valor del campo jefeSector del formulario original
            const jefeSectorOriginalValue = response["jefeSector"]; // Ajusta esto al nombre real del campo jefeSector en tu objeto de respuesta
            // Establecer el valor predeterminado del campo jefeSector
            newJefeSectorFormItem.defaultValue =
              jefeSectorOriginalValue !== undefined
                ? jefeSectorOriginalValue.toString()
                : "";
          }
          return newJefeSectorFormItem;
        }
      );

      /* Coordenadas 1 Form */
      this.coordenadas1Form = SectorFormData.coordenadas1Form.map(
        (coordenadas1FormItem) => {
          const newCoordenadas1FormItem = { ...coordenadas1FormItem };
          newCoordenadas1FormItem.defaultValue =
            response[newCoordenadas1FormItem.id]?.toString();
          return newCoordenadas1FormItem;
        }
      );

      /* Coordenadas 2 Form */
      this.coordenadas2Form = SectorFormData.coordenadas2Form.map(
        (coordenadas2FormItem) => {
          const newCoordenadas2FormItem = { ...coordenadas2FormItem };
          newCoordenadas2FormItem.defaultValue =
            response[newCoordenadas2FormItem.id]?.toString();
          return newCoordenadas2FormItem;
        }
      );

      if (allowSetKey) {
        this.sectorForm = this.formService.changeValuePropFormById<ISector>(
          "codigoSector",
          this.sectorForm,
          "disabled",
          true
        );
        this.sectorForm = this.formService.changeValuePropFormById<ISector>(
          "descripcion",
          this.sectorForm,
          "disabled",
          true
        );
      }
      if (this.pageFormType === PageFormType.VISUALIZAR) {
        this.sectorForm = this.sectorForm.map((field) => {
          return { ...field, disabled: true };
        });
        this.jefeSectorForm = this.jefeSectorForm.map((field) => {
          return { ...field, disabled: true };
        });
        this.coordenadas1Form = this.coordenadas1Form.map((field) => {
          return { ...field, disabled: true };
        });

        this.coordenadas2Form = this.coordenadas2Form.map((field) => {
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
  // private getDataToCombo() {
  //   this.jefeSectorService
  //     .index()
  //     .subscribe({
  //       next: (response) => {
  //         const combo = this.inputService.formatDataToOptions(
  //           response.jefesectorTypes,
  //           "descripcion",
  //           "jefeSector"
  //         );
  //       },
  //     });
  // }
  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}/${this.idHacienda}/sectores`,
    ]);
  }
  public validateToSave() {
    /* Formularios */
    const sectorForm = this.formService.formValue.sectorForm;

    const coordenadas1Form = this.formService.formValue.coordenadas1Form;
    const coordenadas2Form = this.formService.formValue.coordenadas2Form;
    /* Sector */

    const codigoSectorNotEmpty =
      this.validationsService.isNotEmptyStringVariable(sectorForm.codigoSector);
    const descripcionSectorNotEmpty =
      this.validationsService.isNotEmptyStringVariable(sectorForm.descripcion);

    /* Coordenadas */
    const coordenadaNorteNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        coordenadas1Form.coordenadaNorte
      );
    const coordenadaSurNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        coordenadas1Form.coordenadaSur
      );
    const coordenadaEsteNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        coordenadas2Form.coordenadaEste
      );
    const coordenadaOesteNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        coordenadas2Form.coordenadaOeste
      );

    if (
      // codigoHaciendaNotEmpty &&
      codigoSectorNotEmpty &&
      descripcionSectorNotEmpty &&
      coordenadaNorteNotEmpty &&
      coordenadaSurNotEmpty &&
      coordenadaEsteNotEmpty &&
      coordenadaOesteNotEmpty
    ) {
      if (this.modalConfirmation) {
        Swal.fire(UtilData.messageToSave).then((result) => {
          if (result.isConfirmed) {
            this.onSaveForm(sectorForm, coordenadas1Form, coordenadas2Form);
          }
        });
      } else {
        this.onSaveForm(sectorForm, coordenadas1Form, coordenadas2Form);
      }
    }
  }
  private onSaveForm(
    sectorForm: any,
    coordenadas1Form: any,
    coordenadas2Form: any
  ) {
    const request: ISector = {
      /* Sector */
      codigoHacienda: this.idHacienda,
      codigoSector: sectorForm.codigoSector,
      descripcion: sectorForm.descripcion,
      jefeSector: this.formService.formValue.jefeSectorForm.dataJefeSector, // Obtener el valor seleccionado en el campo jefeSector
      coordenadaNorte: coordenadas1Form.coordenadaNorte,
      coordenadaSur: coordenadas1Form.coordenadaSur,
      coordenadaEste: coordenadas2Form.coordenadaEste,
      coordenadaOeste: coordenadas2Form.coordenadaOeste,
    };

    if ([PageFormType.CREAR, PageFormType.CLONAR].includes(this.pageFormType)) {
      this.sectorService.store(request).subscribe({
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
      this.sectorService.update(request).subscribe({
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

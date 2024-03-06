import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBackButtonComponent } from "src/app/component/back-button/back-button.interface";
import {
  IFormItems,
  PageFormType,
} from "src/app/component/form/form.interface";
import { HaciendaFormData } from "./hacienda-form.data";
import { FormService } from "src/app/component/form/form.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { HaciendasService } from "../haciendas.service";
import { ZonasService } from "../../zonas/zonas.service";
import { ValidationsService } from "src/app/services/validations/validations.service";
import { IHacienda } from "../haciendas.interface";
import { SubzonaService } from "../../subzonas/subzonas.service";
import { InputService } from "src/app/component/input/input.service";
import { UtilService } from "src/app/services/util/util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InvFactService } from "src/app/services/invfact/invfact.service";
import {
  IInvFacCantones,
  IInvFacProductores,
  IInvFacProvincias,
  IInvFacSectores,
} from "src/app/services/invfact/invfact.interface";
import { UtilData } from "src/app/services/util/util.data";

@Component({
  templateUrl: "./hacienda-form.component.html",
})
export class HaciendasFormComponent implements OnInit {
  public pageFormType: PageFormType;
  private idHacienda: string;
  private idZona: string;
  public haciendaForm: IFormItems;
  public ubicacionForm: IFormItems;
  public ubicacionPNBForm: IFormItems;
  public backButtonOptions: IBackButtonComponent = {
    mainText: "",
    onBackFunction: "",
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private zonaService: ZonasService,
    private haciendaService: HaciendasService,
    private validationsService: ValidationsService,
    private subzonaService: SubzonaService,
    private inputService: InputService,
    private utilService: UtilService,
    private invFactService: InvFactService
  ) {}

  public ngOnInit(): void {
    this.validatePageFormType();
    this.getDetailToBackButtonData();
    this.getDataToCombo();
  }
  private validatePageFormType() {
    this.route.params.subscribe(
      (params: {
        idZona: string;
        pageFormType: PageFormType;
        idHacienda: string;
      }) => {
        this.pageFormType = params.pageFormType;
        this.idHacienda = params.idHacienda;
        this.idZona = params.idZona;
        switch (params.pageFormType) {
          case PageFormType.CREAR:
            this.haciendaForm = HaciendaFormData.haciendaForm;
            this.ubicacionForm = HaciendaFormData.ubicacionForm;
            this.ubicacionPNBForm = HaciendaFormData.ubicacionPNBForm;
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
    this.haciendaService.getById(this.idHacienda).subscribe((response) => {
      /* Hacienda Form */
      this.haciendaForm = HaciendaFormData.haciendaForm.map(
        (haciendaFormItem) => {
          const newHaciendaFormItem = { ...haciendaFormItem };
          if (["lfimple", "lfesgpo"].includes(newHaciendaFormItem.id)) {
            newHaciendaFormItem.defaultValue =
              response[newHaciendaFormItem.id]?.toString() === "S";
          } else {
            newHaciendaFormItem.defaultValue =
              response[newHaciendaFormItem.id]?.toString();
          }
          return newHaciendaFormItem;
        }
      );
      /* Ubicacion Form */
      this.ubicacionForm = HaciendaFormData.ubicacionForm.map(
        (ubicacionFormItem) => {
          const newUbicacionFormItem = { ...ubicacionFormItem };
          switch (ubicacionFormItem.id) {
            case "provincia":
              newUbicacionFormItem.defaultValue = `${response.eM1g1A}-${response.eM1g2A}-${response.eM1g3A}`;
              break;
            case "canton":
              newUbicacionFormItem.defaultValue = `${response.eM1g7A}-${response.eM1g8A}-${response.eM1g9A}`;
              break;
            case "sector":
              newUbicacionFormItem.defaultValue = `${response.eM1gdA}-${response.eM1geA}-${response.eM1gfA}`;
              break;
            default:
              newUbicacionFormItem.defaultValue =
                response[newUbicacionFormItem.id]?.toString();
              break;
          }

          return newUbicacionFormItem;
        }
      );
      /* Ubicacion PNB Form */
      this.ubicacionPNBForm = HaciendaFormData.ubicacionPNBForm.map(
        (ubicacionPNBFormItem) => {
          const newUbicacionPNBFormItem = { ...ubicacionPNBFormItem };
          switch (ubicacionPNBFormItem.id) {
            case "provincia":
              newUbicacionPNBFormItem.defaultValue = `${response.eM1g4A}-${response.eM1g5A}-${response.eM1g6A}`;
              break;
            case "canton":
              newUbicacionPNBFormItem.defaultValue = `${response.eM1gaA}-${response.eM1gbA}-${response.eM1gcA}`;
              break;
            case "sector":
              newUbicacionPNBFormItem.defaultValue = `${response.eM1ggA}-${response.eM1ghA}-${response.eM1giA}`;
              break;

            default:
              newUbicacionPNBFormItem.defaultValue =
                response[newUbicacionPNBFormItem.id]?.toString();
              break;
          }
          return newUbicacionPNBFormItem;
        }
      );
      if (allowSetKey) {
        this.haciendaForm = this.formService.changeValuePropFormById<IHacienda>(
          "codigoHacienda",
          this.haciendaForm,
          "disabled",
          true
        );
        this.haciendaForm = this.formService.changeValuePropFormById<IHacienda>(
          "nombreHacienda",
          this.haciendaForm,
          "disabled",
          true
        );
      }
      if (this.pageFormType === PageFormType.VISUALIZAR) {
        this.haciendaForm = this.haciendaForm.map((x) => {
          x.disabled = true;
          return x;
        });
        this.ubicacionForm = this.ubicacionForm.map((x) => {
          x.disabled = true;
          return x;
        });
        this.ubicacionPNBForm = this.ubicacionPNBForm.map((x) => {
          x.disabled = true;
          return x;
        });
      }
    });
  }
  private getDetailToBackButtonData() {
    this.zonaService.getById(this.idZona).subscribe((response) => {
      this.backButtonOptions = {
        mainText: response.descripcion,
        onBackFunction: "goBackPage",
      };
    });
  }
  private getDataToCombo() {
    /* Subzona */
    this.subzonaService
      .index()
      .subscribe({
        next: (response) => {
          const combo = this.inputService.formatDataToOptions(
            response.subZonaTypes,
            "descripcion",
            "subZonaCodigo"
          );
          this.ubicacionForm = this.formService.changeValuePropFormById(
            "codigoSubZona",
            this.ubicacionForm,
            "options",
            combo
          );
        },
      })
      .add(() => {
        /* Sector */
        this.invFactService
          .index<IInvFacSectores>("sector")
          .subscribe({
            next: (response) => {
              const combo = this.inputService.formatDataToOptionsSomeValues(
                response,
                "descripcion",
                ["drky", "drrt", "drsy"]
              );
              this.ubicacionPNBForm = this.formService.changeValuePropFormById(
                "sector",
                this.ubicacionPNBForm,
                "options",
                combo
              );
              this.ubicacionForm = this.formService.changeValuePropFormById(
                "sector",
                this.ubicacionForm,
                "options",
                combo
              );
            },
          })
          .add(() => {
            /* Productor */
            this.invFactService
              .index<IInvFacProductores>("productores")
              .subscribe({
                next: (response) => {
                  const combo = this.inputService.formatDataToOptions(
                    response,
                    "nombreApellido",
                    "codigoProductor"
                  );
                  this.haciendaForm = this.formService.changeValuePropFormById(
                    "productor",
                    this.haciendaForm,
                    "options",
                    combo
                  );
                },
              })
              .add(() => {
                /* Canton */
                this.invFactService
                  .index<IInvFacCantones>("cantones")
                  .subscribe({
                    next: (response) => {
                      const combo =
                        this.inputService.formatDataToOptionsSomeValues(
                          response,
                          "descripcion",
                          ["drky", "drrt", "drsy"]
                        );
                      this.ubicacionForm =
                        this.formService.changeValuePropFormById(
                          "canton",
                          this.ubicacionForm,
                          "options",
                          combo
                        );
                      this.ubicacionPNBForm =
                        this.formService.changeValuePropFormById(
                          "canton",
                          this.ubicacionPNBForm,
                          "options",
                          combo
                        );
                    },
                  })
                  .add(() => {
                    /* Provincia */
                    this.invFactService
                      .index<IInvFacProvincias>("provincia")
                      .subscribe({
                        next: (response) => {
                          const combo =
                            this.inputService.formatDataToOptionsSomeValues(
                              response,
                              "descripcion",
                              ["drky", "drrt", "drsy"]
                            );
                          this.ubicacionForm =
                            this.formService.changeValuePropFormById(
                              "provincia",
                              this.ubicacionForm,
                              "options",
                              combo
                            );
                          this.ubicacionPNBForm =
                            this.formService.changeValuePropFormById(
                              "provincia",
                              this.ubicacionPNBForm,
                              "options",
                              combo
                            );
                        },
                      });
                  });
              });
          });
      });
  }
  private goBackPage() {
    this.router.navigate([
      `parametros/ubicacion/hacienda/haciendas/${this.idZona}`,
    ]);
  }
  public validateToSave() {
    /* Formularios */
    const haciendaForm = this.formService.formValue.haciendaForm;
    const ubicacionForm = this.formService.formValue.ubicacionForm;
    const ubicacionPNBForm = this.formService.formValue.ubicacionPNBForm;
    /**
     * Validaciones
     */
    /* Hacienda */
    const codigoHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        haciendaForm.codigoHacienda
      );
    const nombreHaciendaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        haciendaForm.nombreHacienda
      );
    const productorNotEmpty = this.validationsService.isNotEmptyStringVariable(
      haciendaForm.productor
    );
    /* Ubicacion */
    const ubicacionProvinciaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(ubicacionForm.provincia);
    const ubicacionCantonNotEmpty =
      this.validationsService.isNotEmptyStringVariable(ubicacionForm.canton);
    const ubicacionSubzonaNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        ubicacionForm.codigoSubZona
      );
    /* Ubicacion PNB */
    const provinciaPNBNotEmpty =
      this.validationsService.isNotEmptyStringVariable(
        ubicacionPNBForm.provincia
      );
    const cantonPNBNotEmpty = this.validationsService.isNotEmptyStringVariable(
      ubicacionPNBForm.canton
    );
    const sectorPNBNotEmpty = this.validationsService.isNotEmptyStringVariable(
      ubicacionPNBForm.sector
    );
    /* Validacion Modal */
    if (
      codigoHaciendaNotEmpty &&
      nombreHaciendaNotEmpty &&
      productorNotEmpty &&
      ubicacionProvinciaNotEmpty &&
      ubicacionCantonNotEmpty &&
      ubicacionSubzonaNotEmpty &&
      provinciaPNBNotEmpty &&
      cantonPNBNotEmpty &&
      sectorPNBNotEmpty
    ) {
      if (environment.modalConfirmation) {
        Swal.fire(UtilData.messageToSave).then((result) => {
          if (result.isConfirmed) {
            this.onSaveForm(haciendaForm, ubicacionForm, ubicacionPNBForm);
          }
        });
      } else {
        this.onSaveForm(haciendaForm, ubicacionForm, ubicacionPNBForm);
      }
    }
  }
  private onSaveForm(
    haciendaForm: any,
    ubicacionForm: any,
    ubicacionPNBForm: any
  ) {
    const ubicacionProvincia = ubicacionForm.provincia.split("-");
    const ubicacionCanton = ubicacionForm.canton.split("-");
    const ubicacionSector = ubicacionForm.sector.split("-");
    const ubicacionProvinciaPNB = ubicacionPNBForm.provincia.split("-");
    const ubicacionCantonPNB = ubicacionPNBForm.canton.split("-");
    const ubicacionSectorPNB = ubicacionPNBForm.sector.split("-");
    const request: IHacienda = {
      /* Hacienda */
      codigoHacienda: haciendaForm.codigoHacienda,
      nombreHacienda: haciendaForm.nombreHacienda,
      codigoZona: this.idZona,
      productor: haciendaForm.productor,
      lfimple: haciendaForm.lfimple ? "S" : "N",
      lfesgpo: haciendaForm.lfesgpo ? "S" : "N",
      /* Ubicacion */
      /* Provincia */
      eM1g1A: ubicacionProvincia[0],
      eM1g2A: ubicacionProvincia[1],
      eM1g3A: ubicacionProvincia[2],
      /* Canton */
      eM1g7A: ubicacionCanton[0],
      eM1g8A: ubicacionCanton[1],
      eM1g9A: ubicacionCanton[2],
      /* Sector */
      eM1gdA: ubicacionSector[0],
      eM1geA: ubicacionSector[1],
      eM1gfA: ubicacionSector[2],
      codigoSubZona: ubicacionForm.codigoSubZona,
      /* Ubicacion PNB */
      codigoPNB: ubicacionPNBForm.codigoPNB,
      inscPNB: ubicacionPNBForm.inscPNB,
      /* Provincia PNB */
      eM1g4A: ubicacionProvinciaPNB[0],
      eM1g5A: ubicacionProvinciaPNB[1],
      eM1g6A: ubicacionProvinciaPNB[2],
      /* Canton PNB */
      eM1gaA: ubicacionCantonPNB[0],
      eM1gbA: ubicacionCantonPNB[1],
      eM1gcA: ubicacionCantonPNB[2],
      /* Sector PNB */
      eM1ggA: ubicacionSectorPNB[0],
      eM1ghA: ubicacionSectorPNB[1],
      eM1giA: ubicacionSectorPNB[2],
      aplicativoID: "",
    };
    if ([PageFormType.CREAR, PageFormType.CLONAR].includes(this.pageFormType)) {
      this.haciendaService.store(request).subscribe({
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
      this.haciendaService.update(request).subscribe({
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

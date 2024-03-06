import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import {
  NgbDropdownModule,
  NgbAccordionModule,
  NgbCarouselModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";
import { NgScrollbarModule } from "ngx-scrollbar";
import {
  ISelectOption,
  ISelectOptions,
} from "src/app/component/input/input.interface";
import { ROUTES } from "../vertical-sidebar/vertical-menu-items";
import { RouteInfo } from "../vertical-sidebar/vertical-sidebar.metadata";
import { Router } from "@angular/router";
import { ComponentsModule } from "src/app/component/component.module";
import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import { VerticalNavigationData } from "./vertical-navigation.data";

@Component({
  selector: "app-vertical-navigation",
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgScrollbarModule,
    CommonModule,
    NgbAccordionModule,
    NgbCarouselModule,
    NgSelectModule,
    ComponentsModule,
  ],
  templateUrl: "./vertical-navigation.component.html",
  styleUrls: ["./vertical-navigation.component.scss"],
})
export class VerticalNavigationComponent {
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  public pagesToSearch: ISelectOptions = [];
  public userName: string = "Esuarez";
  public profile: string = "Supervisor";
  public profiles: IDropdownOptions = [
    { id: "administracion", name: "Administracion" },
    { id: "agricola", name: "Agricola" },
  ];
  public dropdownButtonClasses: string[] =
    VerticalNavigationData.dropdownButtonClasses;
  public userDropdownOptions: IDropdownOptions =
    VerticalNavigationData.userDropdownOptions;

  constructor(private router: Router) {}

  /**
   * Función para obtener todas las rutas declaradas en el sidebar
   *
   * @param routes
   * @param options
   */
  private processRoutes(routes: RouteInfo[], options: ISelectOptions) {
    routes.forEach((route) => {
      if (route.submenu.length === 0) {
        options.push({ label: route.title, value: route.path });
      } else {
        this.processRoutes(route.submenu, options);
      }
    });
  }
  /**
   * Función para llenar el combo del select de rutas
   *
   * @param routeDetail detalle de la ruta
   */
  public onChangeText(routeDetail: { term: string; items: ISelectOptions }) {
    const routeName: string = routeDetail.term;
    const options: ISelectOptions = [];
    this.processRoutes(ROUTES, options);
    this.pagesToSearch = options.filter((x) =>
      x.label.toLowerCase().includes(routeName.toLowerCase())
    );
  }
  /**
   * Función de redirección cuando seleccionas una pantalla
   *
   * @param option opcion seleccionada
   */
  public onSelectRoute(option: ISelectOption) {
    this.router.navigate([option.value]);
    this.ngSelectComponent.handleClearClick();
    this.pagesToSearch = [];
  }
}

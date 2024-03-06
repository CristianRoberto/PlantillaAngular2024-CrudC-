import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HorizontalSidebarService } from "./horizontal-sidebar.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FeatherModule } from "angular-feather";
import { RouteInfo } from "../vertical-sidebar/vertical-sidebar.metadata";

@Component({
  selector: "app-horizontal-sidebar",
  standalone: true,
  imports: [TranslateModule, CommonModule, FeatherModule, RouterModule],
  templateUrl: "./horizontal-sidebar.component.html",
})
export class HorizontalSidebarComponent {
  showMenu = "";
  showSubMenu = "";
  public sidebarnavItems: RouteInfo[] = [];
  path = "";

  constructor(private menuServise: HorizontalSidebarService) {
    this.menuServise.items.subscribe((menuItems) => {
      this.sidebarnavItems = menuItems;
      this.addExpandClass(this.path);
    });
  }

  addExpandClass(element: any) {
    this.showMenu = element;
  }

  addActiveClass(element: any) {
    this.showSubMenu = element;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}

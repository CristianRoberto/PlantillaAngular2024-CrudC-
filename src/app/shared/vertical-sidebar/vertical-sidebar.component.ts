import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { RouteInfo } from "./vertical-sidebar.metadata";
import { VerticalSidebarService } from "./vertical-sidebar.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FeatherModule } from "angular-feather";

@Component({
  selector: "app-vertical-sidebar",
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule, FeatherModule],
  templateUrl: "./vertical-sidebar.component.html",
})
export class VerticalSidebarComponent implements OnInit {
  public showMenu: string = "";
  public showSubMenu: string = "";
  public sidebarnavItems: RouteInfo[] = [];

  public levelActive = {};

  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private menuServise: VerticalSidebarService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.menuServise.items.subscribe((menuItems) => {
      this.sidebarnavItems = menuItems;
      const menu = this.sidebarnavItems.find((m) =>
        m.submenu.some((s) => s.path === this.router.url)
      );
      this.activeMenuAtPosition(1, menu?.title);
    });
  }
  /**
   * Función para activar/desactivar menú
   * @param level nivel del menu/subMenú
   * @param pageTitle nombre de la página
   */
  public activeMenuAtPosition(level: number, pageTitle: string) {
    this.levelActive = {
      ...this.levelActive,
      [level]: pageTitle !== this.levelActive[level] ? pageTitle : "0",
    };
  }

  public handleNotify() {
    this.notify.emit(!this.showClass);
  }
}

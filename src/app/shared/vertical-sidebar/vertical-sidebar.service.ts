import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RouteInfo } from "./vertical-sidebar.metadata";
import { ROUTES, routesDev } from "./vertical-menu-items";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VerticalSidebarService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  MENUITEMS: RouteInfo[] = ROUTES;

  items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

  constructor() {
    if (!environment.production) {
      this.items.next([...ROUTES, ...routesDev]);
    }
  }
}

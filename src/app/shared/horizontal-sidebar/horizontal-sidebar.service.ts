import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ROUTES } from "../vertical-sidebar/vertical-menu-items";
import { RouteInfo } from "../vertical-sidebar/vertical-sidebar.metadata";

@Injectable({
  providedIn: "root",
})
export class HorizontalSidebarService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  MENUITEMS: RouteInfo[] = ROUTES;

  items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);
}

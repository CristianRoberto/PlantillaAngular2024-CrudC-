// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon?: string;
  materialIcon?: string;
  class: string;
  extralink: boolean;
  label: string;
  labelClass: string;
  submenu: RouteInfo[];
}

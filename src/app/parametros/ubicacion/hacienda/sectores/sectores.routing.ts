import { Routes } from "@angular/router";

export const SectoresRoutes: Routes = [
  {
    path: "lote",
    loadChildren: () => import("./lote/lote.module").then((m) => m.LoteModule),
  },
];

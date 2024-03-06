import { Routes } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "parametros/ubicacion/hacienda/zonas", pathMatch: "full" },
      {
        path: "starter",
        loadChildren: () =>
          import("./starter/starter.module").then((m) => m.StarterModule),
      },
      {
        path: "parametros",
        loadChildren: () =>
          import("./parametros/parametros.module").then(
            (m) => m.ParametrosModule
          ),
      },
      {
        path: "labores-agricolas",
        loadChildren: () =>
          import("./labores_agricolas/labores_agricolas.module").then(
            (m) => m.LaboresAgricolasModule
          ),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "parametros/ubicacion/hacienda/zonas",
  },

];

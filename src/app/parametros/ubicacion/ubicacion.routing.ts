import { Routes } from "@angular/router";
import { FumigacionComponent } from "./fumigacion/fumigacion.component";


export const UbicacionRoutes: Routes = [
  {
    path: "hacienda",
    loadChildren: () =>
      import("./hacienda/hacienda.module").then((m) => m.HaciendaModule),
  },
  {
    path: "fumigacion",
    component: FumigacionComponent,
    data: {
      title: "Fumigación",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Fumigación" }
      ],
    },
  },
  
];

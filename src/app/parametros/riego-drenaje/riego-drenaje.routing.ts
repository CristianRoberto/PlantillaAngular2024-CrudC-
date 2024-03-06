import { Routes } from "@angular/router";
import { TensiometroComponent } from "./tensiometro/tensiometro.component";

export const RiegoDrenajeRoutes:Routes = [
  {
    path: 'tensiometro',
    component: TensiometroComponent,
    data: {
      title: "Tensiómetros",
      urls: [
        { title: "Parámetros" },
        { title: "Riego y Drenaje" },
        { title: "Tensiómetros" },
      ],
    }
  },
]

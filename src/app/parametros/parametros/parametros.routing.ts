import { Routes } from "@angular/router";
import { GeneralesComponent } from "./generales/generales.component";

export const ParametrosRoutes: Routes = [
  {
    path: 'generales',
    component: GeneralesComponent,
    data: {
      title: "Parametros Generales",
      urls: [
        { title: "Parámetros" },
        { title: "Parametros Generales" },
      ],
    }
  },
]
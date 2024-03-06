import { Routes } from "@angular/router";
import { LocalizacionComponent } from "../../localizacion/localizacion.component";

export const loteRoutes: Routes = [
  {
    path: "localizaciones",
    component: LocalizacionComponent,
    data: {
      title: "Localizaciones",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Sectores" },
        { title: "Lote" },
        { title: "Localizaciones" },
      ],
    },
  },
];

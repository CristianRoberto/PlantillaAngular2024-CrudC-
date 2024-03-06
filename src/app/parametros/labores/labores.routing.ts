import { Routes } from "@angular/router";
import { CostoMuestreoComponent } from "./costo-muestreo/costo-muestreo.component";
import { CodigoPlagaComponent } from "./codigo-plaga/codigo-plaga.component";

export const LaboresRoutes: Routes = [
  {
    path: "costo-muestreo",
    component: CostoMuestreoComponent,
    data: {
      title: "Costo Por Tipo De Muestreo",
      urls: [
        { title: "Parámetros" },
        { title: "Labores" },
        { title: "Costo por Tipo de Muestreo" },
      ],
    },
  },
  {
    path: "codigo-plaga",
    component: CodigoPlagaComponent,
    data: {
      title: "Código de plaga",
      urls: [
        { title: "Parámetros" },
        { title: "Labores" },
        { title: "Código de plaga" },
      ],
    },
  },
];

import { Routes } from "@angular/router";
import { DefectosComponent } from "./defectos/defectos.component";
import { TipoDefectoComponent } from "./tipo-defecto/tipo-defecto.component";

export const CalidadRoutes: Routes = [
  {
    path: "defectos",
    component: DefectosComponent,
    data: {
      title: "Defectos",
      urls: [
        { title: "Parámetros" },
        { title: "Calidad" },
        { title: "Defectos" },
      ],
    },
  },
  {
    path: "tipo-defectos",
    component: TipoDefectoComponent,
    data: {
      title: "Tipo Defectos",
      urls: [
        { title: "Parámetros" },
        { title: "Calidad" },
        { title: "Tipo Defectos" },
      ],
    },
  },
  
];

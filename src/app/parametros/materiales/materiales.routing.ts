import { Routes } from "@angular/router";
import { UnidadComparacionComponent } from "./unidad-comparacion/unidad-comparacion.component";
import { TipoComponenteComponent } from "./tipo-componente/tipo-componente.component";
import { OptimoMaterialesComponent } from "./optimo-materiales/optimo-materiales.component";

export const MaterialesRoutes: Routes = [
  {
    path: "unidad-comparacion",
    component: UnidadComparacionComponent,
    data: {
      title: "Unidad de Comparación",
      urls: [
        { title: "Parámetros" },
        { title: "Materiales" },
        { title: "Unidad de Comparación" },
      ],
    },
  },
  {
    path: "tipo-componente",
    component: TipoComponenteComponent,
    data: {
      title: "Tipo de Componente",
      urls: [
        { title: "Parámetros" },
        { title: "Materiales" },
        { title: "Tipo de Componente" },
      ],
    },
  },
  {
    path: "optimo-materiales",
    component: OptimoMaterialesComponent,
    data: {
      title: "Optimo de Materiales",
      urls: [
        { title: "Parámetros" },
        { title: "Materiales" },
        { title: "Optimo Materiales" },
      ],
    },
  },
];

import { Routes } from "@angular/router";
import { LaboresRealizadasComponent } from "./labores_realizadas/labores-realizadas.component";
import { FormularioLaboresRealizadasComponent } from "./labores_realizadas/formulario-labores-realizadas/formulario-labores-realizadas.component";

export const LaboresAgricolasRoutes: Routes = [
  {
    path: "labores-realizadas",
    component: LaboresRealizadasComponent,
    data: {
      title: "Labores Realizadas",
      urls: [{ title: "Labores Agricolas" }, { title: "Labores Realizadas" }],
    },
  },
  {
    path: "crear-labores-realizadas",
    component: FormularioLaboresRealizadasComponent,
    data: {
      title: "Crear Labores Realizadas",
      urls: [{ title: "Labores Agricolas" }, { title: "Labores Realizadas" }],
    },
  },
  {
    path: "modificar-labores-realizadas/:id",
    component: FormularioLaboresRealizadasComponent,
    data: {
      title: "Modificar Labores Realizadas",
      urls: [{ title: "Labores Agricolas" }, { title: "Labores Realizadas" }],
    },
  },
];

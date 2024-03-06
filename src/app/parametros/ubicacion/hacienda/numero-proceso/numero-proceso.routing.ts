import { Routes } from "@angular/router";
import { NumeroProcesoComponent } from "./numero-proceso/numero-proceso.component";
import { FormularioprocesosRealizadasComponent } from "./numero-proceso/formulario-numero_procesos/formulario-numero_procesos.component";

export const procesosAgricolasRoutes: Routes = [
  {
    path: "numero_procesos",
    component: NumeroProcesoComponent,
    data: {
      title: "Numero de Procesos",
      urls: [{ title: "Hacienda" }, { title: "Numero de Procesos" }],
    },
  },
  {
    path: "crear-numero_procesos",
    component: FormularioprocesosRealizadasComponent,
    data: {
      title: "Crear Numero de Procesos",
      urls: [{ title: "Hacienda" }, { title: "Numero de Procesos" }],
    },
  },
  {
    path: "modificar-numero_procesos/:id",
    component: FormularioprocesosRealizadasComponent,
    data: {
      title: "Modificar Numero de Procesos",
      urls: [{ title: "Hacienda" }, { title: "Numero de Procesos" }],
    },
  },
];

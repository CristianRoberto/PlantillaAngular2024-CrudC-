import { Routes } from "@angular/router";

export const ParametrosRoutes: Routes = [
  {
    path: "ubicacion",
    loadChildren: () =>
      import("./ubicacion/ubicacion.module").then((m) => m.UbicacionModule),
  },
  {
    path: "embarque",
    loadChildren: () =>
      import("./embarque/embarque.module").then((m) => m.EmbarqueModule),
  },
  {
    path: "labores",
    loadChildren: () =>
      import("./labores/labores.module").then((m) => m.LaboresModule),
  },
  {
    path: "produccion",
    loadChildren: () =>
      import("./produccion/produccion.module").then((m) => m.ProduccionModule),
  },
  {
    path: "materiales",
    loadChildren: () =>
      import("./materiales/materiales.module").then((m) => m.MaterialesModule),
  },
  {
    path: "calidad",
    loadChildren: () =>
      import("./calidad/calidad.module").then((m) => m.CalidadModule),
  },
  {
    path: "materiales",
    loadChildren: () =>
      import("./materiales/materiales.module").then((m) => m.MaterialesModule),
  },
  {
    path: "riego-drenaje",
    loadChildren: () =>
      import("./riego-drenaje/riego-drenaje.module").then(
        (m) => m.RiegoDrenajeModule
      ),
  },
  {
    path: "labores",
    loadChildren: () =>
      import("./labores/labores.module").then((m) => m.LaboresModule),
  },
  {
    path: "camiones",
    loadChildren: () => import("./camiones/camiones.module").then((m) => m.CamionesModule),
  },
  {
    path: "parametros",
    loadChildren: () => import("./parametros/parametros.module").then((m) => m.ParametrosModule),
  },

];

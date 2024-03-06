import { Routes } from "@angular/router";
import { BuquesComponent } from "./buques/buques.component";
import { EmbalajesComponent } from "./embalajes/embalajes.component";
import { TipoCajaComponent } from "./tipo-caja/tipo-caja.component";
import { PuertosComponent } from "./puertos/puertos.component";
import { MarcasComponent } from "./marcas/marcas.component";
import { PlasticosComponent } from "./plasticos/plasticos.component";
import { ProductoFrutaComponent } from "./producto-fruta/producto-fruta.component";

export const EmbarqueRoutes: Routes = [
  {
    path: "buques",
    component: BuquesComponent,
    data: {
      title: "Buques",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Buques" },
      ],
    },
  },
  {
    path: "embalajes",
    component: EmbalajesComponent,
    data: {
      title: "Embalajes",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Embalajes" },
      ],
    },
  },
  {
    path: "tipo-caja",
    component: TipoCajaComponent,
    data: {
      title: "Tipo de Caja",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Tipo de Caja" },
      ],
    },
  },
  {
    path: "puertos",
    component: PuertosComponent,
    data: {
      title: "Puertos",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Puertos" },
      ],
    },
  },
  {
    path: "marcas",
    component: MarcasComponent,
    data: {
      title: "Marcas",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Marcas" },
      ],
    },
  },
  {
    path: "plastico",
    component: PlasticosComponent,
    data: {
      title: "Plasticos",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Plasticos" },
      ],
    },
  },
  {
    path: "producto-fruta",
    component: ProductoFrutaComponent,
    data: {
      title: "Producto fruta",
      urls: [
        { title: "Parámetros" },
        { title: "Embarque" },
        { title: "Producto fruta" },
      ],
    },
  },

];

import { Routes } from "@angular/router";
import { CausalesComponent } from "./causales/causales.component";
import { CintasColoresComponent } from "./cintas-colores/cintas-colores.component";
import { TaraComponent } from "./tara/tara.component";
import { DefectoCalidadComponent } from "./defecto-calidad/defecto-calidad.component";
import { UnidadEmpaqueComponent } from "./unidad-empaque/unidad-empaque.component";
import { EstacionalidadComponent } from "./estacionalidad/estacionalidad.component";
import { CalendarioBananeroComponent } from "./calendario-bananero/calendario-bananero.component";
import { SemanaPeriodoComponent } from "./semana-periodo/semana-periodo.component";
import { NumeroProcesosComponent } from "./numero-procesos/numero-procesos.component";

export const ProduccionRoutes: Routes = [
  {
    path: "cinta-colores",
    component: CintasColoresComponent,
    data: {
      title: "Cinta Colores",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Cinta colores" },
      ],
    },
  },
  {
    path: "defecto-calidad",
    component: DefectoCalidadComponent,
    data: {
      title: "Defecto de Calidad",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Defecto de Calidad" },
      ],
    },
  },
  {
    path: "causales",
    component: CausalesComponent,
    data: {
      title: "Mantenimiento Causales",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Mantenimiento Causales" },
      ],
    },
  },
  {
    path: "estacionalidad",
    component: EstacionalidadComponent,
    data: {
      title: "Mantenimiento Estacionalidad",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Mantenimiento Estacionalidad" },
      ],
    },
  },
  {
    path: "tara",
    component: TaraComponent,
    data: {
      title: "Mantenimiento Tara",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Mantenimiento Tara" },
      ],
    },
  },
  {
    path: "unidad-empaque",
    component: UnidadEmpaqueComponent,
    data: {
      title: "Unidad de Empaque",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Unidad de Empaque" },
      ],
    },
  },
  {
    path: "defecto-calidad",
    component: DefectoCalidadComponent,
    data: {
      title: "Defecto Calidad",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Defecto calidad" },
      ],
    },
  },{
    path: "calendario-bananero",
    component: CalendarioBananeroComponent,
    data: {
      title: "Calendario Bananero",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Calendario Bananero" },
      ],
    },
  },
  
  {
    path: "semana-periodo",
    component: SemanaPeriodoComponent,
    data: {
      title: "Semana Periodo",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Semana Periodo" },
      ],
    },
  },
  {
    path: "numero-procesos",
    component: NumeroProcesosComponent,
    data: {
      title: "Número de Procesos",
      urls: [
        { title: "Parámetros" },
        { title: "Produccion" },
        { title: "Número de Procesos" },
      ],
    },
  }
];

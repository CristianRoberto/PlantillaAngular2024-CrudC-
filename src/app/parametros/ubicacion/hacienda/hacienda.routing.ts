import { Routes } from "@angular/router";
import { EmpacadorasComponent } from "./empacadoras/empacadoras.component";
import { EquiposMaquinaComponent } from "./equipos-maquina/equipos-maquina.component";
import { HitoMuestreoComponent } from "./hito-muestreo/hito-muestreo.component";
import { SubzonasComponent } from "./subzonas/subzonas.component";
import { TipoDefectoComponent } from "../../calidad/tipo-defecto/tipo-defecto.component";
import { TipoViviendaComponent } from "./tipo-vivienda/tipo-vivienda.component";
import { VehiculoComponent } from "./vehiculo/vehiculo.component";
import { ZonasComponent } from "./zonas/zonas.component";
import { HaciendasComponent } from "./haciendas/haciendas.component";
import { JefeSectorLoteComponent } from "./jefe-sector-lote/jefe-sector-lote.component";
import { LocalizacionComponent } from "./localizacion/localizacion.component";
import { HaciendasFormComponent } from "./haciendas/hacienda-form/hacienda-form.component";
import { SectoresComponent } from "./sector/sectores.component";
import { SectorFormComponent } from "./sector/sector-form/sector-form.component";
import { LoteFormComponent } from "./lote/lote-form/lote-form.component";
import { LoteComponent } from "./lote/lote.component";
import { TipoContabilizacionComponent } from "./tipo-de-contabilizacion/tipo-contabilizacion.component";
import { ViviendaComponent } from "./vivienda/vivienda.component";
import { ViviendaFormComponent } from "./vivienda/vivienda-form/vivienda-form.component";
import { HomologacionHaciendaComponent } from "./homologacion-hacienda/homologacion-hacienda.component";
import { HomologacionHaciendaFormComponent } from "./homologacion-hacienda/homologacion-hacienda-form/homologacion-hacienda-form.component";

export const HaciendaRoutes: Routes = [
  {
    path: "sectores",
    loadChildren: () =>
      import("./sectores/sectores.module").then((m) => m.SectoresModule),
  },

  {
    path: "numero_procesos",
    loadChildren: () =>
      import("./numero-proceso/numero-proceso.module").then((m) => m.procesosAgricolasModule),
  },


  {
    path: "zonas",
    component: ZonasComponent,
    data: {
      title: "Zonas",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Zonas" },
      ],
    },
  },
  {
    path: "subzonas/:idZona",
    component: SubzonasComponent,
    data: {
      title: "Subzonas",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Subzonas" },
      ],
    },
  },

  {
    path: "haciendas/:idZona",
    component: HaciendasComponent,
    data: {
      title: "Haciendas",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Haciendas" },
      ],
    },
  },

  {
    path: "haciendaForm/:idZona/:pageFormType/:idHacienda",
    component: HaciendasFormComponent,
    data: {
      title: "Haciendas",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Haciendas" },
      ],
    },
  },
  {
    path: 'haciendas/:idZona/:idHacienda/empacadoras',
    component: EmpacadorasComponent,
    data: {
      title: 'Empacadoras',
      urls: [
        { title: 'Parámetros' },
        { title: 'Ubicación' },
        { title: 'Hacienda' },
        { title: 'Haciendas' },
        { title: 'Empacadoras' },
      ],
    },
  },
  {
    path: 'haciendas/:idZona/:idHacienda/sectores',
    component: SectoresComponent,
    data: {
      title: 'Sectores',
      urls: [
        { title: 'Parámetros' },
        { title: 'Ubicación' },
        { title: 'Hacienda' },
        { title: 'Haciendas' },
        { title: 'Sectores' },
      ],
    },
  },
  {
    path: "sectorForm/:idZona/:idHacienda/:pageFormType/:idSector",
    component: SectorFormComponent,
    data: {
      title: "Sectores",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Haciendas" },
        { title: 'Sectores' },
      ],
    },
  },
  {
    path: 'haciendas/:idZona/:idHacienda/lotes',
    component: LoteComponent,
    data: {
      title: 'Lotes',
      urls: [
        { title: 'Parámetros' },
        { title: 'Ubicación' },
        { title: 'Hacienda' },
        { title: 'Haciendas' },
        { title: 'Lotes' },
      ],
    },
  },
  {
    path: "loteForm/:idZona/:idHacienda/:pageFormType/:idLote",
    component: LoteFormComponent,
    data: {
      title: "Lotes",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Haciendas" },
        { title: 'Lotes' },
      ],
    },
  },
  {
    path: "equipos-maquina",
    component: EquiposMaquinaComponent,
    data: {
      title: "Equipos y Máquina",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Equipos y Máquina" },
      ],
    },
  },
  {
    path: "tipo-defecto",
    component: TipoDefectoComponent,
    data: {
      title: "Tipo de Defecto",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Tipo de Defecto" },
      ],
    },
  },
  {
    path: "tipo-vivienda",
    component: TipoViviendaComponent,
    data: {
      title: "Tipo de Vivienda",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Tipo de Vivienda" },
      ],
    },
  },
  {
    path: "vivienda",
    component: ViviendaComponent,
    data: {
      title: "Vivienda",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Vivienda" },
      ],
    },
  },
  {
    path: "viviendaForm/:pageFormType/:idVivienda",
    component: ViviendaFormComponent,
    data: {
      title: "Vivienda",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Vivienda" },
      ],
    },
  },
  {
    path: "homologacion-hacienda",
    component: HomologacionHaciendaComponent,
    data: {
      title: "Homologación de hacienda",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Homologación de hacienda" },
      ],
    },
  },
  {
    path: "homologacionHaciendaForm/:pageFormType/:idHacienda",
    component: HomologacionHaciendaFormComponent,
    data: {
      title: "Homologación de hacienda",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Homologación de hacienda" },
      ],
    },
  },
  {
    path: "vehiculo",
    component: VehiculoComponent,
    data: {
      title: "Vehículo",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Vehículo" },
      ],
    },
  },
  {
    path: "hito_de_muestreo",
    component: HitoMuestreoComponent,
    data: {
      title: "Hito de Muestreo",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Hito de Muestreo" },
      ],
    },
  },
  {
    path: "jefe-sector-lote",
    component: JefeSectorLoteComponent,
    data: {
      title: "Jefe de sector de Lote",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Jefe de sector" },
      ],
    },
  },
  {
    path: "localizacion",
    component: LocalizacionComponent,
    data: {
      title: "Localización",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Localización" },
      ],
    },
  },
  {
    path: "haciendas/:idZona/:idHacienda/tipo-contabilizacion",
    component: TipoContabilizacionComponent,
    data: {
      title: "Tipo de Contabilización",
      urls: [
        { title: "Parámetros" },
        { title: "Ubicación" },
        { title: "Hacienda" },
        { title: "Haciendas" },
        { title: "Tipo de contabilización" },
      ],
    },
  },
];

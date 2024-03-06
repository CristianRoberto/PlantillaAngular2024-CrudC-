import { RouteInfo } from "./vertical-sidebar.metadata";

const routeActive = {
  class: "",
  extralink: false,
  label: "",
  labelClass: "",
  submenu: [],
  path: "",
  icon: "",
};
const routeMenu = {
  path: "",
  class: "has-arrow",
  extralink: false,
  label: "",
  labelClass: "",
  icon: "",
  submenu: [],
};

export const ROUTES: RouteInfo[] = [
  {
    ...routeMenu,
    title: "Parámetros",
    materialIcon: "fact_check",
    submenu: [
      {
        ...routeMenu,
        title: "Division Ubicacion",
        submenu: [
          {
            ...routeMenu,
            title: "Haciendas",
            submenu: [
              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/zonas",
                title: "Zonas",
              },
              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/tipo-contabilizacion",
                title: "tipo contabilizacion",
              },

              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/numero_procesos",
                title: "Numero de Procesos",
              },

              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/empacadoras",
                title: "Empacadoras",
              },
              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/tipo-vivienda",
                title: "Tipo de Vivienda",
              },
              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/vivienda",
                title: "Vivienda",
              },
              {
                ...routeActive,
                path: "/parametros/ubicacion/hacienda/homologacion-hacienda",
                title: "Homologación de Hacienda",
              },
            ],
          },
          {
            ...routeActive,
            path: "/parametros/ubicacion/hacienda/localizacion",
            title: "Localización",
          },
          {
            ...routeActive,
            path: "/parametros/ubicacion/hacienda/equipos-maquina",
            title: "Equipo de Maquinaria",
          },
          {
            ...routeActive,
            title: "Mantenimiento  de Vivienda",
          },
          {
            ...routeActive,
            path: "/parametros/ubicacion/hacienda/vehiculo",
            title: "Vehiculo",
          },
          {
            ...routeActive,
            title: "Comedor",
          },
          {
            ...routeActive,
            path: "/parametros/ubicacion/hacienda/hito_de_muestreo",
            title: "Hitos de Muestreo",
          },
          {
            ...routeActive,
            path: "/parametros/ubicacion/fumigacion",
            title: "Sistema de Fumigación",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Labores",
        submenu: [
          {
            ...routeActive,
            title: "Tipo de Labores",
          },
          {
            ...routeActive,
            title: "Mantenimiento de Labores",
          },
          {
            ...routeActive,
            title: "Grupo de Labores",
          },
          {
            ...routeActive,
            title: "Labores Incompatibles",
          },
          {
            ...routeActive,
            title: "Labores Genericas",
          },
          {
            ...routeActive,
            title: "Defectos por Labor",
          },
          {
            ...routeActive,
            title: "Labores por productos",
          },
          {
            ...routeActive,
            title: "Costos por Tipo  de Muestreo",
          },
          {
            ...routeActive,
            path: "/parametros/labores/codigo-plaga",
            title: "Código de plaga",
          },
          {
            ...routeActive,
            title: "Tipo de Cajas para Pago",
          },
          {
            ...routeActive,
            path: "/parametros/labores/costo-muestreo",
            title: "Costo Por Tipo De Muestreo",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Materiales",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/materiales/unidad-comparacion",
            title: "Unidad de Comparación",
          },
          {
            ...routeActive,
            title: "Optimo de materiales",
          },
          {
            ...routeActive,
            title: "Material de Enfunde",
          },
          {
            ...routeActive,
            path: "/parametros/materiales/tipo-componente",
            title: "Tipo de Componentes",
          },
          {
            ...routeActive,
            title: "Componentes de Productos",
          },
          {
            ...routeActive,
            title: "Item EO vs SAFF",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Producción",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/produccion/cinta-colores",
            title: "Cinta Colores",
          },
          {
            ...routeActive,
            title: "Parametros de Producción",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/semana-periodo",
            title: "Semana por periodo",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/calendario-bananero",
            title: "Calendario Bananero",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/estacionalidad",
            title: "Mantenimiento de estacionalidad",
          },
          {
            ...routeActive,
            title: "Mantenimiento de Estacionalidad por Lote",
          },
          {
            ...routeActive,
            title: "Tipo de Plantación",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/tara",
            title: "Mantenimiento Tara",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/causales",
            title: "Mantenimiento de Causales",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/defecto-calidad",
            title: "Defecto de calidad",
          },
          {
            ...routeActive,
            path: "/parametros/produccion/unidad-empaque",
            title: "Unidad de Empaque",
          },
          {
            ...routeActive,
            title: "Numero de Procesos",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Riego y Drenaje",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/riego-drenaje/tensiometro",
            title: "Tensiometro",
          },
          {
            ...routeActive,
            title: "Quimicos de Muestreo",
          },
          {
            ...routeActive,
            title: "Drenaje por lote",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Embarque",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/embarque/buques",
            title: "Buques",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/puertos",
            title: "Puertos",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/tipo-caja",
            title: "Tipos de Caja",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/tipo-caja",
            title: "Tipos de Caja",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/embalajes",
            title: "Embalajes",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/marcas",
            title: "Marcas",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/plastico",
            title: "Plasticos",
          },
          {
            ...routeActive,
            path: "/parametros/embarque/producto-fruta",
            title: "Productos Fruta",
          },
          {
            ...routeActive,
            title: "Productos Embarque",
          },
          {
            ...routeActive,
            title: "Control de camiones",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Calidad",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/calidad/tipo-defectos",
            title: "Tipos de Defectos",
          },
          {
            ...routeActive,
            path: "/parametros/calidad/defectos",
            title: "Defectos",
          },
          {
            ...routeActive,
            title: "Mantenimiento de Defectos",
          },
        ],
      },
      {
        ...routeMenu,
        title: "Camiones",
        submenu: [
          {
            ...routeActive,
            path: "/parametros/camiones/transportistas",
            title: "Transportistas",
          },
        ],
      },
      {
        ...routeActive,
        path: "/parametros/parametros/generales",
        title: "Parametros Generales",
      },
      {
        ...routeMenu,
        title: "Parametros de Pesajes",
      },
      {
        ...routeMenu,
        title: "Biometricos por Hacienda",
      },
      {
        ...routeMenu,
        title: "Homologación de Haciendas",
      },
      {
        ...routeMenu,
        path: "/parametros/camiones/transportistas/transportistacamiones",
        title: "Tranportista por camiones ",
      },
    ],
  },
  {
    ...routeMenu,
    title: "Labores Agricolas",
    materialIcon: "group",
    submenu: [
      {
        ...routeActive,
        path: "/labores-agricolas/labores-realizadas",
        title: "Labores Realizadas",
      },
    ],
  },
];
export const routesDev: RouteInfo[] = [
  {
    ...routeMenu,
    title: "Component",
    icon: "fas fa-wrench",
    submenu: [
      {
        ...routeActive,
        path: "/component/accordion",
        title: "Accordion",
      },
      {
        ...routeActive,
        path: "/component/alert",
        title: "Alert",
      },
      {
        ...routeActive,
        path: "/component/badges",
        title: "Badges",
      },
      {
        ...routeActive,
        path: "/component/buttons",
        title: "Button",
      },
      {
        ...routeActive,
        path: "/component/carousel",
        title: "Carousel",
      },
      {
        ...routeActive,
        path: "/component/card",
        title: "Card",
      },
      {
        ...routeActive,
        path: "/component/dropdown",
        title: "Dropdown",
      },
      {
        ...routeActive,
        path: "/component/datepicker",
        title: "Datepicker",
      },
      {
        ...routeActive,
        path: "/component/modal",
        title: "Modal documentación",
      },
      {
        ...routeActive,
        path: "/component/pagination",
        title: "Pagination",
      },
      {
        ...routeActive,
        path: "/component/poptool",
        title: "Popover & Tooltip",
      },
      {
        ...routeActive,
        path: "/component/progressbar",
        title: "Progressbar",
      },
      {
        ...routeActive,
        path: "/component/rating",
        title: "Ratings",
      },
      {
        ...routeActive,
        path: "/component/nav",
        title: "Nav",
      },
      {
        ...routeActive,
        path: "/component/timepicker",
        title: "Timepicker",
      },
      {
        ...routeActive,
        path: "/component/toast",
        title: "Toast",
      },
      {
        ...routeActive,
        path: "/component/notifier",
        title: "Notifier",
      },
    ],
  },
];

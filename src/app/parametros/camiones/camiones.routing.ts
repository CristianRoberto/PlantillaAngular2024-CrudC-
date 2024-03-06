import { Routes } from "@angular/router";
import { TransportistaComponent } from "./transportistas/transportista.component";

export const CamionesRoutes: Routes = [
  {
    path: "transportistas",
    component: TransportistaComponent,
    data: {
      title: "Transportistas",
      urls: [
        { title: "Camiones" },
        { title: "Transportistas" }, 

      ]
    }
  },
  

]
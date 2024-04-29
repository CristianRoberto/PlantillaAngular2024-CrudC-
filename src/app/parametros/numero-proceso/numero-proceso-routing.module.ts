import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumeroProcesoComponent } from './numero-proceso/numero-proceso.component';

const routes: Routes = [
  {
    path: "",
    component: NumeroProcesoComponent,
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NumeroProcesoRoutingModule { }

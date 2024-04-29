import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumeroProcesoRoutingModule } from './numero-proceso-routing.module';
import { NumeroProcesoComponent } from './numero-proceso/numero-proceso.component';
import { PlantillaModule } from 'src/app/plantilla/plantilla.module';



@NgModule({
  declarations: [
    NumeroProcesoComponent
  ],
  imports: [
    CommonModule,
    NumeroProcesoRoutingModule,
    PlantillaModule
  ]
})
export class NumeroProcesoModule { }

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SectoresRoutes } from "./sectores.routing";

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SectoresRoutes)],
})
export class SectoresModule {}

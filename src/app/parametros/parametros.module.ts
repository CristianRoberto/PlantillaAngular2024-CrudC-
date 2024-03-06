import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ParametrosRoutes } from "./parametros.routing";

@NgModule({
  imports: [RouterModule.forChild(ParametrosRoutes)]
})
export class ParametrosModule { }

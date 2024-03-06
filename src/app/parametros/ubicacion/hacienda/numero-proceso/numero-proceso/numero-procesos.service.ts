import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IprocesosRealizadas, IProcesoResponse, ILaborRealizada, IProcesoGetResponse } from "./numero_procesos.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProcesoService {
  private apiUrl = environment.procesoES;
  private apiUrlEditar = 'http://localhost:5009/api/Tablanumeroproceso/Editar';
  private apiUrlGuardar = 'http://localhost:5009/api/Tablanumeroproceso/Guardar';



  constructor(private http: HttpClient) {}

  public indexPaginated(
    // numberPage: number,
    // pageSize: number
  ): Observable<IProcesoResponse> {
    return this.http.get<IProcesoResponse>(
      `${this.apiUrl}`
    );
  }

  public index(): Observable<IProcesoGetResponse> {
    return this.http.get<IProcesoGetResponse>(`${this.apiUrl}/Tablanumeroproceso/Lista`);
  }

  public searchByCodigoHaciendaAndFecha(codigoHacienda: any, fecha: any): Observable<IProcesoGetResponse> {
    return this.http.get<IProcesoGetResponse>(
      `${this.apiUrl}/Tablanumeroproceso/BuscarPorCodigoYFecha?codigoHacienda=${codigoHacienda}&fecha=${fecha}`
    );
  }

  // public delete(hacienda: string, empacador: string, fecha: string, cuadrilla: string): Observable<string> {
  //   return this.http.delete<string>(`${this.apiUrl}/Tablanumeroproceso/EliminarPorParametros?hacienda=${hacienda}&empacador=${empacador}&fecha=${fecha}&cuadrilla=${cuadrilla}`);
  // }

  public delete(id: any): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Tablanumeroproceso/EliminarPorHacienda?id=${id}`);
  }


  public store(request: ILaborRealizada): Observable<IProcesoResponse> {
    return this.http.post<IProcesoResponse>(this.apiUrlGuardar, request);
  }

  public update(request: ILaborRealizada): Observable<IProcesoResponse> {
    return this.http.put<IProcesoResponse>(this.apiUrlEditar, request);
  }

}

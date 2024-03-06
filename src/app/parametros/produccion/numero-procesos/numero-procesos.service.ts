import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IProceso, IProcesoResponse } from "./numero-procesos.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProcesoService {
  private apiUrl = environment.procesoES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IProcesoResponse> {
    return this.http.get<IProcesoResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(hacienda: string, empacador: string, fecha: string, cuadrilla: string,): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${hacienda}/${empacador}/${fecha}/${cuadrilla}`);
  }
  public store(request: IProceso): Observable<IProceso> {
    return this.http.post<IProceso>(this.apiUrl, request);
  }
  public update(request: IProceso): Observable<IProceso> {
    return this.http.put<IProceso>(this.apiUrl, request);
  }
}
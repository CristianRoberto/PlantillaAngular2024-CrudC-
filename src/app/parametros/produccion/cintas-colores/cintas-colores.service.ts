import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  ICintaColoresResponse,
  ICintasColores,
} from "./cintas-colores.interface";

@Injectable({
  providedIn: "root",
})
export class CintasColoresService {
  private apiUrl = environment.cintaColorES;
  constructor(private http: HttpClient) {}

  public index(): Observable<ICintaColoresResponse> {
    return this.http.get<ICintaColoresResponse>(`${this.apiUrl}`);
  }
  public delete(codigo: string): Observable<string> {
    const codigoCodificado = encodeURIComponent(codigo);
    return this.http.delete<string>(`${this.apiUrl}/${codigoCodificado}`);
  }
  public update(request: ICintasColores): Observable<ICintasColores> {
    const fechaActual = new Date();
    request.fechaIngreso = fechaActual.toISOString();
    return this.http.put<ICintasColores>(this.apiUrl, request);
  }
  public store(request: ICintasColores): Observable<ICintasColores> {
    const fechaActual = new Date();
    request.fechaIngreso = fechaActual.toISOString();
    return this.http.post<ICintasColores>(this.apiUrl, request);
  }
}

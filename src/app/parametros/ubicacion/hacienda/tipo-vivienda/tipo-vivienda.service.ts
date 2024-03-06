import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  ITipovivienda,
  ITipoviviendaResponse,
} from "./tipo-vivienda.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoviviendaService {
  private apiUrl = environment.tipoViviendaServiceES;
  constructor(private http: HttpClient) {}

  public index(): Observable<ITipoviviendaResponse> {
    return this.http.get<ITipoviviendaResponse>(`${this.apiUrl}`);
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: ITipovivienda): Observable<ITipovivienda> {
    return this.http.post<ITipovivienda>(this.apiUrl, request);
  }
  public update(request: ITipovivienda): Observable<ITipovivienda> {
    return this.http.put<ITipovivienda>(this.apiUrl, request);
  }
}

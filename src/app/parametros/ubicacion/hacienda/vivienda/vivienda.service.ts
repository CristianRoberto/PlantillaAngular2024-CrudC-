import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IVivienda, IViviendaResponse } from "./vivienda.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ViviendaService {
  private apiUrl: string = environment.viviendaES;

  constructor(private http: HttpClient) {}

  public index(): Observable<IViviendaResponse> {
    return this.http.get<IViviendaResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IViviendaResponse> {
    return this.http.get<IViviendaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexByZona(idZona: string): Observable<IViviendaResponse> {
    return this.http.get<IViviendaResponse>(`${this.apiUrl}/zona/${idZona}`);
  }
  public getById(id: string): Observable<IVivienda> {
    return this.http.get<IVivienda>(`${this.apiUrl}/${id}`);
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  public store(request: IVivienda): Observable<IVivienda> {
    return this.http.post<IVivienda>(this.apiUrl, request);
  }
  public update(request: IVivienda): Observable<IVivienda> {
    return this.http.put<IVivienda>(this.apiUrl, request);
  }
}

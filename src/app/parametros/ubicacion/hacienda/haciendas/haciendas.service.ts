import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IHacienda, IHaciendaResponse } from "./haciendas.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HaciendasService {
  private apiUrl: string = environment.haciendaES;

  constructor(private http: HttpClient) {}

  public index(): Observable<IHaciendaResponse> {
    return this.http.get<IHaciendaResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IHaciendaResponse> {
    return this.http.get<IHaciendaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexByZona(idZona: string): Observable<IHaciendaResponse> {
    return this.http.get<IHaciendaResponse>(`${this.apiUrl}/zona/${idZona}`);
  }
  public getById(id: string): Observable<IHacienda> {
    return this.http.get<IHacienda>(`${this.apiUrl}/${id}`);
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  public store(request: IHacienda): Observable<IHacienda> {
    return this.http.post<IHacienda>(this.apiUrl, request);
  }
  public update(request: IHacienda): Observable<IHacienda> {
    return this.http.put<IHacienda>(this.apiUrl, request);
  }
}

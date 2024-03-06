import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ISubzona, ISubzonaResponse } from "./subzonas.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubzonaService {
  private apiUrl = environment.subZonaES;

  constructor(private http: HttpClient) {}

  public index(): Observable<ISubzonaResponse> {
    return this.http.get<ISubzonaResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ISubzonaResponse> {
    return this.http.get<ISubzonaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexPaginatedByZona(
    numberPage: number,
    pageSize: number,
    idZona: string
  ): Observable<ISubzonaResponse> {
    return this.http.get<ISubzonaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}/${idZona}`
    );
  }
  public indexByZona(idZona: string): Observable<ISubzonaResponse> {
    return this.http.get<ISubzonaResponse>(`${this.apiUrl}/zona/${idZona}`);
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: ISubzona): Observable<ISubzona> {
    return this.http.post<ISubzona>(this.apiUrl, request);
  }
  public update(request: ISubzona): Observable<ISubzona> {
    return this.http.put<ISubzona>(this.apiUrl, request);
  }
}

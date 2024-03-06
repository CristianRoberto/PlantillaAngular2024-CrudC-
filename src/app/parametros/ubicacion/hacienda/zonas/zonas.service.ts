import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IZona, IZonaResponse } from "./zona.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ZonasService {
  private apiUrl: string = environment.zonaES;

  constructor(private http: HttpClient) {}

  public index(): Observable<IZonaResponse> {
    return this.http.get<IZonaResponse>(this.apiUrl);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IZonaResponse> {
    return this.http.get<IZonaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public getById(codigo: string): Observable<IZona> {
    return this.http.get<IZona>(`${this.apiUrl}/${codigo}`);
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IZona): Observable<IZona> {
    return this.http.post<IZona>(this.apiUrl, request);
  }
  public update(request: IZona): Observable<IZona> {
    return this.http.put<IZona>(this.apiUrl, request);
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEstacionalidad, IEstacionalidadResponse } from "./estacionalidad.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EstacionalidadService {
  private apiUrl: string = environment.estacionalidadServiceES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IEstacionalidadResponse> {
    return this.http.get<IEstacionalidadResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IEstacionalidad): Observable<IEstacionalidad> {
    return this.http.post<IEstacionalidad>(this.apiUrl, request);
  }
  public update(request: IEstacionalidad): Observable<IEstacionalidad> {
    return this.http.put<IEstacionalidad>(this.apiUrl, request);
  }
}

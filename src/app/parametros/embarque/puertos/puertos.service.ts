import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPuerto, IPuertoResponse } from "./puertos.interface";

@Injectable({
  providedIn: "root",
})
export class PuertosService {
  private apiUrl: string = environment.puertosServiceES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IPuertoResponse> {
    return this.http.get<IPuertoResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IPuerto): Observable<IPuerto> {
    return this.http.post<IPuerto>(this.apiUrl, request);
  }
  public update(request: IPuerto): Observable<IPuerto> {
    return this.http.put<IPuerto>(this.apiUrl, request);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  IHitoMuestreo,
  IHitoMuestreoResponse,
} from "./hito-muestreo.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HitoMuestreoService {
  private apiUrl: string = environment.hitoMuestreoServiceES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IHitoMuestreoResponse> {
    return this.http.get<IHitoMuestreoResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IHitoMuestreo): Observable<IHitoMuestreo> {
    return this.http.post<IHitoMuestreo>(this.apiUrl, request);
  }
  public update(request: IHitoMuestreo): Observable<IHitoMuestreo> {
    return this.http.put<IHitoMuestreo>(this.apiUrl, request);
  }
  public haciendaLote(
    hacienda: number,
    lote: number
  ): Observable<IHitoMuestreoResponse> {
    return this.http.get<IHitoMuestreoResponse>(
      `${this.apiUrl}/HaciendaLote/${hacienda}/${lote}`
    );
  }
}

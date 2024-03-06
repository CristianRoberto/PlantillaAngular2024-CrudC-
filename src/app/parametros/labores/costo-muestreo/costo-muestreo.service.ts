import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ICostoMuestreo,
  ICostoMuestreoResponse,
} from "./costo-muestreo.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CostoMuestreoService {
  private apiUrl: string = environment.muestreoServiceES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ICostoMuestreoResponse> {
    return this.http.get<ICostoMuestreoResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(costo: ICostoMuestreo): Observable<string> {
    return this.http.delete<string>(
      `${this.apiUrl}/${costo.codigoHacienda}/${costo.tipoMuestreo}`
    );
  }
  public store(request: ICostoMuestreo): Observable<ICostoMuestreo> {
    return this.http.post<ICostoMuestreo>(this.apiUrl, request);
  }
  public update(request: ICostoMuestreo): Observable<ICostoMuestreo> {
    return this.http.put<ICostoMuestreo>(this.apiUrl, request);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITipoCaja, ITiposCajas } from "./tipo-caja.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoCajaService {
  private apiUrl: string = environment.tipoCajaES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ITiposCajas> {
    return this.http.get<ITiposCajas>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: ITipoCaja): Observable<ITipoCaja> {
    return this.http.post<ITipoCaja>(this.apiUrl, request);
  }
  public update(request: ITipoCaja): Observable<ITipoCaja> {
    return this.http.put<ITipoCaja>(this.apiUrl, request);
  }
}

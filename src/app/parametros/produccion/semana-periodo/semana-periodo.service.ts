import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import {
  ISemanaPeriodo,
  ISemanaResponse,
  ITipoCalendarioResponse,
} from "./semana-periodo.interface";

@Injectable({
  providedIn: "root",
})
export class SemanaPeriodoService {
  private apiUrl = environment.semanaPeriodoES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ISemanaResponse> {
    return this.http.get<ISemanaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public index(): Observable<ISemanaResponse> {
    return this.http.get<ISemanaResponse>(`${this.apiUrl}`);
  }
  public delete(id: string, semana: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}/${semana}`);
  }
  public store(request: ISemanaPeriodo): Observable<ISemanaPeriodo> {
    return this.http.post<ISemanaPeriodo>(this.apiUrl, request);
  }
  public update(request: ISemanaPeriodo): Observable<ISemanaPeriodo> {
    return this.http.put<ISemanaPeriodo>(this.apiUrl, request);
  }
  public getTipoCalendario(): Observable<ITipoCalendarioResponse> {
    return this.http.get<ITipoCalendarioResponse>(
      `${this.apiUrl}/tipo-calendario/`
    );
  }
}

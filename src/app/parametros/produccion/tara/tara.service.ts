import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ITara, ITaraResponse } from "./tara.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaraService {
  private apiUrl = environment.taraServiceES;

  constructor(private http: HttpClient) {}

  public index(): Observable<ITaraResponse> {
    return this.http.get<ITaraResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ITaraResponse> {
    return this.http.get<ITaraResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(hacienda: string, empacadora: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${hacienda}/${empacadora}`);
  }
  public store(request: ITara): Observable<ITara> {
    return this.http.post<ITara>(this.apiUrl, request);
  }
  public update(request: ITara): Observable<ITara> {
    return this.http.put<ITara>(this.apiUrl, request);
  }
  public haciendaEmpacadora(
    hacienda: number,
    empacadora: number
  ): Observable<ITara> {
    return this.http.get<ITara>(
      `${this.apiUrl}/HaciendaEmpacadora/${hacienda}/${empacadora}`
    );
  }
}

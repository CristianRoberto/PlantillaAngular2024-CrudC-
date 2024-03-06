import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ITensiometro, ITensiometroResponse } from "./tensiometro.interface";

@Injectable({
  providedIn: "any",
})
export class TensiometroService {
  private apiUrl: string = environment.tensiometroServiceES;

  constructor(private http: HttpClient) {}

  public index(): Observable<ITensiometroResponse> {
    return this.http.get<ITensiometroResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ITensiometroResponse> {
    return this.http.get<ITensiometroResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(request: ITensiometro): Observable<string> {
    return this.http.delete<string>(
      `${this.apiUrl}/${request.codigoHacienda}/${request.codigoSector}
      /${request.codigoLote}/${request.numeroEstacion}/${request.profundidad}`
    );
  }
  public store(request: ITensiometro): Observable<ITensiometro> {
    return this.http.post<ITensiometro>(this.apiUrl, request);
  }
  public update(request: ITensiometro): Observable<ITensiometro> {
    return this.http.put<ITensiometro>(this.apiUrl, request);
  }
}

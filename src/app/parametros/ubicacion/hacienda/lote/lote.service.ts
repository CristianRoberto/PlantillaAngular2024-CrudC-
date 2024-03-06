import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILote, ILoteResponse } from "./lote.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoteService {
  private apiUrl: string = environment.loteServicesES;

  constructor(private http: HttpClient) { }

  public index(): Observable<ILoteResponse> {
    return this.http.get<ILoteResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ILoteResponse> {
    return this.http.get<ILoteResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexPaginatedByHacienda(
    numberPage: number,
    pageSize: number,
    idHacienda: string
  ): Observable<ILoteResponse> {
    return this.http.get<ILoteResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}/${idHacienda}`
    );
  }
  public indexByHacienda(
    idHacienda: string
  ): Observable<ILoteResponse> {
    return this.http.get<ILoteResponse>(  
      `${this.apiUrl}/hacienda/${idHacienda}`
    );
  }
  public getById(id: string): Observable<ILote> {
    return this.http.get<ILote>(`${this.apiUrl}/id/${id}`);
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  public store(request: ILote): Observable<ILote> {
    return this.http.post<ILote>(this.apiUrl, request);
  }
  public update(request: ILote): Observable<ILote> {
    return this.http.put<ILote>(this.apiUrl, request);
  }
}

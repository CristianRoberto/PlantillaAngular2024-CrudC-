import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISector, ISectorResponse } from "./sectores.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SectoresService {
  private apiUrl: string = environment.sectorES;

  constructor(private http: HttpClient) { }

  public index(): Observable<ISectorResponse> {
    return this.http.get<ISectorResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ISectorResponse> {
    return this.http.get<ISectorResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexPaginatedByHacienda(
    numberPage: number,
    pageSize: number,
    idHacienda: string
  ): Observable<ISectorResponse> {
    return this.http.get<ISectorResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}/${idHacienda}`
    );
  }
  public indexByHacienda(
    idHacienda: string
  ): Observable<ISectorResponse> {
    return this.http.get<ISectorResponse>(  
      `${this.apiUrl}/hacienda/${idHacienda}`
    );
  }
  public getById(id: string): Observable<ISector> {
    return this.http.get<ISector>(`${this.apiUrl}/${id}`);
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  public store(request: ISector): Observable<ISector> {
    return this.http.post<ISector>(this.apiUrl, request);
  }
  public update(request: ISector): Observable<ISector> {
    return this.http.put<ISector>(this.apiUrl, request);
  }
}

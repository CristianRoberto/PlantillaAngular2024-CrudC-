import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICausal, ICausalesResponse } from "./causales.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CausalesService {
  private apiUrl: string = environment.causalesServiceES;

  constructor(private http: HttpClient) {}

  
  public indexCausales(
    ): Observable<ICausalesResponse> {
      return this.http.get<ICausalesResponse>(
        `${this.apiUrl}`
      );
    }
  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ICausalesResponse> {
    return this.http.get<ICausalesResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: ICausal): Observable<ICausal> {
    return this.http.post<ICausal>(this.apiUrl, request);
  }
  public update(request: ICausal): Observable<ICausal> {
    return this.http.put<ICausal>(this.apiUrl, request);
  }
}

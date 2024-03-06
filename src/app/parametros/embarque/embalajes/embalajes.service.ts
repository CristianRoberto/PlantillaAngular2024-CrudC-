import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEmbalaje, IEmbalajesResponse } from "./embalajes.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmbalajesService {
  private apiUrl: string = environment.embalajesServiceES;

  constructor(private http: HttpClient) {}

  public indexEmbalaje(
  ): Observable<IEmbalajesResponse> {
    return this.http.get<IEmbalajesResponse>(
      `${this.apiUrl}`
    );
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IEmbalajesResponse> {
    return this.http.get<IEmbalajesResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IEmbalaje): Observable<IEmbalaje> {
    console.log(request)
    return this.http.post<IEmbalaje>(this.apiUrl, request);
  }
  public update(request: IEmbalaje): Observable<IEmbalaje> {
    return this.http.put<IEmbalaje>(this.apiUrl, request);
  }
}

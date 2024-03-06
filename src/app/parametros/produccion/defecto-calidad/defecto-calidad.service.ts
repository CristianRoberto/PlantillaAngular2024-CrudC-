import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IDefectoCalidad,
  IDefectoCalidadResponse,
} from "./defecto-calidad.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DefectoCalidadService {
  private apiUrl: string = environment.defectoCalidadES;

  constructor(private http: HttpClient) {}

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IDefectoCalidadResponse> {
    return this.http.get<IDefectoCalidadResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IDefectoCalidad): Observable<IDefectoCalidad> {
    return this.http.post<IDefectoCalidad>(this.apiUrl, request);
  }
  public update(request: IDefectoCalidad): Observable<IDefectoCalidad> {
    return this.http.put<IDefectoCalidad>(this.apiUrl, request);
  }
}

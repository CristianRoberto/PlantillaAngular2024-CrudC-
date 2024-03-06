import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  IMaquinaria,
  IMaquinasResponse,
  MaquinariaType,
} from "./maquinaria.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MaquinariaService {
  private apiUrl = environment.maquinariaServiceES;

  constructor(private http: HttpClient) {}
  public indexPaginated(
    numberPage: number,
    pageSize: number,
    maquinariaType: MaquinariaType
  ): Observable<IMaquinasResponse> {
    return this.http.get<IMaquinasResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}/${maquinariaType}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IMaquinaria): Observable<IMaquinaria> {
    return this.http.post<IMaquinaria>(this.apiUrl, request);
  }
  public update(request: IMaquinaria): Observable<IMaquinaria> {
    return this.http.put<IMaquinaria>(this.apiUrl, request);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGeneral, IGeneralResponse } from "./generales.interface";

@Injectable({
  providedIn: "root",
})
export class GeneralesService {

  private apiUrl: string = "environment.parametroGeneralServiceES";

  constructor(
    private http: HttpClient,
  ) { }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IGeneralResponse> {
    return this.http.get<IGeneralResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IGeneral): Observable<IGeneral> {
    return this.http.post<IGeneral>(this.apiUrl, request);
  }
  public update(request: IGeneral): Observable<IGeneral> {
    return this.http.put<IGeneral>(this.apiUrl, request);
  }
}
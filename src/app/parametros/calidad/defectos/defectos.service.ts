import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IDefecto, IDefectosResponse } from "./defectos.interface";

@Injectable({
  providedIn: "root",
})
export class DefectosService {
  private apiUrl = environment.defectoES;
  constructor(private http: HttpClient) {}

  public index(): Observable<IDefectosResponse> {
    return this.http.get<IDefectosResponse>(`${this.apiUrl}`);
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: IDefecto): Observable<IDefecto> {
    return this.http.post<IDefecto>(this.apiUrl, request);
  }
  public update(request: IDefecto): Observable<IDefecto> {
    return this.http.put<IDefecto>(this.apiUrl, request);
  }
}

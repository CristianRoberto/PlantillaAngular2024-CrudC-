import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IHomologacionHacienda, IHomologacionHaciendaResponse } from "./homologacion-hacienda.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HomologacionHaciendasService {
  private apiUrl: string = environment.homologacionHaciendaES;

  constructor(private http: HttpClient) {}

  public index(): Observable<IHomologacionHaciendaResponse> {
    return this.http.get<IHomologacionHaciendaResponse>(`${this.apiUrl}`);
  }
  public indexByZona(idZona: string): Observable<IHomologacionHaciendaResponse> {
    return this.http.get<IHomologacionHaciendaResponse>(`${this.apiUrl}/zona/${idZona}`);
  }
  public getById(id: string): Observable<IHomologacionHacienda> {
    return this.http.get<IHomologacionHacienda>(`${this.apiUrl}/${id}`);
  }
  public delete(id: string, idZona:string, idSubzona: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}/${idZona}/º${idSubzona}`);
  }
  public store(request: IHomologacionHacienda): Observable<IHomologacionHacienda> {
    return this.http.post<IHomologacionHacienda>(this.apiUrl, request);
  }
  public update(request: IHomologacionHacienda): Observable<IHomologacionHacienda> {
    return this.http.put<IHomologacionHacienda>(this.apiUrl, request);
  }
}

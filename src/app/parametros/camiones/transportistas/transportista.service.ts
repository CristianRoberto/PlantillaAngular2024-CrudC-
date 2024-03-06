import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITransportista, ITransportistaResponse } from "./transportista.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TransportistaService {
  private apiUrl: string = environment.transportistaES;

  constructor(
    private http: HttpClient,
  ) { }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<ITransportistaResponse> {
    return this.http.get<ITransportistaResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public index(
  ): Observable<ITransportistaResponse> {
    return this.http.get<ITransportistaResponse>(
      this.apiUrl
    );
  }
  public delete(codigo: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
  }
  public store(request: ITransportista): Observable<ITransportista> {
    return this.http.post<ITransportista>(this.apiUrl, request);
  }
  public update(request: ITransportista): Observable<ITransportista> {
    return this.http.put<ITransportista>(this.apiUrl, request);
  }
}
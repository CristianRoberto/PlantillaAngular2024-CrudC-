import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILote, ILotesResponse } from "./lote.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class LotesServices {
    private apiUrl: string = environment.loteServicesES;
    constructor(private http: HttpClient) {}

    public indexLote(
        ): Observable<ILotesResponse> {
          return this.http.get<ILotesResponse>(
            `${this.apiUrl}`
          );
        }
        public indexPaginated(
            numberPage: number,
            pageSize: number
          ): Observable<ILotesResponse> {
            return this.http.get<ILotesResponse>(
              `${this.apiUrl}/${numberPage}/${pageSize}`
            );
        }
        public delete(codigo: string): Observable<string> {
            return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
        }
        public store(request: ILote): Observable<ILote> {
            console.log(request)
            return this.http.post<ILote>(this.apiUrl, request);
        }
        public update(request: ILote): Observable<ILote> {
            return this.http.put<ILote>(this.apiUrl, request);
          }  
}   
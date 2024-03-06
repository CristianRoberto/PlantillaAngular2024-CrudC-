import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Itipocontabilizacion, ItipocontabilizacionResponse } from "./tipo-contabilizacion.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root",
})
export class TipocontabilizacionService {
    private apiUrl: string = environment.tipocontabilizacionES;

    constructor(private http: HttpClient) { }

    public index(): Observable<ItipocontabilizacionResponse>{
        return this.http.get<ItipocontabilizacionResponse>(
            this.apiUrl
        );
    }
    
    public indexPaginated(
        numberPage: number,
        pageSize: number,

    ): Observable<ItipocontabilizacionResponse> {
        return this.http.get<ItipocontabilizacionResponse>(
            `${this.apiUrl}/${numberPage}/${pageSize}`
        );
    }
    public getById(codigo: string): Observable<Itipocontabilizacion> {
        return this.http.get<Itipocontabilizacion>(`${this.apiUrl}/${codigo}`);
    }
    public delete(codigo: string): Observable<string> {
        return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
    }
    public store(request: Itipocontabilizacion): Observable<Itipocontabilizacion> {
        return this.http.post<Itipocontabilizacion>(`${this.apiUrl}`,
        request);
    }
    public update(request: Itipocontabilizacion): Observable<Itipocontabilizacion> {
        return this.http.put<Itipocontabilizacion>(
            `${this.apiUrl}`,
        request);
    }
}
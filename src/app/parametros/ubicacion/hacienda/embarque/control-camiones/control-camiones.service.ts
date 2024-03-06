import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBasicServices } from "src/app/app.interface";
import { IControlCamion, IControlCamiones } from "./control-camiones.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ControlCamionService implements IBasicServices<IControlCamion, IControlCamiones>{
    private apiUrl: string = environment.controlCamionesServiceES;

    constructor(private http: HttpClient) { }

    public indexPaginated(
        numberPage: number,
        pageSize: number
    ): Observable<IControlCamiones> {
        return this.http.get<IControlCamiones>(`${this.apiUrl}/${numberPage}/${pageSize}`);
    }
    public delete(codigo: string): Observable<string> {
        return this.http.delete<string>(`${this.apiUrl}/${codigo}`);
    }
    public store(request: IControlCamion): Observable<IControlCamion> {
        return this.http.post<IControlCamion>(this.apiUrl, request);
    }
    public update(request: IControlCamion): Observable<IControlCamion> {
        return this.http.put<IControlCamion>(this.apiUrl, request)
    }
}

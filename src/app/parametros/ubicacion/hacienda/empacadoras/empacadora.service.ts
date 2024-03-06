import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpacadora, IEmpacadoraResponse, } from './empacadoras.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpacadoraService {
  private apiUrl: string = environment.empacadoraServiceES;
  constructor(private http: HttpClient) { }

  public index(): Observable<IEmpacadoraResponse> {
    return this.http.get<IEmpacadoraResponse>(`${this.apiUrl}`);
  }

  public indexPaginated(
    numberPage: number,
    pageSize: number
  ): Observable<IEmpacadoraResponse> {
    return this.http.get<IEmpacadoraResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}`
    );
  }
  public indexPaginatedByHacienda(
    numberPage: number,
    pageSize: number,
    idHacienda: string
  ): Observable<IEmpacadoraResponse> {
    return this.http.get<IEmpacadoraResponse>(
      `${this.apiUrl}/${numberPage}/${pageSize}/${idHacienda}`
    );
  }
  public indexByHacienda(idHacienda: string): Observable<IEmpacadoraResponse> {
    return this.http.get<IEmpacadoraResponse>(`${this.apiUrl}/hacienda/${idHacienda}`);
  }

  // public getById(id: string): Observable<IEmpacadora> {
  //   return this.http.get<IEmpacadora>(`${this.apiUrl}/${id}`);
  // }
  public store(request: IEmpacadora): Observable<IEmpacadora> {
    return this.http.post<IEmpacadora>(this.apiUrl, request);
  }
  public update(request: IEmpacadora): Observable<IEmpacadora> {
    return this.http.put<IEmpacadora>(this.apiUrl, request)
  }
  public delete(idEmpacadora: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${idEmpacadora}`);
  }
}

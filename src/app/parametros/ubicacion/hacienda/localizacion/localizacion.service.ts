import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILocalizacionResponse, ILocalizacionTable, ITtemLocalizacion } from './localizacion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  private apiUrl = environment.localizacionEs;
  constructor(private http: HttpClient) { }
  
  public index(): Observable<ILocalizacionResponse> {
    return this.http.get<ILocalizacionResponse>(
      `${this.apiUrl}`
    );
  }

  public storeItemLocalizacion(
    request: ILocalizacionTable
  ): Observable<ITtemLocalizacion> {
    return this.http.post<ITtemLocalizacion>(
      `${this.apiUrl}`,
      request
    );
  }
  public updateItemLocalizacion(request: ITtemLocalizacion): Observable<ITtemLocalizacion> {
    return this.http.put<ITtemLocalizacion>(
      `${this.apiUrl}`,
      request
    );
  }
  public deleteItemLocalizacion(costCenter: string,location): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${costCenter}/${location}`);
  }

}

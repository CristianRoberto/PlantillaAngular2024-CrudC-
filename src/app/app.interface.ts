import { Observable } from "rxjs";

export interface IIndexService<T> {
  index(): Observable<T>;
}
export interface IIndexPaginatedService<T> {
  indexPaginated(numberPage: number, pageSize: number): Observable<T>;
}
export interface IDeleteService {
  delete(id: string): Observable<string>;
}
export interface IStoreService<T> {
  store(request: T): Observable<T>;
}
export interface IUpdateService<T> {
  update(request: T): Observable<T>;
}

export interface IBasicServices<T, R> {
  indexPaginated(numberPage: number, pageSize: number): Observable<R>;
  store(request: T): Observable<T>;
  update(request: T): Observable<T>;
  delete(id: string): Observable<string>;
}

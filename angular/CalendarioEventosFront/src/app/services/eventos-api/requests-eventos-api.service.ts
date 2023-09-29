import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Evento } from 'src/app/models/evento/evento';
import { ResponsePagination } from 'src/app/models/response-pagination/response-pagination';

@Injectable({
  providedIn: 'root'
})
export class RequestsEventosService {
  url = 'http://127.0.0.1:8000'
  responsePagination!: Observable<ResponsePagination>;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getEventos(params: HttpParams): Observable<ResponsePagination> {
    return this.httpClient.get<ResponsePagination>(`${this.url}/eventos/eventos/`, {
      params
    })
  }

  getEvento(id: number): Observable<Evento> {
    return this.httpClient.get<Evento>(`${this.url}/eventos/eventos/${id}`)
  }
  
  getCategorias(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/eventos/categorias/`)
  }

  postEvento(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/eventos/eventos/`, formData);
  }

  putEvento(formData: FormData, id: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/eventos/eventos/${id}/`, formData)
  }

}


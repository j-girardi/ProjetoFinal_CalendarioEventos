import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as md5 from 'js-md5'
import { Evento } from 'src/app/models/evento/evento';

@Injectable({
  providedIn: 'root'
})
export class RequestsApiService {
  url = 'http://127.0.0.1:8000'
  accessToken = localStorage.getItem('access_token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  }) 

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  getEventos(params: HttpParams): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${this.url}/eventos/eventos/`, {
      params
    });
  }

  getEvento(id: number): Observable<Evento> {
    return this.httpClient.get<Evento>(`${this.url}/eventos/eventos/${id}`)
  }
  

  login(formData: FormData) {
    return this.httpClient.post<any>(`${this.url}/accounts/login`, formData)
  }
}


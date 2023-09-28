import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as md5 from 'js-md5'
import { Evento } from 'src/app/models/evento/evento';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';

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
    private router: Router,
  ) { }

  getEventos(params: HttpParams): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${this.url}/eventos/eventos/`, {
      params
    });
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



  login(formData: FormData) {
    return this.httpClient.post<any>(`${this.url}/accounts/login/`, formData)
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_PK');
    this.router.navigate(['/login']);
  }

  verificaToken(token: any) {
    return this.httpClient.post<any>(`${this.url}/accounts/token/verify/`, { token })
  }

  renovaToken(): Observable<any> {
    let refreshToken = localStorage.getItem('refresh_token');
    return this.httpClient.post<any>(`${this.url}/accounts/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('access_token', response.access);
        } else {
          alert('Por favor, faça o login novamente');
          this.router.navigate(['/login']);
        }
      }),
    );
  }

  
  getUsuario(id: number) {
    return this.httpClient.get<Usuario>(`${this.url}/usuarios/usuarios/${id}`)
  }

  putUsuario(formData: FormData, id: number) {
    return this.httpClient.put<Usuario>(`${this.url}/usuarios/usuarios/${id}/`, formData)
  }
}


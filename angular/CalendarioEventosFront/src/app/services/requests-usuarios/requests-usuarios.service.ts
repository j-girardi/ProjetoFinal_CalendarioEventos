import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class RequestsUsuariosService {
  url = 'http://127.0.0.1:8000';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }


  login(formData: FormData) {
    return this.httpClient.post<any>(`${this.url}/accounts/login/`, formData)
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_PK');
    this.router.navigate(['/login']);
  }

  getUsuario(id: number) {
    return this.httpClient.get<Usuario>(`${this.url}/usuarios/usuarios/${id}`)
  }

  putUsuario(formData: FormData, id: number) {
    return this.httpClient.put<Usuario>(`${this.url}/usuarios/usuarios/${id}/`, formData)
  }

}

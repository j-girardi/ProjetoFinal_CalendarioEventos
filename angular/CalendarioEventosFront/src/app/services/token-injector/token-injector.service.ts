import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { RequestsUsuariosService } from '../requests-usuarios/requests-usuarios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInjectorService implements HttpInterceptor {
  url = 'http://127.0.0.1:8000';
  
  constructor(
  private requestUsuarioService: RequestsUsuariosService,
  private httpClient: HttpClient,
  private router: Router,
  ) { }

  renovaToken(): Observable<any> {
    let refreshToken = localStorage.getItem('refresh_token');
    return this.httpClient.post<any>(`${this.url}/accounts/token/refresh/`, { refresh: refreshToken }).pipe(
      tap((response: { access: string; }) => {
        if (response.access) {
          localStorage.setItem('access_token', response.access);
        } else {
          alert('Por favor, faça o login novamente');
          this.router.navigate(['/login']);
        }
      }),
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE' || request.url.includes('/accounts/registration')) {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {

            if (error.status === 400) {
              return throwError('Erro 400: Bad Request')
            }
            if (error.status === 401) {
              return this.renovaToken().pipe(
                switchMap((response: { access: string; }) => {
                  let newToken = response.access
                  localStorage.setItem('access_token', response.access);
                  const updatedRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`,
                    },
                  });
                  return next.handle(updatedRequest);
                }),
                catchError((tokenError) => {
                  this.requestUsuarioService.logout()
                  return throwError('Realize o login novamente.', tokenError);
                })
              );
            } 
            else {
              return throwError('Erro: ' + error)
            }
          })
        );
      }
    }
    return next.handle(request);
  }
}

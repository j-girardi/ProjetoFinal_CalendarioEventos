import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RequestsApiService } from '../eventos-api/requests-api.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInjectorService implements HttpInterceptor {
  constructor(
  private router:Router,
  private requestService: RequestsApiService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verifique o método da solicitação (GET, POST, PUT, DELETE)
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE' || request.url.includes('/accounts/registration')) {
      // Verifique se o token de acesso está presente no armazenamento local
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        // Clone a solicitação original e inclua o token de acesso no cabeçalho "Authorization"
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Continue com a solicitação clonada
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              return throwError('erro 400')
            }
            if (error.status === 401) {
              // Lidar com o erro 401: chame a função renovaToken e tente novamente
              return this.requestService.renovaToken().pipe(
                switchMap((response) => {
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
                  // Se não for possível renovar o token, redirecione para /login
                  this.requestService.logout()
                  this.router.navigate(['/usuario/login']);
                  return throwError(tokenError);
                })
              );
            } else {
              // Para outros erros, exiba um alerta e redirecione para /login
              // this.requestService.logout()
              // return throwError('Erro, realize o login novamente');
              return throwError('erro')
            }
          })
        );
      }
    }

    // Se não for uma solicitação POST, PUT ou DELETE ou se o token não estiver presente,
    // continue com a solicitação original
    return next.handle(request);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as md5 from 'js-md5'
import { Evento } from 'src/app/models/evento/evento';
import { MarvelResponse } from 'src/app/models/marvel-response/marvel-response';

@Injectable({
  providedIn: 'root'
})
export class EventosApiService {
  PUBLIC_KEY = '365f8068838f7e238b0b0b0cb76d6be1';
  PRIVATE_KEY = '83411b335e72517d48d4c54f8b812810cdde2a5e';
  
  url = 'http://127.0.0.1:8000'
  accessToken = localStorage.getItem('access_token');
  headers = new HttpHeaders({
  'Authorization': `Bearer ${this.accessToken}`}) 

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  getEventos(params: HttpParams): Observable<MarvelResponse> {
    const ts = new Date().getTime();
    const chave = new Date().getTime() + this.PRIVATE_KEY + this.PUBLIC_KEY;
    const hash = md5.create();
    hash.update(chave);
    params = params
      .set('ts', ts)
      .set('apikey', this.PUBLIC_KEY)
      .set('hash', hash.hex());
    return this.httpClient.get<MarvelResponse>('https://gateway.marvel.com/v1/public/characters', {
      params
    });
    // return this.httpClient.get<Evento>(`${this.url}/eventos/`, {
    //   params
    // });
  }

  getEvento(id: any): Observable<Evento> {
    return this.httpClient.get<Evento>(`${this.url}/eventos/${id}`)
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http'
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.scss']
})
export class EventosUsuarioComponent implements OnInit{
  httpParams = new HttpParams()
  eventos!: Observable<Evento[]>
  countEventos: number = 0
  totalItems: number = 0;
  pageSize: number = 100; 
  currentPage: number = 1; 

  constructor(
    private requestsEventosService: RequestsEventosService,
    private router: Router
  ) { }

  ngOnInit() {

    this.requestEventos()
  }

  requestEventos() {
    this.httpParams = this.httpParams
      .set('page', this.currentPage.toString()) 
      .set('page_size', this.pageSize.toString())
    this.eventos = this.requestsEventosService.getEventos(this.httpParams)
    .pipe(
      map((response) => {
        this.totalItems = response.count;
        return response.results.map(
          (evento: Evento) => evento)
      })
    ).pipe(
      map(eventos => {
        return eventos.filter(evento => 
          this.filterUser(evento.usuario)
        )
      })
    );
  }

  filterUser(user: any) {
    let usuarioId = localStorage.getItem('user_PK');
    if (!usuarioId) {
      alert('Realize o login novamente.');
      this.router.navigate(['/login']);
      return false;
    }

    if (!user || user.id === null) {
      return false;
    }

    return parseInt(usuarioId) === parseInt(user.id);
  }

  editEvento(eventoId: number) {
    this.router.navigate(['usuario/eventos/evento', eventoId])
  }
}

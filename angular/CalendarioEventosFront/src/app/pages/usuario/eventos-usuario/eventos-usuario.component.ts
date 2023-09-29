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
export class EventosUsuarioComponent {
  httpParams = new HttpParams()
  eventos!: Observable<Evento[]>
  countEventos: number = 0
  totalItems: number = 0;
  pageSize: number = 100; // Tamanho padrão da página
  currentPage: number = 1; // Página atual

  constructor(
    private requestsEventosService: RequestsEventosService,
    private router: Router
  ) { }

  ngOnInit() {

    this.requestEventos()
    // this.eventos = this.requestsEventosService.getEventos(this.httpParams)
    // .pipe(
    //   map((response) => {
    //     console.log(response);
    //     this.countEventos = response.count;
    //     return response.results.map(
    //       (evento: Evento) => evento)
    //   })
    // ).pipe(
    //   map(eventos => {
    //     return eventos.filter(evento => 
    //       this.filtrarUser(evento.usuario)
    //     )
    //   })
    // );
    //   .subscribe(eventos => {
    //     this.eventos = eventos.filter(it => this.eventosUser(it.usuario))
    //  })
  }

  requestEventos() {
    this.httpParams = this.httpParams
      .set('page', this.currentPage.toString()) // Página atual
      .set('page_size', this.pageSize.toString())
    this.eventos = this.requestsEventosService.getEventos(this.httpParams)
    .pipe(
      map((response) => {
        console.log(response);
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

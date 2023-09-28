import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http'
import { RequestsApiService } from 'src/app/services/eventos-api/requests-api.service';

@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.scss']
})
export class EventosUsuarioComponent {
  httpParams = new HttpParams()
  eventos: any[] = []
  evento: any

  constructor(
    private requestService: RequestsApiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.requestService.getEventos(this.httpParams)
      .subscribe(eventos => {
        this.eventos = eventos.filter(it => this.eventosUser(it.usuario))
     })
  }

  eventosUser(user: any) {
    let usuarioId = localStorage.getItem('user_PK');
    if (!usuarioId) {
      alert('Por favor, realize o login novamente.');
      this.router.navigate(['/login']);
      return false; // Retorna false para indicar que não há usuário logado.
    }

    if (!user || user.id === null) {
      return false; // Retorna false se o objeto user for nulo ou user.id for nulo.
    }

    return parseInt(usuarioId) === parseInt(user.id);
  }


  editarEvento(eventoId: number) {
    this.router.navigate(['usuario/eventos/evento', eventoId])
  }
}

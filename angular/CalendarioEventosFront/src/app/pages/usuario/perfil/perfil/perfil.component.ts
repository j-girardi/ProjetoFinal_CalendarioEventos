import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsUsuariosService } from 'src/app/services/requests-usuarios/requests-usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  botaoAtivo!: string
  token = localStorage.getItem("access_token")
  userId: any
  constructor(
    private requestUsuarioService: RequestsUsuariosService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_PK')

  }

  abrePerfil() {
    if (this.userId) {
      this.botaoAtivo = 'perfil';
      this.router.navigate([`usuario/perfil/${this.userId}`])
    }
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }

  novoEvento() {
    if (this.userId) {
      this.botaoAtivo = 'novo-evento';
      this.router.navigate([`usuario/novo-evento`])
    }
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }

  abreEventos() {
    if (this.userId) {
      this.botaoAtivo = 'eventos-do-usuario';
      this.router.navigate([`usuario/eventos/`])
    }
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }


  logout() {
    this.requestUsuarioService.logout()
  }

  abreHome() {
    this.router.navigate(['/'])
  }

  isRotaPerfil(): boolean {
    return this.router.url === `usuario/perfil/${this.userId}`
  }
}

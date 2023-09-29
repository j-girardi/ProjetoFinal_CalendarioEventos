import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { RequestsUsuariosService } from 'src/app/services/requests-usuarios/requests-usuarios.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  token = localStorage.getItem('access_token')
  @Input() search = new FormControl();
  @Input() filtroData = new FormControl();


  constructor(
    private requestsUsuarioService: RequestsUsuariosService,
    private router: Router,
    private filtroService: FiltroService,
  ) { }

  ngOnInit(): void {
  }

  atualizarFiltroData(data: Date[] | null) {
    this.filtroService.setFiltroData(data);
  }

  atualizarPesquisa(pesquisa: string) {
    this.filtroService.setPesquisa(pesquisa);
  }


  logout() {
    this.requestsUsuarioService.logout()
  }

  isRotaEventos(): boolean {
    return this.router.url === '/eventos'
  }

  abreHome() {
    this.router.navigate(['/'])
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Evento } from 'src/app/models/evento/evento';
import { RequestsApiService } from 'src/app/services/eventos-api/requests-api.service';
import { FiltroService } from 'src/app/services/filtro/filtro.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  token = localStorage.getItem('access_token')
  @Input() search = new FormControl();
  @Input() filtroData = new FormControl();
  
  
  constructor (
    private requestService: RequestsApiService,
    private router: Router,
    private filtroService: FiltroService,
  ) {}

  ngOnInit(): void {
  }

  atualizarFiltroData(data: Date[] | null) {
    this.filtroService.setFiltroData(data);
  }

  atualizarPesquisa(pesquisa: string) {
    this.filtroService.setPesquisa(pesquisa);
  }

  
  logout() {
    this.requestService.logout()
  }

  isRotaEventos(): boolean {
    return this.router.url === '/eventos'
  }

  abreHome() {
    this.router.navigate(['/'])
  }
  
}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { RequestsApiService } from 'src/app/services/eventos-api/requests-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { Router } from '@angular/router';
import { EventosRoutingModule } from '../../eventos-routing.module';
import { FiltroService } from 'src/app/services/filtro/filtro.service';

@Component({
  selector: 'app-todos-eventos',
  templateUrl: './todos-eventos.component.html',
  styleUrls: ['./todos-eventos.component.scss']
})
export class TodosEventosComponent implements OnInit{
  control = new FormControl();
  eventos!: Observable<Evento[]>;
  search = new FormControl();
  httpParams = new HttpParams;
  filtroData = new FormControl();
  eventosFiltrados: Evento[] = []
  
  constructor (
    private requestsApiService: RequestsApiService,
    private filtroService: FiltroService,
  ) {}
  
  ngOnInit() {
    this.filtroService.pesquisa$.subscribe((pesquisa) => {
      this.search.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(data => {
        this.httpParams = this.httpParams.set('search', data)
        this.buscarEventos()
      });
    })

    this.filtroService.filtroData$.subscribe((data) => {
      this.filtroData.valueChanges.subscribe(() => {
        console.log('MUDOU A DATA');  
        this.buscarEventos();
        });
    })

    this.buscarEventos()
  }

  buscarEventos() {
    this.eventos = this.requestsApiService.getEventos(this.httpParams)
    this.eventos = this.eventos.pipe(
      map(eventos => {
        return eventos.filter(evento => 
          this.filtrarData(evento.data)
        )
      })
    );
  }

  filtrarData(data: string) {
    // console.log(new Date(data));
    if(this.filtroData.value == null || this.filtroData.value == undefined){
      return true
    }
    const dataEvento = new Date(data+'T00:00:00')
    const filtro0 = new Date(this.filtroData.value[0].getFullYear(), this.filtroData.value[0].getMonth(), this.filtroData.value[0].getDate())
    const filtro1 = new Date(this.filtroData.value[1].getFullYear(), this.filtroData.value[1].getMonth(), this.filtroData.value[1].getDate()+1)
    return dataEvento >= filtro0 && dataEvento <= filtro1
  }

  
  

}


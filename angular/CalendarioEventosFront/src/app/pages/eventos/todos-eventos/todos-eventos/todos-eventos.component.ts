import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { EventosApiService } from 'src/app/services/eventos-api/eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';

@Component({
  selector: 'app-todos-eventos',
  templateUrl: './todos-eventos.component.html',
  styleUrls: ['./todos-eventos.component.scss']
})
export class TodosEventosComponent {
  control = new FormControl();
  // offset = 0;
  // limit = 8;
  // eventos: Evento[] = []
  // eventos$!: Observable<Character[]>;
  eventos!: Observable<Evento[]>;
  search = new FormControl();
  httpParams = new HttpParams;
  filtroData = new FormControl();
  
  constructor (
    private eventosApiService: EventosApiService
  ) {}


  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(data => {
      this.httpParams = this.httpParams.set('search', data)
      this.buscarEventos()
    });

    this.filtroData.valueChanges.subscribe(() => {
      console.log('MUDOU A DATA');  
      this.buscarEventos();
      });

    this.buscarEventos()
  }

  buscarEventos() {
    this.eventos = this.eventosApiService.getEventos(this.httpParams)
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

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [DatePipe]
})

export class MainComponent implements OnInit{
  control = new FormControl();
  eventos!: Observable<Evento[]>;
  httpParams = new HttpParams;
  responsePagination!: Observable<any>;
  
  constructor (
    private requestsApiService: RequestsEventosService
    ) {}
    
    
    ngOnInit() {
      this.filterDate()
    }

  requestEventos() {
    this.httpParams = this.httpParams
    .set('page_size', "10");
    
    this.responsePagination = this.requestsApiService.getEventos(this.httpParams)
    this.eventos = this.responsePagination.pipe(
      map((responsePagination) => {
        return responsePagination.results.map(
          (eventos: Evento[]) => eventos)
      })
    )
  }

  filterDate() {
    function formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);
    var startFilterRange = formatDate(currentDate);
    var endFilterRange = formatDate(futureDate);

    this.httpParams = this.httpParams
      .set('start_date', startFilterRange)
      .set('end_date', endFilterRange);

    this.requestEventos()

  }

}

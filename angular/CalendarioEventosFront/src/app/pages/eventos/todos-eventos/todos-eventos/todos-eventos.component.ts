import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { DatePipe } from '@angular/common';
import { ResponsePagination } from 'src/app/models/response-pagination/response-pagination';
import { TipoEvento } from 'src/app/models/evento/tipo-evento';

@Component({
  selector: 'app-todos-eventos',
  templateUrl: './todos-eventos.component.html',
  styleUrls: ['./todos-eventos.component.scss'],
  providers: [DatePipe]
})
export class TodosEventosComponent implements OnInit {
  search = new FormControl();
  httpParams = new HttpParams;
  filtroData = new FormControl();
  eventosFiltrados: Evento[] = []
  totalItems: number = 0;
  pageSize: number = 25;
  currentPage: number = 1;

  eventos!: Observable<Evento[]>;
  responsePagination!: Observable<ResponsePagination>;
  categorias: TipoEvento[] = []


  constructor(
    private requestEventosService: RequestsEventosService,
    private filtroService: FiltroService,
  ) {
  }


  ngOnInit() {
    this.filtroService.pesquisa$.subscribe(() => {
      this.search.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(data => {
        this.httpParams = this.httpParams.set('search', data)
        this.requestEventos()
      });
    })

    this.filtroService.filtroData$.subscribe(() => {
      this.filtroData.valueChanges.subscribe(() => {
        this.filterDate(this.filtroData.value);
      });
    })

    this.requestEventosService.getCategorias()
      .subscribe(data => {
        this.categorias = data
      })

    this.requestEventos()
  }

  requestEventos() {

    let page = localStorage.getItem('pageSize')
    if (page !== null && page !== undefined) {
      this.pageSize = parseInt(page, 10)
    }
    this.httpParams = this.httpParams
      .set('page', this.currentPage.toString())
      .set('page_size', this.pageSize.toString())


    this.responsePagination = this.requestEventosService.getEventos(this.httpParams)

    this.eventos = this.responsePagination.pipe(
      map((response) => {
        this.totalItems = response.count;
        return response.results
      })
    );
  }

  filterDate(dateRange: Date[] | null) {
    if (dateRange == null || dateRange == undefined) {
      this.httpParams = this.httpParams
        .delete('start_date')
        .delete('end_date');
      return this.requestEventos()
    }
    var startFilterRange = dateRange[0].toISOString().split('T')[0]
    var endFilterRange = dateRange[1].toISOString().split('T')[0]

    this.httpParams = this.httpParams
      .set('start_date', startFilterRange)
      .set('end_date', endFilterRange);

    this.requestEventos()

  }

  changePage(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    localStorage.setItem('pageSize', this.pageSize.toString())
    this.requestEventos();

  }

}


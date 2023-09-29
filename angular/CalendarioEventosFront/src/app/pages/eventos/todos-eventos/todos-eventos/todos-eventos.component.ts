import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { Router } from '@angular/router';
import { EventosRoutingModule } from '../../eventos-routing.module';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { DatePipe } from '@angular/common';
import { ResponsePagination } from 'src/app/models/responsePagination/response-pagination';
import { TipoEvento } from 'src/app/models/evento/tipo-evento';

@Component({
  selector: 'app-todos-eventos',
  templateUrl: './todos-eventos.component.html',
  styleUrls: ['./todos-eventos.component.scss'],
  providers: [DatePipe]
})
export class TodosEventosComponent implements OnInit{
  @Input() controlCategoria = new FormControl();
  search = new FormControl();
  httpParams = new HttpParams;
  filtroData = new FormControl();
  eventosFiltrados: Evento[] = []
  totalItems: number = 0;
  pageSize: number = 25; // Tamanho padrão da página
  currentPage: number = 1; // Página atual

  eventos!: Observable<Evento[]>;
  responsePagination!: Observable<ResponsePagination>;

  categorias: TipoEvento[] = []
  tipoEventoSelecionado: string | null = null;
  
  
  constructor (
    private requestEventosService: RequestsEventosService,
    private filtroService: FiltroService,
  ) {
  }
  

  ngOnInit() {
    this.filtroService.pesquisa$.subscribe((pesquisa) => {
      this.search.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(data => {
        this.httpParams = this.httpParams.set('search', data)
        this.requestEventos()
      });
    })

    this.filtroService.filtroData$.subscribe((dateRange) => {
      this.filtroData.valueChanges.subscribe(() => {
        this.filterDate(this.filtroData.value);
        console.log('MUDOU A DATA');  
        });
    })

    this.controlCategoria.valueChanges.subscribe((categ)=> {
      console.log(categ)
    })

    // const search$ = this.search.valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   startWith('')
    // );

    // const data$ = this.filtroData.valueChanges.pipe(
    //   startWith(null)
    // );

    // const tipoEvento$ = this.control.valueChanges.pipe(
    //   startWith(null)
    // );

    // this.eventos = combineLatest([search$, data$, tipoEvento$]).pipe(
    //   switchMap(([searchTerm, dateRange, tipoEvento]) => {
    //     // Construa os parâmetros HTTP com base nos filtros selecionados
    //     let params = new HttpParams();
    //     params = params.set('search', searchTerm);

    //     if (dateRange) {
    //       params = params.set('start_date', dateRange[0]?.toISOString());
    //       params = params.set('end_date', dateRange[1]?.toISOString());
    //     }

    //     if (tipoEvento) {
    //       params = params.set('tipo_evento', tipoEvento);
    //     }

    //     params = params.set('page', this.currentPage.toString());
    //     params = params.set('page_size', this.pageSize.toString());

    //     this.httpParams = params;

    //     // Faça a solicitação de eventos com base nos parâmetros
    //     return this.requestEventosService.getEventos(params).pipe(
    //       map((response) => {
    //         console.log(response);
    //         this.totalItems = response.count;
    //         return response.results;
    //       })
    //     );
    //   })
    // );


    this.requestEventosService.getCategorias()
      .subscribe(data => {
        this.categorias = data
      })

    this.requestEventos()
  }

  requestEventos() {
    
    let page = localStorage.getItem('pageSize')
    if (page !== null && page !== undefined){
      this.pageSize = parseInt(page, 10)
    }
    this.httpParams = this.httpParams
    .set('page', this.currentPage.toString())
    .set('page_size', this.pageSize.toString())
    
    
    this.responsePagination = this.requestEventosService.getEventos(this.httpParams)
    
    this.eventos = this.responsePagination.pipe(
      map((response) => {
        console.log(response)
        this.totalItems = response.count;

        return response.results
      })
    );
    // .pipe(
    //   map(eventos => {
    //     return eventos
        // .filter(evento => 
          // this.filterDate(evento.data)
        // )
    //   })
    // );
    
    // this.eventos = this.search.valueChanges
  }

  filterDate(dateRange: Date[] | null) {
    if(dateRange == null || dateRange == undefined) {
      this.httpParams = this.httpParams
      .delete('start_date')
      .delete('end_date');
      return this.requestEventos()
    }
    var startFilterRange = dateRange[0].toISOString().split('T')[0]
    var endFilterRange = dateRange[1].toISOString().split('T')[0] 
    
    this.httpParams = this.httpParams
    .set('start_date', startFilterRange) // Convert to ISO format
    .set('end_date', endFilterRange);
    
    this.requestEventos()

    // console.log(new Date(data));
    // if(dateRange == null || this.filtroData.value == null || this.filtroData.value == undefined){
    //   return true
    // }
    // const dataEvento = new Date(data+'T00:00:00')
    // const filtro0 = new Date(this.filtroData.value[0].getFullYear(), this.filtroData.value[0].getMonth(), this.filtroData.value[0].getDate())
    // const filtro1 = new Date(this.filtroData.value[1].getFullYear(), this.filtroData.value[1].getMonth(), this.filtroData.value[1].getDate()+1)
    // return dataEvento >= filtro0 && dataEvento <= filtro1
  }

  changePage(event: any): void {
    this.currentPage = event.pageIndex + 1; // pageIndex começa em 0
    this.pageSize = event.pageSize;
    localStorage.setItem('pageSize', this.pageSize.toString())
    this.requestEventos();
  
  }

}


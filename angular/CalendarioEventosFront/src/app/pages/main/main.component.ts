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
      this.buscarEventos()
      const hoje = new Date();

      // Data daqui a 7 dias
      const dataDaqui7Dias = new Date();
      dataDaqui7Dias.setDate(dataDaqui7Dias.getDate() + 7);
      console.log(hoje)
      console.log(dataDaqui7Dias)
      const formatoData = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const hojeFormatada = hoje.toLocaleDateString('pt-BR');
      const dataDaqui7DiasFormatada = dataDaqui7Dias.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });

      console.log(hojeFormatada)
      console.log(dataDaqui7DiasFormatada)
  }

  buscarEventos() {
    this.httpParams = this.httpParams
    .set('page_size', "5");
    
    this.responsePagination = this.requestsApiService.getEventos(this.httpParams)
    this.eventos = this.responsePagination.pipe(
      map((responsePagination) => {
        return responsePagination.results.map(
          (eventos: Evento[]) => eventos)
      })
    )
    
    this.eventos = this.eventos.pipe(
      map(eventos => {
        return eventos.filter(evento => 
          this.filtrarData(evento.data)
        )
      })
    );
    // this.eventos = this.eventos.pipe(
    //   map(eventos => {
    //     return eventos.filter(evento => 
    //       this.filtrarData(evento.data)
    //     )
    //   })
    // );
  }

  filtrarData(data: string) {
  //   // console.log(new Date(data));
  //   if(this.filtroData.value == null || this.filtroData.value == undefined){
  //     return true
  //   }
  //   const dataEvento = new Date(data+'T00:00:00')
  //   const filtro0 = formatDate(new Date(), 'yyyy/MM/dd', 'pt')
  //   // const filtro1 = new Date(this.filtroData.value[1].getFullYear(), this.filtroData.value[1].getMonth(), this.filtroData.value[1].getDate()+1)
  //   // return 
    return true
  }
}

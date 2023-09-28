import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Evento } from './models/evento/evento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Agenda PB';
  // httpParams: any;
  // eventos$!: Observable<Evento[]>;
  // search = new FormControl()
  // eventosApiService: any;

  ngOnInit() {
    // this.search.valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    // ).subscribe(val => {
    //   this.httpParams = this.httpParams.set('search', val)
    //   this.buscarEventos()
    // });
    // this.buscarEventos()
  }

  // buscarEventos() {
  //   this.eventos$ = this.eventosApiService.getEventos(this.httpParams)
  //   this.eventos$.subscribe(
  //       eventos => {
  //         eventos.forEach(evento => {
  //           console.log(evento)
  //         })
  //       }
  //     )
  // }
}

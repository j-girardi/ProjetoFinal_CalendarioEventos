import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { EventosApiService } from 'src/app/services/eventos-api/eventos-api.service';
import { Character } from 'src/app/models/character/character';
import { Evento } from 'src/app/models/evento/evento';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  control = new FormControl();

  offset = 0;
  limit = 8;
  params = new HttpParams();

  constructor (
    private eventosApiService: EventosApiService
  ) {}

  eventos$!: Observable<Character[]>;
  // eventos$!: Observable<Evento[]>;

  ngOnInit(): void {
    this.params = this.params
      .set('limit', this.limit)
      .set('offset', this.offset); 
    this.eventos$ = this.eventosApiService.getEventos(this.params)
      .pipe(
        map(response => response.data.results)
      );
  }
}

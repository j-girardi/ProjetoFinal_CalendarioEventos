import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private filtroDataSubject = new BehaviorSubject<Date[] | null>(null);
  filtroData$ = this.filtroDataSubject.asObservable();

  private pesquisaSubject = new BehaviorSubject<string>('');
  pesquisa$ = this.pesquisaSubject.asObservable();

  constructor() {}

  setFiltroData(data: Date[] | null) {
    this.filtroDataSubject.next(data);
  }

  setPesquisa(pesquisa: string) {
    this.pesquisaSubject.next(pesquisa);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DetalheEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    HttpClientModule,

  ]
})
export class EventosModule { }

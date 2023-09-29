import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosEventosComponent } from './todos-eventos/todos-eventos/todos-eventos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainModule } from '../main/main.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DetalheEventoComponent,
    TodosEventosComponent,
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    FontAwesomeModule,
    MainModule,
    MatPaginatorModule
  ]
})
export class EventosModule { }

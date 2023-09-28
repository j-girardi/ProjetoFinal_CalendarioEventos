import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosEventosComponent } from './todos-eventos/todos-eventos/todos-eventos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '../main/main.module';


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
    MainModule
  ]
})
export class EventosModule { }

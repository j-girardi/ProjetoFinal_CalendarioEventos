import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { TodosEventosComponent } from './todos-eventos/todos-eventos/todos-eventos.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetalheEventoComponent,
  },
  {
    path: '',
    component: TodosEventosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }

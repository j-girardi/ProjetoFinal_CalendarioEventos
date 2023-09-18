import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetalheEventoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { PerfilComponent } from './perfil/perfil/perfil.component';
import { DetalhePerfilComponent } from './detalhe-perfil/detalhe-perfil.component';
import { NovoEventoComponent } from './novo-evento/novo-evento.component';
import { EventosUsuarioComponent } from './eventos-usuario/eventos-usuario.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: PerfilComponent,
    children: [
        {
            path: 'perfil/:id',
            component: DetalhePerfilComponent
        },
        {
            path: 'novo-evento',
            component: NovoEventoComponent
        },
        {
            path: 'eventos',
            component: EventosUsuarioComponent
        },
        {
            path: 'eventos/evento/:id',
            component: EditarEventoComponent
        },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

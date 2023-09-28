import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('src/app/pages/eventos/eventos.module').then(m => m.EventosModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('src/app/pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

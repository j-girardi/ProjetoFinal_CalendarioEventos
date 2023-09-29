import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { PerfilComponent } from './perfil/perfil/perfil.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetalhePerfilComponent } from './detalhe-perfil/detalhe-perfil.component';
import { NovoEventoComponent } from './novo-evento/novo-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { EventosUsuarioComponent } from './eventos-usuario/eventos-usuario.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainModule } from '../main/main.module';


@NgModule({
  declarations: [
    PerfilComponent,
    LoginComponent,
    DetalhePerfilComponent,
    NovoEventoComponent,
    EditarEventoComponent,
    EventosUsuarioComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    UsuarioRoutingModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    // DropzoneCdkModule,
    // DropzoneMaterialModule,
    MatIconModule,
    NgxDropzoneModule,
    SharedModule,
    MainModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class UsuarioModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far)
  }
}

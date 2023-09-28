import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModule } from './pages/usuario/usuario.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInjectorService } from './services/token-injector/token-injector.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UsuarioModule,
    FontAwesomeModule,
        
  ],
  exports: [
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInjectorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

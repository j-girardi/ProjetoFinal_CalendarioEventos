import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EventCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    EventCardComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class SharedModule { }

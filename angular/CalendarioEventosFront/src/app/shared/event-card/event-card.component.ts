import { Component, Input } from '@angular/core';
import { Evento } from 'src/app/models/evento/evento';
import { Character } from 'src/app/models/character/character';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})

export class EventCardComponent {
  @Input() evento!: Character;
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento/evento';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})

export class EventCardComponent implements OnInit{
  @Input() evento!: Evento;
  monthName: string = '';
  eventoDay: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
        // Assuming 'evento.date' is in the format 'YYYY-MM-DD'
        const dateParts = this.evento.data.split('-');
        const year = +dateParts[0];
        const monthIndex = +dateParts[1] - 1; // Months are 0-based in JavaScript
        this.eventoDay = dateParts[2];
        
        // Create a Date object
        const eventDate = new Date(year, monthIndex, +this.eventoDay);
    
        // Get the month name
        const monthNames = [
          "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
          "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ];
        this.monthName = monthNames[eventDate.getMonth()];
      }
}




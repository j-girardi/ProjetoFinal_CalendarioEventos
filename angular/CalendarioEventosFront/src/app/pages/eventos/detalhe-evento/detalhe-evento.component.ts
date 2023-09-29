import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento/evento';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.scss']
})
export class DetalheEventoComponent implements OnInit{
  evento!: Evento;
  usuario!: Usuario;
  categorias!: string;
  
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsEventosService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const eventoId = params['id'];
      this.requestService.getEvento(eventoId)
        .subscribe(response => {
          this.evento = response;
          console.log(this.evento);
          this.categorias = this.evento.tipos_evento.map(item => item.nome).join(', ')
          console.log(this.categorias)
      }),
      (error: any) => {
        console.log('Error', error);
      }
    })
  }

  getGoogleMapsLink(cep: string): string {
    const formattedCep = cep.replace(/\s+/g, '+');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedCep}`;
    return googleMapsUrl;
  }

}


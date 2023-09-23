import { Component, Input, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RequestsApiService } from 'src/app/services/eventos-api/requests-api.service';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.scss']
})
export class DetalheEventoComponent implements OnInit{
  evento: any;
  usuario!: Usuario;
  
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsApiService,
    // public bsModalRef: BsModalRef,
    // private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const eventoId = params['id'];
      this.requestService.getEvento(eventoId)
        .subscribe(response => {
          this.evento = response;
          console.log(this.evento);
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


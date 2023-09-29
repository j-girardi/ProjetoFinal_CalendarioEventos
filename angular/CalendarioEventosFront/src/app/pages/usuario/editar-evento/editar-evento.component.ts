import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { HttpClient, } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Evento } from 'src/app/models/evento/evento';
import { TipoEvento } from 'src/app/models/evento/tipo-evento';
@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {
  evento!: Evento;
  selectedImage!: any;
  imagePreviewUrl: any;
  url!: any
  categorias: TipoEvento[] = []
  generos: any[] = []
  dataMinima = new Date().toISOString().split('T')[0];
  selectedTiposEventos: any[] = [];
  FormEvento: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private requestService: RequestsEventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.FormEvento = formBuilder.group({
      // tipos_evento: ['', Validators.required],
      nome: [this.evento?.nome, Validators.required],
      data: [this.evento?.data, Validators.required],
      tipos_evento: [this.evento?.tipos_evento, Validators.required],
      descricao: [this.evento?.descricao, Validators.required],
      valor_entrada: [this.evento?.valor_entrada, Validators.required],
      cep: [this.evento?.cep, Validators.required],
      rua: [this.evento?.rua, Validators.required],
      numero: [this.evento?.numero, Validators.required],
      bairro: [this.evento?.bairro, Validators.required],
      cidade: [this.evento?.cidade, Validators.required],
      publico_alvo: ['']
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const eventoId = params['id'];
      this.requestService.getEvento(eventoId)
        .subscribe(data => {
          this.evento = data;
          this.selectedImage = this?.evento.banner
          this.imagePreviewUrl = this?.evento.banner
          this.initializeForms();
        })
    })

    this.requestService.getCategorias()
      .subscribe(data => {
        this.categorias = data
      })

    this.FormEvento.get('cep')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.buscarCep(val)
    })
  }

  initializeForms() {
    this.FormEvento.patchValue({
      nome: this.evento.nome,
      data: this.evento.data,
      cep: this.evento.cep,
      rua: this.evento.rua,
      numero: this.evento.numero,
      bairro: this.evento.bairro,
      cidade: this.evento.cidade,
      publico_alvo: this.evento.publico_alvo,
      tipos_evento: this.evento.tipos_evento,
      valor_entrada: this.evento.valor_entrada,
      descricao: this.evento.descricao,
    })
  }

  onFileSelected(event: NgxDropzoneChangeEvent) {
    if (event && event.addedFiles && event.addedFiles.length > 0) {
      const file: File = event.addedFiles[0] as File;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedImage = file;
        this.imagePreviewUrl = reader.result as string;
      };
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreviewUrl = null;
  }

  editEvento() {
    if (this.FormEvento.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('tipos_evento', JSON.stringify(this.FormEvento.value.tipos_evento.map((it: TipoEvento) => it.id)));
      formData.append('nome', this.FormEvento.value.nome);
      formData.append('data', this.FormEvento.value.data);
      formData.append('publico_alvo', this.FormEvento.value.publico_alvo);
      formData.append('descricao', this.FormEvento.value.descricao);
      formData.append('valor_entrada', this.FormEvento.value.valor_entrada);
      formData.append('cep', this.FormEvento.value.cep);
      formData.append('rua', this.FormEvento.value.rua);
      formData.append('numero', this.FormEvento.value.numero);
      formData.append('bairro', this.FormEvento.value.bairro);
      formData.append('cidade', this.FormEvento.value.cidade);
      if (this.selectedImage?.name) {
        formData.append('banner', this.selectedImage, this.selectedImage.name)
      };
      this.requestService.putEvento(formData, this.evento.id).subscribe(
        (response) => {
          alert('Evento editado com sucesso:');
          this.router.navigate(['usuario/eventos'])
        },
        (error) => {
          alert('Erro ao editar o evento:');
        }
      );
    } else {
      alert('Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.');
      this.FormEvento.markAllAsTouched()
    }
  }

  eventoContemTipoEvento(tipo: any): boolean {
    if (this.evento && this.evento.tipos_evento) {
      return this.evento.tipos_evento.some((eventoTipo: { id: any; }) => eventoTipo.id === tipo.id);
    } else {
      return false;
    }
  }


  buscarCep(cep: string) {
    this.url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.httpClient.get<any>(this.url).subscribe(
      (dados: { logradouro: any; localidade: any; bairro: any; }) => {
        this.FormEvento.patchValue({
          rua: dados.logradouro,
          cidade: dados.localidade,
          bairro: dados.bairro,
        })
      })
  }

  mascaraMoeda(e: any) {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    const length = value.length;
    let text: any = [];

    if (length > 2) {
      const partInteira = value.substring(0, length - 2);
      const partDecimal = value.substring(length - 2);

      text = partInteira.split('').reverse().map((char: any, index: any) => {
        if (index > 0 && index % 3 === 0) {
          return char + '.';
        }
        return char;
      }).reverse();

      text = text.join('') + '.' + partDecimal;
    } else {
      text = value;
    }
    this.FormEvento.patchValue({
      valor_entrada: text
    });
  }
}

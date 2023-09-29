import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileInputValidators, FileInputValue, DropzoneComponent } from '@ngx-dropzone/cdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TipoEvento } from 'src/app/models/evento/tipo-evento';

@Component({
  selector: 'app-novo-evento',
  templateUrl: './novo-evento.component.html',
  styleUrls: ['./novo-evento.component.scss']
})
export class NovoEventoComponent implements OnInit{
  FormEvento!: FormGroup;
  selectedFile!: any;
  imagePreviewUrl: any;
  url!: any
  id: any = localStorage.getItem('user_PK');
  categorias: TipoEvento[] = []
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private requestService: RequestsEventosService,
    private router: Router

  ) { }

  ngOnInit() {
    this.FormEvento = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1)]],
      data: ['', Validators.required],
      tipos_selecionados: ['', Validators.required],
      descricao: ['', Validators.required],
      valor_entrada: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      publico_alvo: [''],
    });

    this.requestService.getCategorias()
      .subscribe(data => {
        this.categorias = data
        console.log(this.categorias)
      })

    this.FormEvento.get('cep')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.buscarCep(val)
    })

  }

  onFileSelected(event: any) {
    if (event && event.addedFiles && event.addedFiles.length > 0) {
      const file: File = event.addedFiles[0] as File;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedFile = file;
        this.imagePreviewUrl = reader.result as string;
      };
    }
  }

  removeImage() {
    this.selectedFile = null; // Limpa a variável que guarda a imagem selecionada
    this.imagePreviewUrl = null
  }

  createEvento() {
    if (this.FormEvento.valid && this.selectedFile) {
      const id: any = parseInt(this.id)
      const formData = new FormData();
      formData.append('usuario', id);
      formData.append('nome', this.FormEvento.value.nome);
      formData.append('data', this.FormEvento.value.data);
      formData.append('cep', this.FormEvento.value.cep);
      formData.append('rua', this.FormEvento.value.rua);
      const num: any = parseInt(this.FormEvento.value.numero)
      formData.append('numero', num);
      formData.append('bairro', this.FormEvento.value.bairro);
      formData.append('cidade', this.FormEvento.value.cidade);
      if (this.FormEvento.value.publico_alvo == '') {
        formData.append('publico_alvo', 'Todos os públicos');
      } else { 
        formData.append('publico_alvo', this.FormEvento.value.publico_alvo);
      }
 
      formData.append('tipos_evento', JSON.stringify(this.FormEvento.value.tipos_selecionados.map((it: TipoEvento) => it.id)));
      formData.append('valor_entrada', this.FormEvento.value.valor_entrada);
      formData.append('descricao', this.FormEvento.value.descricao);
      formData.append('banner', this.selectedFile, this.selectedFile.name);

      this.requestService.postEvento(formData).subscribe(
        (response) => {
          console.log('Evento criado:', response);
          alert('Evento criado: ' + response.nome)
          this.FormEvento.reset();
          this.selectedFile = null; // Limpa a imagem selecionada
          this.router.navigate(['usuario/eventos'])
        },
        (error) => {
          formData.forEach( (val) =>{
            console.log(val)}
          )
          alert('Erro ao criar evento, tente novamente');
        }
      );
    } else {
      alert('Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.');
      this.FormEvento.markAllAsTouched()
    }
  }


  buscarCep(cep: string) {
    this.url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.httpClient.get<any>(this.url).subscribe(
      (dados) => {
        this.FormEvento.patchValue({
          rua: dados.logradouro,
          cidade: dados.localidade,
          bairro: dados.bairro
        })
      })
  }
}

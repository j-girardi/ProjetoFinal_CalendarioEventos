import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInputValidators, FileInputValue, DropzoneComponent } from '@ngx-dropzone/cdk';
import { RequestsApiService } from 'src/app/services/eventos-api/requests-api.service';

@Component({
  selector: 'app-detalhe-perfil',
  templateUrl: './detalhe-perfil.component.html',
  styleUrls: ['./detalhe-perfil.component.scss']
})
export class DetalhePerfilComponent implements OnInit{
  usuario: any;
  usuarioForm!: FormGroup
  editar: boolean = false
  selectedImage!: any;
  imagePreviewUrl: any;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsApiService,
    private formBuilder: FormBuilder

  ) { }


  validators = [FileInputValidators.accept("image/*")];
  profileImg = new FormControl<FileInputValue>(null, this.validators);
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const usuarioId = params['id'];
      this.requestService.getUsuario(parseInt(usuarioId!))
        .subscribe(data => {
          this.usuario = data;
          this.selectedImage = this.usuario.foto_perfil
          this.imagePreviewUrl = this.usuario.foto_perfil
          this.initializeForms();
        });
    });
  }

  initializeForms() {
    this.usuarioForm = this.formBuilder.group({
      username: [this.usuario.username, Validators.required],
      first_name: [this.usuario.first_name, Validators.required],
      last_name: [this.usuario.last_name, Validators.required],
      email: [this.usuario.email, Validators.required],
      telefone: [this.usuario.telefone, Validators.required],
      foto_perfil: []
    })

  }

  editarInfo() {
    this.editar = !this.editar
  }
  fecharEditar() {
    this.editar = !this.editar
    location.reload();
  }

  salvarInfo() {
    if (this.usuarioForm.valid) {
      const formData = new FormData();
      formData.append('username', this.usuarioForm.value.username);
      formData.append('first_name', this.usuarioForm.value.first_name);
      formData.append('last_name', this.usuarioForm.value.last_name);
      formData.append('email', this.usuarioForm.value.email);
      formData.append('telefone', this.usuarioForm.value.telefone);
      if (this.selectedImage?.name) {
        formData.append('foto_perfil', this.selectedImage, this.selectedImage.name)
      };
      console.log(formData.getAll('username'))
      console.log(formData.getAll('foto_perfil'))
      this.requestService.putUsuario(formData, this.usuario.id).subscribe(
        (response) => {
          console.log('Informações editadas com sucesso:', response);
          this.editar = false
        },
        (error) => {
          console.log('Erro ao editar o evento:', error);
          location.reload();        }
          );
    } else {
      alert('Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.');
      this.usuarioForm.markAllAsTouched(),
      this.usuarioForm.markAllAsTouched()
    }
  }

  onFileSelected(event: any) {
    if (event && event.addedFiles && event.addedFiles.length > 0) {
      const file: File = event.addedFiles[0] as File;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedImage = file;
        this.imagePreviewUrl = reader.result as string; // Armazene o URL de dados
      };
    }
  }

  removeImage() {
    this.usuarioForm.get('foto')?.setValue(null); // Limpa o controle do formulário
    this.selectedImage = null; // Limpa a variável que guarda a imagem selecionada
    this.imagePreviewUrl = null
  }
}

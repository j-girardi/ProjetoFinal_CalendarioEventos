import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileInputValidators, FileInputValue } from '@ngx-dropzone/cdk';
import { RequestsUsuariosService } from 'src/app/services/requests-usuarios/requests-usuarios.service';

@Component({
  selector: 'app-detalhe-perfil',
  templateUrl: './detalhe-perfil.component.html',
  styleUrls: ['./detalhe-perfil.component.scss']
})
export class DetalhePerfilComponent implements OnInit {
  usuario: any;
  usuarioForm!: FormGroup
  edit: boolean = false
  selectedImage!: any;
  imagePreview: any;

  constructor(
    private route: ActivatedRoute,
    private requestsUsuarioService: RequestsUsuariosService,
    private formBuilder: FormBuilder

  ) { }


  validators = [FileInputValidators.accept("image/*")];
  profileImg = new FormControl<FileInputValue>(null, this.validators);

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const usuarioId = params['id'];
      this.requestsUsuarioService.getUsuario(parseInt(usuarioId!))
        .subscribe((data: any) => {
          this.usuario = data;
          this.selectedImage = this.usuario.foto_perfil
          this.imagePreview = this.usuario.foto_perfil
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
      foto_perfil: [this.usuario.foto_perfil]
    })

  }

  editInfo() {
    this.edit = !this.edit
  }
  stopEdit() {
    this.edit = !this.edit
  }

  saveEdit() {
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
      this.requestsUsuarioService.putUsuario(formData, this.usuario.id).subscribe(
        (response) => {
          alert('Informações editadas com sucesso:');
          this.edit = false
        },
        (error) => {
          alert('Erro ao editar');
          console.log('Erro ao editar:', error);
          location.reload();
        }
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
        this.imagePreview = reader.result as string;
      };
    }
  }

  removeImage() {
    this.usuarioForm.get('foto')?.setValue(null);
    this.selectedImage = null;
    this.imagePreview = null
  }
}

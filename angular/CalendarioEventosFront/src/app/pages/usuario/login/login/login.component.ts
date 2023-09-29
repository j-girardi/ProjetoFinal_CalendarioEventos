import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { RequestsEventosService } from 'src/app/services/eventos-api/requests-eventos-api.service';
import { RequestsUsuariosService } from 'src/app/services/requests-usuarios/requests-usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private requestsUsuarioService: RequestsUsuariosService,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.requestsUsuarioService.login(formData).pipe(
      catchError(() => {
        alert('Dados invalidos!');
        return throwError('Erro ocorreu');
      })
    ).subscribe(
      (response: { access: string; refresh: string; user: { pk: string; }; }) => {
        if (response.access && response.refresh) {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          localStorage.setItem('user_PK', response.user.pk)
          this.formGroup.reset()
          this.router.navigate(['usuario/eventos'])
        }
        else {
          alert('Login inválido. Verifique se todos os campos estão preenchidos corretamente.');
          this.formGroup.markAllAsTouched()
        }
      })
  }


  togglePasswordVisibility() {
    if (this.showPassword) { this.showPassword = false }
    else {
      this.showPassword = true
    }
  }
}

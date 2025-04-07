import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


//DULCE
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // DULCE
import { CommonModule } from '@angular/common';

//
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

//DEBO DE ADAPTARLO AL LOGIN ADEMÁS DE ESTUADIARLO
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Llamamos al servicio de login, enviando los datos del formulario
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          // Guardamos el token en el localStorage
          this.authService.saveToken(response.token);
          // Redirigimos al usuario al dashboard o a la página principal
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error en login', error);
          alert('Login fallido: Verifica tus credenciales');
        }
      );
    } else {
      alert('Por favor, ingrese correo y contraseña.');
    }
  }
}
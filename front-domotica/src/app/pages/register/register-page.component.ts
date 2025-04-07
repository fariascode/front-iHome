import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';//DULCE
import { AuthService } from '../../services/auth.service';//DULCE
import { Router } from '@angular/router';//DULCE
import { CommonModule } from '@angular/common';//DULCE


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,//DULCE
    CommonModule,//DULCE
    FormsModule,//DULCE
    ReactiveFormsModule//DULCE
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})

export class RegisterPageComponent {
  //DULCE
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
});

constructor(private authService: AuthService, private router: Router) {}

register() {
    if (this.registerForm.valid) {
        this.authService.register(this.registerForm.value).subscribe(
            response => {
                console.log('Registro exitoso:', response);
                this.router.navigate(['/login']); // Redirige al login después del registro
            },
            error => {
                console.error('Error en el registro:', error);
            }
        );
    } else {
        console.log('Formulario inválido');
    }
}
//
}
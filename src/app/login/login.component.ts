import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (this.authService.login(email, password)) {
        if (this.authService.loggedUser.getValue()?.rol === 'Administrador') {
          this.router.navigate(['/admin']);
        } else if (this.authService.loggedUser.getValue()?.rol === 'Paciente') {
          this.router.navigate(['/patient']);
        } else {
          alert('Proximamente');
        }
      } else {
        alert('Credenciales inválidas');
      }
    }
  }
}

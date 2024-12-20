import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
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

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Si el login se realiza con éxito redirigimos a los usuarios a su página inicial de acuerdo con su rol
      if (this.authService.login(email, password)) {
        alert('Ha iniciado sesión correctamente...');
        if (this.authService.loggedUser.getValue()?.rol === 'Administrador') {
          this.router.navigate(['/admin']);
          return;
        }
        if (this.authService.loggedUser.getValue()?.rol === 'Paciente') {
          this.router.navigate(['/patient']);
          return;
        }
        if (this.authService.loggedUser.getValue()?.rol === 'Doctor') {
          this.router.navigate(['/doctor']);
          return;
        }
        // Si el usuario posee un rol no contemplado en el sistema lo redirigimos a nuestra página 404
        this.router.navigate(['/not-found']);
      } else {
        alert('Credenciales inválidas');
      }
    }
  }
}

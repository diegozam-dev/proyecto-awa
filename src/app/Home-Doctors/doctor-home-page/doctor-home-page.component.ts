import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-doctor-home-page',
    templateUrl: './doctor-home-page.component.html',
    styleUrls: ['./doctor-home-page.component.css'],
    standalone: false
})
export class DoctorHomePageComponent {
  constructor(private authService: AuthService, private router: Router) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/login']).then(() => {
        alert('No ha iniciado sesión.');
      });
    }
  }

  async goToHistoriaClinicaYSeguimiento() {
    await this.router.navigate(['/historia-clinica-seguimiento']);
  }

  async goToRecordatoriosTratamientos() {
    await this.router.navigate(['/recordatorios-tratamientos']);
  }

}
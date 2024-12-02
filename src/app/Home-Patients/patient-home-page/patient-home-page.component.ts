import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-patient-home-page',
    templateUrl: './patient-home-page.component.html',
    styleUrls: ['./patient-home-page.component.css'],
    standalone: false
})
export class PatientHomePageComponent {
  constructor(private authService: AuthService, private router: Router) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/login']).then(() => {
        alert('No ha iniciado sesión.');
      });
    }
  }

  async goToGenerateAppointment() {
    await this.router.navigate(['/patient/generate-appointment']);
  }

  async goToConsultAppointment() {
    await this.router.navigate(['/patient/consult-appointment']);
  }

  async goToHistoriaClinicaYSeguimiento() {
    await this.router.navigate(['/historia-clinica-seguimiento']);
  }

  async goToRecordatoriosTratamientos() {
    await this.router.navigate(['/recordatorios-tratamientos']);
  }

}
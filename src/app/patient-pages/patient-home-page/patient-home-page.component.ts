import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrl: './patient-home-page.component.css',
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
}

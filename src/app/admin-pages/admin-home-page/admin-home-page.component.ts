import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css',
})
export class AdminHomePageComponent {
  constructor(private authService: AuthService, private router: Router) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/login']).then(() => {
        alert('No ha iniciado sesión.');
      });
    }
  }

  goToManagePatients() {
    this.router.navigate(['/admin/manage-patients']);
  }

  goToManageDoctors() {
    this.router.navigate(['/admin/manage-doctors']);
  }

  goToManageAdmins() {
    this.router.navigate(['/admin/manage-admins']);
  }
}

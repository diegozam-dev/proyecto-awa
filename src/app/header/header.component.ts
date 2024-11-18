import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'MediSchedule';
  userEmail = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loggedUser.subscribe((user) => {
      this.userEmail = user?.email as string;
    });
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async goToLogin() {
    await this.router.navigate(['/login']);
  }

  async goToRegister() {
    await this.router.navigate(['/register']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  async logout() {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }
}

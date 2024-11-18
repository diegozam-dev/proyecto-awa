import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'MediSchedule';
  userEmail = '';
  currentUrl = signal('/');
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loggedUser.subscribe((user) => {
      this.userEmail = user?.email as string;
    });

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        this.currentUrl.set(event.url);
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.menuOpen = false;
  }

  async goToLogin() {
    await this.router.navigate(['/login']);
    this.menuOpen = false;
  }

  async goToRegister() {
    await this.router.navigate(['/register']);
    this.menuOpen = false;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  async logout() {
    this.authService.logout();
    await this.router.navigate(['/login']);
    this.menuOpen = false;
  }
}

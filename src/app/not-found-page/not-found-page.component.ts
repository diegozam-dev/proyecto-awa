import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrl: './not-found-page.component.css',
    standalone: false
})
export class NotFoundPageComponent {
  goToHome() {
    window.location.href = '/';
  }
}

// src/app/recordatorios-tratamientos/recordatorios-tratamientos.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';

interface Notification {
  id: number;
  message: string;
}

@Component({
  selector: 'app-recordatorios-tratamientos',
  templateUrl: './recordatorios-tratamientos.component.html',
  styleUrls: ['./recordatorios-tratamientos.component.css'],
  standalone: false
})
export class RecordatoriosTratamientosComponent implements OnInit {
  selectedTabIndex: number = 0;
  notifications: Notification[] = [
    { id: 1, message: 'Notificación 1' },
    { id: 2, message: 'Notificación 2' }
  ];
  loggedUser: IUser | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }

      if (this.isDoctor()) {
        this.selectedTabIndex = 1;
      }
    });
  }

  goBack() {
    if (this.loggedUser?.rol === 'doctor') {
      this.router.navigate(['/doctor']);
    } else {
      this.router.navigate(['/patient']);
    }
  }

  isDoctor(): boolean {
    return this.loggedUser?.rol === 'Doctor';
  }

  get notificationCount(): number {
    return this.notifications.length;
  }

  addNotification() {
    const newId = Math.max(...this.notifications.map(n => n.id), 0) + 1;
    this.notifications.push({ id: newId, message: `Nueva notificación ${newId}` });
  }
}
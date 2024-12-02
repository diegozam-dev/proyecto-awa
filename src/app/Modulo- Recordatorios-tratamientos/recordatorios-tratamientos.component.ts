import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';

// Definición de la estructura de una notificación
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
  // Índice de la pestaña seleccionada (0 para recordatorios, 1 para tratamientos)
  selectedTabIndex = 0;

  // Lista de notificaciones disponibles en el componente
  notifications: Notification[] = [];

  // Usuario autenticado actualmente
  loggedUser: IUser | null = null;

  /**
   * Constructor del componente
   * @param authService Servicio para manejar la autenticación
   * @param router Servicio para manejar la navegación entre rutas
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al usuario autenticado y configura el comportamiento inicial.
   */
  ngOnInit(): void {
    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user; // Actualiza el usuario autenticado
      user ? this.handleUserLogin(user) : this.redirectToLogin();
    });
  }

  /**
   * Configura el comportamiento inicial dependiendo del usuario autenticado.
   * @param user El usuario autenticado
   */
  private handleUserLogin(user: IUser): void {
    // Si el usuario es doctor, selecciona la pestaña de tratamientos
    this.selectedTabIndex = user.rol === 'Doctor' ? 1 : 0;
  }

  /**
   * Redirige al usuario a la página de inicio de sesión si no está autenticado.
   */
  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navega hacia la página correspondiente según el rol del usuario.
   */
  goBack(): void {
    const route = this.loggedUser?.rol === 'doctor' ? '/doctor' : '/patient';
    this.router.navigate([route]);
  }

  /**
   * Verifica si el usuario autenticado tiene el rol de doctor.
   * @returns `true` si el usuario es doctor, de lo contrario `false`.
   */
  isDoctor(): boolean {
    return this.loggedUser?.rol?.toLowerCase() === 'doctor';
  }

  /**
   * Obtiene el número total de notificaciones.
   * @returns El conteo de notificaciones disponibles.
   */
  get notificationCount(): number {
    return this.notifications.length;
  }

  /**
   * Agrega una nueva notificación a la lista de notificaciones.
   * Genera un ID único basado en los IDs existentes.
   */
  addNotification(): void {
    const newId = this.notifications.length > 0 
      ? Math.max(...this.notifications.map(n => n.id)) + 1 
      : 1; // Si la lista está vacía, comienza desde 1
    this.notifications.push({ id: newId, message: `Nueva notificación ${newId}` });
  }
}

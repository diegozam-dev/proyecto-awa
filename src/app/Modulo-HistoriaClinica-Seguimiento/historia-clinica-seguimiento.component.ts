import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { USERS_DATA } from '../data/users.data';
import { IUser } from '../interfaces/user.interface';

@Component({
    selector: 'app-historia-clinica-seguimiento',
    templateUrl: './historia-clinica-seguimiento.component.html',
    styleUrls: ['./historia-clinica-seguimiento.component.css'],
    standalone: false
})
export class HistoriaClinicaSeguimientoComponent implements OnInit {
  // Almacena la lista de usuarios cargados del sistema
  usuarios: IUser[] = [];
  // Usuario autenticado
  usuario: IUser | null = null;
  // Indicadores de rol del usuario autenticado
  esPaciente: boolean = false;
  esDoctor: boolean = false;

  // Campo de búsqueda por cédula
  ciBusqueda: string = '';
  // Valida si la cédula ingresada es válida
  ciValida: boolean = false;
  // Paciente seleccionado tras la búsqueda
  pacienteSeleccionado: IUser | null = null;

  constructor(private authService: AuthService) {}

  /**
   * Método de inicialización del componente.
   * Se suscribe a los observables de usuarios y del usuario autenticado.
   */
  ngOnInit(): void {
    // Cargar lista de usuarios reactiva
    USERS_DATA.subscribe((data) => {
      this.usuarios = data;
    });

    // Cargar el usuario autenticado y determinar roles
    this.authService.loggedUser.subscribe((user) => {
      this.usuario = user;
      this.esPaciente = user?.rol === 'Paciente';
      this.esDoctor = user?.rol === 'Doctor';
    });
  }

  /**
   * Valida si la cédula ingresada cumple con el formato esperado (10 dígitos numéricos).
   */
  validarCI(): void {
    this.ciValida = /^\d{10}$/.test(this.ciBusqueda);
  }

  /**
   * Busca un paciente en la lista de usuarios según la cédula ingresada.
   * Si se encuentra, se selecciona; de lo contrario, se muestra un mensaje de error.
   */
  buscarPaciente(): void {
    this.validarCI(); // Valida la cédula antes de buscar

    if (!this.ciValida) {
      alert('Cédula inválida. Debe tener 10 dígitos numéricos.');
      return;
    }

    // Busca un usuario con rol "Paciente" y cédula coincidente
    const paciente = this.usuarios.find(
      (user) => user.ci === this.ciBusqueda && user.rol === 'Paciente'
    );

    if (paciente) {
      this.pacienteSeleccionado = paciente;
      alert(`Paciente encontrado: ${paciente.firstName} ${paciente.lastName}`);
    } else {
      this.pacienteSeleccionado = null;
      alert('Paciente no encontrado.');
    }
  }

  /**
   * Reinicia los campos de búsqueda y selección de pacientes.
   */
  resetBusqueda(): void {
    this.ciBusqueda = '';
    this.ciValida = false;
    this.pacienteSeleccionado = null;
  }

  regresarBusqueda(): void {
    this.pacienteSeleccionado = null;  // Esto deselecciona al paciente y muestra el formulario de búsqueda
  }
}

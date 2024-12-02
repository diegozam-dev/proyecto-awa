import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecordatorioTratamientoService, Tratamiento } from '../../services/recordatorio-tratamiento.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { TratamientoDialogComponent } from '../tratamiento-dialog/tratamiento-dialog.component';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css'],
  standalone: false
})
export class TratamientosComponent implements OnInit {
  tratamientos: Tratamiento[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'dosis', 'frecuencia'];
  loggedUser: IUser | null = null;
  tratamientoForm: FormGroup;

  /**
   * Constructor del componente
   * @param recordatorioTratamientoService Servicio para gestionar tratamientos
   * @param authService Servicio para gestionar la autenticación
   * @param fb FormBuilder para crear formularios reactivos
   * @param dialog Servicio para abrir diálogos modales
   */
  constructor(
    private recordatorioTratamientoService: RecordatorioTratamientoService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    // Inicialización del formulario reactivo con validaciones
    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      detalles: ['', Validators.required],
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga los tratamientos y la información del usuario autenticado.
   */
  ngOnInit(): void {
    this.subscribeToTratamientos();
    this.subscribeToUser();
  }

  /**
   * Suscribe a los tratamientos desde el servicio.
   */
  private subscribeToTratamientos(): void {
    this.recordatorioTratamientoService.tratamientos$.subscribe(tratamientos => {
      this.tratamientos = tratamientos;
    });
  }

  /**
   * Suscribe al usuario autenticado desde el servicio de autenticación.
   */
  private subscribeToUser(): void {
    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  /**
   * Agrega un tratamiento a la lista de tratamientos.
   * Solo se permite si el formulario es válido.
   */
  addTratamiento(): void {
    if (this.tratamientoForm.valid) {
      this.recordatorioTratamientoService.addTratamiento(this.tratamientoForm.value);
      this.tratamientoForm.reset();
    }
  }

  /**
   * Abre un diálogo para editar un tratamiento existente.
   * @param tratamiento Tratamiento a editar
   */
  editTratamiento(tratamiento: Tratamiento): void {
    const dialogRef = this.dialog.open(TratamientoDialogComponent, {
      width: '250px',
      data: { ...tratamiento },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recordatorioTratamientoService.updateTratamiento(tratamiento.id, result);
      }
    });
  }

  /**
   * Elimina un tratamiento por su ID después de confirmar la acción.
   * @param id ID del tratamiento a eliminar
   */
  deleteTratamiento(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este tratamiento?')) {
      this.recordatorioTratamientoService.deleteTratamiento(id);
    }
  }

  /**
   * Verifica si el usuario autenticado tiene el rol de doctor.
   * @returns `true` si el usuario es doctor, de lo contrario `false`.
   */
  isDoctor(): boolean {
    return this.loggedUser?.rol === 'Doctor';
  }
}

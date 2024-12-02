import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguimientosDialogComponent } from '../seguimientos-dialog/seguimientos-dialog.component';
import { SeguimientosService } from '../../services/seguimiento.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-seguimientos',
    templateUrl: './seguimientos.component.html',
    styleUrls: ['./seguimientos.component.css'],
    standalone: false
})
export class SeguimientosComponent implements OnInit {
  esDoctor: boolean = false; // Indica si el usuario actual es un doctor
  seguimientos: any[] = []; // Lista de seguimientos

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private seguimientosService: SeguimientosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verificarRolUsuario(); // Verifica el rol del usuario
    this.cargarSeguimientos(); // Carga los seguimientos
  }

  // Verifica si el usuario tiene rol de doctor
  verificarRolUsuario() {
    const usuario = this.authService.loggedUser.getValue();
    this.esDoctor = usuario?.rol === 'Doctor';
  }

  // Carga la lista de seguimientos
  cargarSeguimientos() {
    this.seguimientos = this.seguimientosService.obtenerSeguimientos();
  }

  // Calcula el progreso promedio de los seguimientos
  obtenerProgresoTotal(): number {
    if (this.seguimientos.length === 0) return 0;
    const progresoTotal = this.seguimientos.reduce((sum, item) => sum + item.progreso, 0);
    return Math.round(progresoTotal / this.seguimientos.length);
  }

  // Abre el diálogo para agregar, editar o ver detalles de un seguimiento
  abrirDialogo(modo: 'detalles' | 'editar' | 'agregar', seguimiento?: any) {
    const dialogRef = this.dialog.open(SeguimientosDialogComponent, {
      width: '500px',
      data: {...seguimiento,modo}
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (modo === 'agregar') {
          this.agregarSeguimiento(resultado);
        } else if (modo === 'editar') {
          this.editarSeguimiento(seguimiento.id, resultado);
        }
      }
    });
  }

  // Agrega un nuevo seguimiento
  agregarSeguimiento(seguimiento: any) {
    seguimiento.id = this.seguimientosService.generarId(); // Genera un ID único
    this.seguimientosService.agregarSeguimiento(seguimiento); // Lo guarda en el servicio
    this.cargarSeguimientos(); // Recarga la lista
    this.mostrarMensaje('Nota agregada exitosamente');
  }

  // Edita un seguimiento existente
  editarSeguimiento(id: number, datosActualizados: any) {
    this.seguimientosService.editarSeguimiento(id, datosActualizados); // Actualiza el seguimiento
    this.cargarSeguimientos(); // Recarga la lista
    this.mostrarMensaje('Nota actualizada exitosamente');
  }

  // Elimina un seguimiento
  eliminarSeguimiento(id: number) {
    this.seguimientosService.eliminarSeguimiento(id); // Elimina el seguimiento
    this.cargarSeguimientos(); // Recarga la lista
    this.mostrarMensaje('Nota eliminada exitosamente');
  }

  // Muestra un mensaje con el snackBar
  mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }
}

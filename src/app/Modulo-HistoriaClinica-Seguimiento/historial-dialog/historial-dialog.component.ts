import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-historial-dialog',
    templateUrl: './historial-dialog.component.html',
    styleUrls: ['./historial-dialog.component.css'],
    standalone: false
})
export class HistorialDialogComponent {
  // Formulario reactivo para datos del historial
  formularioHistorial: FormGroup;
  // Modo del diálogo: 'detalles', 'editar' o 'agregar'
  modo: 'detalles' | 'editar' | 'agregar';

  constructor(
    private dialogRef: MatDialogRef<HistorialDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos recibidos al abrir el diálogo
  ) {
    // Establece el modo del diálogo
    this.modo = data?.modo || 'detalles';

    // Inicializa el formulario con validaciones
    this.formularioHistorial = this.fb.group({
      fecha: [data?.fecha || '', Validators.required],
      especialidad: [data?.especialidad || '', Validators.required], 
      diagnostico: [data?.diagnostico || '', [Validators.required, Validators.maxLength(500)]],
      tratamiento: [data?.tratamiento || '', Validators.maxLength(500)], 
      examenes: [data?.examenes || '', Validators.maxLength(500)] 
    });
  }

  // Guarda los datos y muestra un mensaje de éxito
  guardar(): void {
    if (this.formularioHistorial.valid) {
      this.dialogRef.close(this.formularioHistorial.value); // Envía los datos al componente padre
      this.mostrarMensaje('Historial guardado exitosamente');
    } else {
      this.mostrarMensaje('Por favor, complete los campos obligatorios');
    }
  }

  // Cancela la operación y muestra un mensaje
  cancelar(): void {
    this.dialogRef.close(null); // Cierra el diálogo sin cambios
    this.mostrarMensaje('Operación cancelada');
  }

  // Muestra un mensaje usando MatSnackBar
  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }
}

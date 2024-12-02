import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-seguimientos-dialog',
    templateUrl: './seguimientos-dialog.component.html',
    styleUrls: ['./seguimientos-dialog.component.css'],
    standalone: false
})
export class SeguimientosDialogComponent {
  // Formulario reactivo para gestionar los datos del seguimiento
  formularioSeguimiento: FormGroup;
  // Modo de operación: 'detalles', 'editar' o 'agregar'
  modo: 'detalles' | 'editar' | 'agregar';

  constructor(
    private dialogRef: MatDialogRef<SeguimientosDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Establece el modo y valores iniciales
    this.modo = data?.modo || 'detalles';

    // Configura el formulario con validaciones básicas
    this.formularioSeguimiento = this.fb.group({
      fecha: [data?.fecha || '', Validators.required],
      nota: [data?.nota || '', [Validators.required, Validators.maxLength(500)]],
      progreso: [data?.progreso || 0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  // Guarda los datos del formulario y cierra el diálogo
  guardar(): void {
    if (this.formularioSeguimiento.valid) {
      this.dialogRef.close(this.formularioSeguimiento.value);
    } else {
      alert('Complete todos los campos correctamente.');
    }
  }

  // Cancela la operación y cierra el diálogo
  cancelar(): void {
    this.dialogRef.close(null);
  }
}

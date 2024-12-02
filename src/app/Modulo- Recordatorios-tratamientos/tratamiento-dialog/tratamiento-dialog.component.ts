import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tratamiento } from '../../services/recordatorio-tratamiento.service';

@Component({
  selector: 'app-edit-tratamiento-dialog',
  templateUrl: './tratamiento-dialog.component.html',
  styleUrls: ['./tratamiento-dialog.component.css'],
  standalone: false
})
export class TratamientoDialogComponent {
  editForm: FormGroup;

  /**
   * Constructor del componente de diálogo de tratamiento.
   * Inicializa el formulario reactivo con los datos del tratamiento.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param dialogRef Referencia al diálogo para controlarlo (cerrarlo o devolver datos).
   * @param data Datos del tratamiento a editar pasados desde el componente padre.
   */
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TratamientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento
  ) {
    // Inicialización del formulario reactivo con los valores del tratamiento
    this.editForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      dosis: [data.dosis, Validators.required],
      frecuencia: [data.frecuencia, Validators.required],
      detalles: [data.detalles, Validators.required],
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario.
   * Si el formulario es válido, cierra el diálogo y retorna los datos editados.
   */
  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  /**
   * Método para cancelar la edición y cerrar el diálogo sin realizar cambios.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}

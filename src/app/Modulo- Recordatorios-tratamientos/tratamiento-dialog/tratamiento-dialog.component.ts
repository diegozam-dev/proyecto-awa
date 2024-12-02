// src/app/recordatorios-tratamientos/edit-tratamiento-dialog/edit-tratamiento-dialog.component.ts

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TratamientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento
  ) {
    this.editForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      dosis: [data.dosis, Validators.required],
      frecuencia: [data.frecuencia, Validators.required],
      detalles: [data.detalles, Validators.required]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
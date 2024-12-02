// src/app/recordatorios-tratamientos/tratamientos/tratamientos.component.ts

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

  constructor(
    private recordatorioTratamientoService: RecordatorioTratamientoService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      detalles: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.recordatorioTratamientoService.tratamientos$.subscribe(tratamientos => {
      this.tratamientos = tratamientos;
    });

    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  addTratamiento() {
    if (this.tratamientoForm.valid) {
      this.recordatorioTratamientoService.addTratamiento(this.tratamientoForm.value);
      this.tratamientoForm.reset();
    }
  }

  editTratamiento(tratamiento: Tratamiento) {
    const dialogRef = this.dialog.open(TratamientoDialogComponent, {
      width: '250px',
      data: { ...tratamiento }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recordatorioTratamientoService.updateTratamiento(tratamiento.id, result);
      }
    });
  }

  deleteTratamiento(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este tratamiento?')) {
      this.recordatorioTratamientoService.deleteTratamiento(id);
    }
  }

  isDoctor(): boolean {
    return this.loggedUser?.rol === 'Doctor';
  }
}
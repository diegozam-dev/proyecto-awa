import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { SeguimientosComponent } from './seguimientos/seguimientos.component';
import { HistorialDialogComponent} from './historial-dialog/historial-dialog.component';
import {SeguimientosDialogComponent } from './seguimientos-dialog/seguimientos-dialog.component'
import { HistoriaClinicaSeguimientoComponent } from './historia-clinica-seguimiento.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    SeguimientosComponent,
    HistorialDialogComponent,
    SeguimientosDialogComponent,
    HistoriaClinicaSeguimientoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatSliderModule,
    FormsModule
  ],
  exports: [
    HistoriaClinicaSeguimientoComponent,
    HistoriaClinicaComponent,
    SeguimientosComponent
  ]
})
export class HistoriaClinicaSeguimientoModule { }

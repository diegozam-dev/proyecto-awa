import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { RecordatoriosTratamientosComponent } from './recordatorios-tratamientos.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { TratamientoDialogComponent } from './tratamiento-dialog/tratamiento-dialog.component';
import { AuthService } from '../services/auth.service';
import { RecordatorioTratamientoService } from '../services/recordatorio-tratamiento.service';

@NgModule({
  declarations: [
    RecordatoriosTratamientosComponent,
    RecordatoriosComponent,
    TratamientosComponent,
    TratamientoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [RecordatoriosTratamientosComponent],
  providers: [AuthService, RecordatorioTratamientoService]
})
export class RecordatoriosTratamientosModule { }
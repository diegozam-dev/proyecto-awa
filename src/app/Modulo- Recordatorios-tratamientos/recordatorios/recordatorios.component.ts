// src/app/recordatorios-tratamientos/recordatorios/recordatorios.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecordatorioTratamientoService, Recordatorio } from '../../services/recordatorio-tratamiento.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css'],
  standalone: false
})
export class RecordatoriosComponent implements OnInit {
  recordatorios: Recordatorio[] = [];
  filteredRecordatorios: Recordatorio[] = [];
  recordatorioForm: FormGroup;
  loggedUser: IUser | null = null;
  selectedDate: Date = new Date();

  constructor(
    private recordatorioTratamientoService: RecordatorioTratamientoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.recordatorioForm = this.fb.group({
      texto: ['', Validators.required],
      fecha: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.recordatorioTratamientoService.recordatorios$.subscribe(recordatorios => {
      this.recordatorios = recordatorios;
      this.filterRecordatorios();
    });

    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  addRecordatorio() {
    if (this.recordatorioForm.valid) {
      this.recordatorioTratamientoService.addRecordatorio(this.recordatorioForm.value);
      this.recordatorioForm.reset({fecha: this.selectedDate});
      this.filterRecordatorios();
    }
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.filterRecordatorios();
  }

  filterRecordatorios() {
    this.filteredRecordatorios = this.recordatorios.filter(recordatorio => 
      this.isSameDay(recordatorio.fecha, this.selectedDate)
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
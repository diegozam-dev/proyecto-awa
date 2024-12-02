// src/app/services/recordatorio-tratamiento.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recordatorio {
  id: number;
  texto: string;
  fecha: Date;
}

export interface Tratamiento {
  id: number;
  nombre: string;
  dosis: string;
  frecuencia: string;
  detalles: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordatorioTratamientoService {
  private recordatoriosSubject = new BehaviorSubject<Recordatorio[]>([]);
  public recordatorios$ = this.recordatoriosSubject.asObservable();

  private tratamientosSubject = new BehaviorSubject<Tratamiento[]>([]);
  public tratamientos$ = this.tratamientosSubject.asObservable();

  constructor() {
    this.recordatoriosSubject.next([
      { id: 1, texto: 'Tomar medicamento A', fecha: new Date() },
      { id: 2, texto: 'Cita con el doctor', fecha: new Date(Date.now() + 86400000) },
    ]);

    this.tratamientosSubject.next([
      { id: 1, nombre: 'Tratamiento A', dosis: '10mg', frecuencia: 'Cada 8 horas', detalles:'Tomar durante 3 dias, si los sintomas persisten consulte a su medico de nuevo' },
      { id: 2, nombre: 'Tratamiento B', dosis: '5mg', frecuencia: 'Cada 12 horas', detalles:'Tomar durante 3 dias, si los sintomas persisten consulte a su medico de nuevo' },
    ]);
  }

  addRecordatorio(recordatorio: Omit<Recordatorio, 'id'>) {
    const currentRecordatorios = this.recordatoriosSubject.value;
    const newId = Math.max(...currentRecordatorios.map(r => r.id), 0) + 1;
    this.recordatoriosSubject.next([...currentRecordatorios, { ...recordatorio, id: newId }]);
  }

  addTratamiento(tratamiento: Omit<Tratamiento, 'id'>) {
    const currentTratamientos = this.tratamientosSubject.value;
    const newId = Math.max(...currentTratamientos.map(t => t.id), 0) + 1;
    this.tratamientosSubject.next([...currentTratamientos, { ...tratamiento, id: newId }]);
  }

  updateTratamiento(id: number, tratamiento: Partial<Tratamiento>) {
    const currentTratamientos = this.tratamientosSubject.value;
    const updatedTratamientos = currentTratamientos.map(t => 
      t.id === id ? { ...t, ...tratamiento } : t
    );
    this.tratamientosSubject.next(updatedTratamientos);
  }

  deleteTratamiento(id: number) {
    const currentTratamientos = this.tratamientosSubject.value;
    this.tratamientosSubject.next(currentTratamientos.filter(t => t.id !== id));
  }

  getRecordatoriosByDate(date: Date): Recordatorio[] {
    return this.recordatoriosSubject.value.filter(recordatorio => 
      this.isSameDay(recordatorio.fecha, date)
    );
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
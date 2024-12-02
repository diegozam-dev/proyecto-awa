import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {
  // Inicializa el historial clínico con algunos datos de ejemplo
  private historialSubject = new BehaviorSubject<any[]>([
    { id: 1, fecha: '2023-01-15', especialidad: 'Cardiología', diagnostico: 'Hipertensión', tratamiento: 'Medicación', examenes: 'Electrocardiograma' },
    { id: 2, fecha: '2023-02-20', especialidad: 'Neurología', diagnostico: 'Migraña', tratamiento: 'Reposo', examenes: 'Resonancia magnética' },
    { id: 3, fecha: '2023-01-15', especialidad: 'Traumatología', diagnostico: 'Túnel carpiano', tratamiento: 'Ejercicios', examenes: 'Electromiografía' },
    { id: 4, fecha: '2023-02-20', especialidad: 'Infectología', diagnostico: 'Influenza', tratamiento: 'Medicacion', examenes: 'Análisis de sangre' },
  ]);

  // Devuelve un Observable que emite el historial clínico
  obtenerHistorial(): Observable<any[]> {
    return this.historialSubject.asObservable();
  }

  // Actualiza un historial clínico existente
  actualizarHistorial(filaActualizada: any): void {
    const historial = [...this.historialSubject.getValue()]; // Copia del historial actual
    const index = historial.findIndex(item => item.id === filaActualizada.id);

    if (index !== -1) {
      // Actualiza el elemento correspondiente
      historial[index] = { ...filaActualizada };
      this.historialSubject.next(historial); // Emite el historial actualizado
    } else {
      alert('No se encontró el registro para actualizar en el servicio.');
    }
  }

  // Añade un nuevo historial clínico
  añadirHistorial(nuevoHistorial: any): void {
    const historial = [...this.historialSubject.getValue()]; // Copia del historial actual
    const nuevoId = this.generarId(historial);
    // Añade el nuevo historial con el ID generado
    this.historialSubject.next([...historial, { id: nuevoId, ...nuevoHistorial }]);
  }

  // Genera un nuevo ID para un historial clínico
  private generarId(historial: any[]): number {
    // Obtiene el ID más alto y le suma 1 para el nuevo registro
    return historial.length > 0 ? Math.max(...historial.map(item => item.id)) + 1 : 1;
  }
}

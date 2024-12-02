import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {
  private seguimientos: any[] = [
    { id: 1, fecha: new Date(), nota: 'Primera consulta.', progreso: 40 },
    { id: 2, fecha: new Date(), nota: 'Seguimiento intermedio.', progreso: 60 }
  ];

  // Obtiene todos los seguimientos
  obtenerSeguimientos() {
    const copiaSeguimientos = [];
    for (let i = 0; i < this.seguimientos.length; i++) {
      copiaSeguimientos.push(this.seguimientos[i]);
    }
    return copiaSeguimientos;
  }

  // Genera un nuevo ID para el seguimiento
  generarId() {
    let maxId = 0;
    for (let i = 0; i < this.seguimientos.length; i++) {
      if (this.seguimientos[i].id > maxId) {
        maxId = this.seguimientos[i].id;
      }
    }
    return maxId + 1;
  }

  // Agrega un nuevo seguimiento a la lista
  agregarSeguimiento(seguimiento: any) {
    this.seguimientos.push(seguimiento);
  }

  // Edita un seguimiento existente por ID
  editarSeguimiento(id: number, datos: any) {
    for (let i = 0; i < this.seguimientos.length; i++) {
      if (this.seguimientos[i].id === id) {
        // Actualiza los datos del seguimiento
        this.seguimientos[i].nota = datos.nota;
        this.seguimientos[i].fecha = datos.fecha;
        this.seguimientos[i].progreso = datos.progreso;
      }
    }
  }

  // Elimina un seguimiento por ID
  eliminarSeguimiento(id: number) {
    const nuevosSeguimientos = [];
    for (let i = 0; i < this.seguimientos.length; i++) {
      if (this.seguimientos[i].id !== id) {
        nuevosSeguimientos.push(this.seguimientos[i]);
      }
    }
    this.seguimientos = nuevosSeguimientos;
  }
}

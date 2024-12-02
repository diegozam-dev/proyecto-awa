import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { HistorialDialogComponent } from '../historial-dialog/historial-dialog.component';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

interface HistorialClinico {
  id: number;
  fecha: string;
  especialidad: string;
  diagnostico: string;
  tratamiento: string;
  examenes: string;
}

@Component({
    selector: 'app-historia-clinica',
    templateUrl: './historia-clinica.component.html',
    styleUrls: ['./historia-clinica.component.css'],
    standalone: false
})
export class HistoriaClinicaComponent implements OnInit {
  esDoctor: boolean = false; // Determina si el usuario es doctor
  columnasDoctor: string[] = ['id', 'fecha', 'especialidad', 'diagnostico', 'tratamiento', 'examenes', 'accion'];
  columnasPaciente: string[] = ['fecha', 'especialidad', 'diagnostico', 'tratamiento'];
  datosHistorial: HistorialClinico[] = []; // Lista de datos del historial
  displayedColumns: string[] = []; // Columnas visibles en la tabla
  dataSource: MatTableDataSource<HistorialClinico>; // Fuente de datos para la tabla
  filterValue: string = ''; // Valor del filtro para búsqueda

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar, // Servicio para mostrar notificaciones
    private authService: AuthService,
    private historialClinicoService: HistorialClinicoService
  ) {
    this.esDoctor = this.authService.loggedUser.getValue()?.rol === 'Doctor';
    this.displayedColumns = this.esDoctor ? this.columnasDoctor : this.columnasPaciente;
    this.dataSource = new MatTableDataSource<HistorialClinico>([]);
  }

  ngOnInit(): void {
    this.cargarHistorialClinico(); // Carga el historial clínico al inicializar
  }

  cargarHistorialClinico(): void {
    this.historialClinicoService.obtenerHistorial().subscribe((data) => {
      this.datosHistorial = data;
      this.dataSource.data = data;
    });
  }

  verDetalleConsulta(consulta: HistorialClinico): void {
    this.dialog.open(HistorialDialogComponent, {
      data: { ...consulta, modo: 'detalles' },
      width: '500px'
    });
  }

  agregarHistorialClinico(): void {
    const dialogRef = this.dialog.open(HistorialDialogComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.fecha = this.formatearFecha(result.fecha);
        this.historialClinicoService.añadirHistorial(result);
        this.cargarHistorialClinico();
        this.mostrarMensaje('Historial clínico agregado exitosamente');
      }
    });
  }

  actualizarHistorial(elemento: HistorialClinico): void {
    const dialogRef = this.dialog.open(HistorialDialogComponent, {
      width: '500px',
      data: { ...elemento, modo: 'editar' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = elemento.id;
        result.fecha = this.formatearFecha(result.fecha);
        this.historialClinicoService.actualizarHistorial(result);
        this.cargarHistorialClinico();
        this.mostrarMensaje('Historial clínico actualizado exitosamente');
      }
    });
  }

  private formatearFecha(fecha: string | Date): string {
    const date = new Date(fecha);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase(); // Aplica el filtro para búsqueda
  }

  clearFilter(): void {
    this.filterValue = ''; // Limpia el filtro
    this.applyFilter(); // Aplica cambios al filtro
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 }); // Muestra una notificación
  }
}

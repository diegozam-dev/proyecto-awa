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

  /**
   * Constructor del componente.
   * Inicializa los servicios y el formulario reactivo.
   * @param recordatorioTratamientoService Servicio para gestionar los recordatorios.
   * @param authService Servicio de autenticación para obtener el usuario actual.
   * @param fb FormBuilder para crear el formulario reactivo.
   */
  constructor(
    private recordatorioTratamientoService: RecordatorioTratamientoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.recordatorioForm = this.fb.group({
      texto: ['', Validators.required],
      fecha: [new Date(), Validators.required],
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe a los recordatorios y usuarios para mantener la información actualizada.
   */
  ngOnInit(): void {
    this.recordatorioTratamientoService.recordatorios$.subscribe(recordatorios => {
      this.recordatorios = recordatorios;
      this.filterRecordatorios();
    });

    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  /**
   * Agrega un nuevo recordatorio si el formulario es válido.
   * Luego, reinicia el formulario y actualiza los recordatorios filtrados.
   */
  addRecordatorio(): void {
    if (this.recordatorioForm.valid) {
      this.recordatorioTratamientoService.addRecordatorio(this.recordatorioForm.value);
      this.recordatorioForm.reset({ fecha: this.selectedDate });
      this.filterRecordatorios();
    }
  }

  /**
   * Actualiza la fecha seleccionada y los recordatorios filtrados.
   * @param date Nueva fecha seleccionada.
   */
  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.filterRecordatorios();
  }

  /**
   * Filtra los recordatorios para mostrar solo los que coinciden con la fecha seleccionada.
   */
  filterRecordatorios(): void {
    this.filteredRecordatorios = this.recordatorios.filter(recordatorio =>
      this.isSameDay(new Date(recordatorio.fecha), this.selectedDate)
    );
  }

  /**
   * Verifica si dos fechas corresponden al mismo día.
   * @param date1 Primera fecha.
   * @param date2 Segunda fecha.
   * @returns `true` si las fechas corresponden al mismo día, de lo contrario, `false`.
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}

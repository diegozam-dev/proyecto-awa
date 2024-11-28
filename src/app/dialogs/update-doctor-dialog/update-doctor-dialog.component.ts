import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';
import { HandleUserService } from '../../services/handleUsers.service';

@Component({
  selector: 'app-update-doctor-dialog',
  templateUrl: './update-doctor-dialog.component.html',
  styleUrl: './update-doctor-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDoctorDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateDoctorDialogComponent>);
  readonly data = inject<IUser>(MAT_DIALOG_DATA);
  form: FormGroup;

  isFormValid = signal(false);

  constructor(
    private fb: FormBuilder,
    private handleUserService: HandleUserService
  ) {
    this.form = this.fb.group({
      ci: [{ value: this.data.ci, disabled: true }, Validators.required],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      age: [this.data.age, Validators.required],
      phoneNumber: [this.data.phoneNumber, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      password: [this.data.password, Validators.required],
      specialty: [this.data.specialty, Validators.required],
      rol: [{ value: this.data.rol, disabled: true }, Validators.required],
    });
  }

  updateDoctor(event: MouseEvent) {
    event.preventDefault();

    // Si el formulario no es válido no hacemos nada
    this.isFormValid.set(this.form.valid);
    if (!this.isFormValid()) return;

    // Obtenemos los valores del formulario
    const user = this.form.value;
    user.ci = this.data.ci;
    user.rol = this.data.rol;

    // Actualizamos los datos del usuario y cerramos la ventana
    this.handleUserService.updateUser(user);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

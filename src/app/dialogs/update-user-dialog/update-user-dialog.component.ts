import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { HandleUserService } from '../../services/handleUsers.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateUserDialogComponent>);
  readonly data = inject<IUser>(MAT_DIALOG_DATA);
  form: FormGroup;

  isFormValid = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      rol: [this.data.rol, Validators.required],
    });
  }

  updateUser(event: MouseEvent) {
    event.preventDefault();

    this.isFormValid.set(this.form.valid);
    if (!this.isFormValid()) return;

    const user = this.form.value;
    user.ci = this.data.ci;

    this.handleUserService.updateUser(user);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

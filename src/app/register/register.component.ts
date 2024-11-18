import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandleUserService } from '../services/handleUsers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  patientForm: FormGroup;
  doctorForm: FormGroup;
  isPatientFormValid = signal(false);
  isDoctorFormValid = signal(false);

  constructor(
    private fb: FormBuilder,
    private handleUserService: HandleUserService
  ) {
    this.patientForm = this.fb.group({
      ci: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.doctorForm = this.fb.group({
      ci: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      specialty: ['', Validators.required],
    });
  }

  createPatient() {
    this.isPatientFormValid.set(this.patientForm.valid);
    if (!this.isPatientFormValid()) return;

    const user = this.patientForm.value;
    user.rol = 'Paciente';

    const result = this.handleUserService.createUser(user);

    if (!result) {
      alert(
        `Usuario con cédula ${user.ci} o email ${user.email} ya existe en el sistema.`
      );
    } else {
      alert('Paciente creado correctamente.');
      this.patientForm.reset();
    }
  }

  createDoctor() {
    this.isDoctorFormValid.set(this.doctorForm.valid);
    if (!this.isDoctorFormValid()) return;

    const user = this.doctorForm.value;
    user.rol = 'Doctor';

    const result = this.handleUserService.createUser(user);

    if (!result) {
      alert(
        `Usuario con cédula ${user.ci} o email ${user.email} ya existe en el sistema.`
      );
    } else {
      alert('Doctor creado correctamente.');
      this.doctorForm.reset();
    }
  }

  cancelPatientForm(event: MouseEvent) {
    event.preventDefault();

    this.patientForm.reset();
  }

  cancelDoctorForm(event: MouseEvent) {
    event.preventDefault();

    this.doctorForm.reset();
  }
}

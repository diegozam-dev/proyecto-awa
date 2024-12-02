import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandleUserService } from '../../services/handleUsers.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
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
    // Validamos que el formulario esté completo, si no lo está entonces no hacemos nada
    this.isPatientFormValid.set(this.patientForm.valid);
    if (!this.isPatientFormValid()) return;

    // Obtenemos los valores del formulario
    const user = this.patientForm.value;
    user.rol = 'Paciente';

    // Creamos un nuevo usuario
    const result = this.handleUserService.createUser(user);

    // Si el resultado es false significa que el ci o el email ya existen en el sistema, de lo contrario
    // el usuario se creo correctamente
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
    // Validamos que el formulario esté completo, si no lo está entonces no hacemos nada
    this.isDoctorFormValid.set(this.doctorForm.valid);
    if (!this.isDoctorFormValid()) return;

    // Obtenemos los valores del formulario
    const user = this.doctorForm.value;
    user.rol = 'Doctor';

    // Creamos un nuevo usuario
    const result = this.handleUserService.createUser(user);

    // Si el resultado es false significa que el ci o el email ya existen en el sistema, de lo contrario
    // el usuario se creo correctamente
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

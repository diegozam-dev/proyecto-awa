import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './Modulo-Registro-Autenticacion/login/login.component';
import { HistoriaClinicaSeguimientoComponent } from './Modulo-HistoriaClinica-Seguimiento/historia-clinica-seguimiento.component';

import {
  AdminHomePageComponent,
  ManageDoctorPageComponent,
  ManagePatientPageComponent,
  ManageAdminPageComponent,
} from './Modulo-Registro-Autenticacion/admin-pages/index';
import {
  PatientHomePageComponent,
  ConsultAppointmentComponent,
  GenerateAppointmentComponent,
} from './Home-Patients/index';
import { RegisterComponent } from './Modulo-Registro-Autenticacion/register/register.component';
import { DoctorHomePageComponent } from './Home-Doctors/doctor-home-page/doctor-home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RecordatoriosTratamientosComponent } from './Modulo- Recordatorios-tratamientos/recordatorios-tratamientos.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomePageComponent },
  { path: 'admin/manage-patients', component: ManagePatientPageComponent },
  { path: 'admin/manage-doctors', component: ManageDoctorPageComponent },
  { path: 'admin/manage-admins', component: ManageAdminPageComponent },
  {
    path: 'patient/generate-appointment',
    component: GenerateAppointmentComponent,
  },
  {
    path: 'patient/consult-appointment',
    component: ConsultAppointmentComponent,
  },
  { path: 'patient', component: PatientHomePageComponent },
  { path: 'doctor', component: DoctorHomePageComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  {
    path: 'historia-clinica-seguimiento',
    component: HistoriaClinicaSeguimientoComponent,
  },
  {
    path: 'recordatorios-tratamientos',
    component: RecordatoriosTratamientosComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import {
  AdminHomePageComponent,
  ManageDoctorPageComponent,
  ManagePatientPageComponent,
} from './admin-pages/index';
import {
  PatientHomePageComponent,
  ConsultAppointmentComponent,
  GenerateAppointmentComponent,
} from './patient-pages/index';
import { RegisterComponent } from './register/register.component';
import { DoctorHomePageComponent } from './doctor-pages/doctor-home-page/doctor-home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomePageComponent },
  { path: 'admin/manage-patients', component: ManagePatientPageComponent },
  { path: 'admin/manage-doctors', component: ManageDoctorPageComponent },
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
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

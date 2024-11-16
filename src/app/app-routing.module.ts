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

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

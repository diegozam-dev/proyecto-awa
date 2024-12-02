import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, Validator } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import {
  UpdateDoctorDialogComponent,
  UpdatePatientDialogComponent,
} from './dialogs/index';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './Modulo-Registro-Autenticacion/login/login.component';
import { AuthService } from './services/auth.service';
import { HandleUserService } from './services/handleUsers.service';
import {
  AdminHomePageComponent,
  ManageDoctorPageComponent,
  ManagePatientPageComponent,
  ManageAdminPageComponent,
} from './Modulo-Registro-Autenticacion/admin-pages/index';
import { PatientHomePageComponent } from './Home-Patients/patient-home-page/patient-home-page.component';
import { RegisterComponent } from './Modulo-Registro-Autenticacion/register/register.component';
import { DoctorHomePageComponent } from './Home-Doctors/doctor-home-page/doctor-home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { HistoriaClinicaSeguimientoModule } from './Modulo-HistoriaClinica-Seguimiento/historia-clinica-seguimiento.module';
import { RecordatoriosTratamientosModule } from './Modulo- Recordatorios-tratamientos/recordatorios-tratamientos.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LandingPageComponent,
    UpdateDoctorDialogComponent,
    UpdatePatientDialogComponent,
    AdminHomePageComponent,
    PatientHomePageComponent,
    ManagePatientPageComponent,
    ManageDoctorPageComponent,
    RegisterComponent,
    DoctorHomePageComponent,
    NotFoundPageComponent,
    ManageAdminPageComponent,
  ],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatTabsModule,
    MatProgressBar,
    HistoriaClinicaSeguimientoModule,
    RecordatoriosTratamientosModule,
  ],
  providers: [AuthService, HandleUserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

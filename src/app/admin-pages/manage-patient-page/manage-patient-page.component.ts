import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { HandleUserService } from '../../services/handleUsers.service';
import { USERS_DATA } from '../../data/users.data';
import { UpdatePatientDialogComponent } from '../../dialogs/index';

@Component({
  selector: 'app-manage-patient-page',
  templateUrl: './manage-patient-page.component.html',
  styleUrl: './manage-patient-page.component.css',
})
export class ManagePatientPageComponent {
  displayedColumns: string[] = [
    'ci',
    'firstName',
    'lastName',
    'age',
    'phoneNumber',
    'email',
    'password',
    'rol',
    'actions',
  ];
  dataSource;
  readonly userDialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private handleUserService: HandleUserService,
    private router: Router
  ) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/login']).then(() => {
        alert('No ha iniciado sesión.');
      });
    }

    this.dataSource = new MatTableDataSource(
      USERS_DATA.getValue().filter((user) => user.rol === 'Paciente')
    );

    USERS_DATA.subscribe((data) => {
      this.dataSource = new MatTableDataSource(
        USERS_DATA.getValue().filter((user) => user.rol === 'Paciente')
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updatePatient(row: IUser) {
    this.userDialog.open(UpdatePatientDialogComponent, {
      data: row,
    });
  }

  deletePatient(row: IUser) {
    this.handleUserService.deleteUser(row.ci);
  }
}

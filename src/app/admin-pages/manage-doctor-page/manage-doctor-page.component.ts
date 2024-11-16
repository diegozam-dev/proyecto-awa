import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { HandleUserService } from '../../services/handleUsers.service';
import { USERS_DATA } from '../../data/users.data';
import { UpdateDoctorDialogComponent } from '../../dialogs/index';

@Component({
  selector: 'app-manage-doctor-page',
  templateUrl: './manage-doctor-page.component.html',
  styleUrl: './manage-doctor-page.component.css',
})
export class ManageDoctorPageComponent {
  displayedColumns: string[] = [
    'ci',
    'firstName',
    'lastName',
    'age',
    'phoneNumber',
    'email',
    'password',
    'specialty',
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
      USERS_DATA.getValue().filter((user) => user.rol === 'Doctor')
    );

    USERS_DATA.subscribe((data) => {
      this.dataSource = new MatTableDataSource(
        USERS_DATA.getValue().filter((user) => user.rol === 'Doctor')
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateDoctor(row: IUser) {
    this.userDialog.open(UpdateDoctorDialogComponent, {
      data: row,
    });
  }

  deleteDoctor(row: IUser) {
    this.handleUserService.deleteUser(row.ci);
  }
}

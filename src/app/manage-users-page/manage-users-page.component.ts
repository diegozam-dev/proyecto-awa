import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IUser } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { HandleUserService } from '../services/handleUsers.service';
import { USERS_DATA } from '../data/users.data';
import { UpdateUserDialogComponent } from '../dialogs/index';

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrl: './manage-users-page.component.css',
})
export class ManageUsersPageComponent {
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
      this.router.navigate(['/']);
      alert('No ha iniciado sesión.');
    }

    this.dataSource = new MatTableDataSource(USERS_DATA.getValue());

    USERS_DATA.subscribe((data) => {
      this.dataSource = new MatTableDataSource(USERS_DATA.getValue());
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateUser(row: IUser) {
    this.userDialog.open(UpdateUserDialogComponent, {
      data: row,
    });
  }

  deleteUser(row: IUser) {
    this.handleUserService.deleteUser(row.ci);
  }
}

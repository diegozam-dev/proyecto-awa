import { Injectable } from '@angular/core';

import { USERS_DATA } from '../data/users.data';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HandleUserService {
  public deleteUser(ci: string): void {
    const filteredUsers = USERS_DATA.getValue().filter(
      (user) => user.ci !== ci
    );

    USERS_DATA.next(filteredUsers);
  }

  public updateUser(user: IUser): void {
    const updatedUsersData = USERS_DATA.getValue().map((currentUser) => {
      if (currentUser.ci !== user.ci) {
        return currentUser;
      } else {
        return user;
      }
    });

    USERS_DATA.next(updatedUsersData);
  }
}

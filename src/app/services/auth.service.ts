import { Injectable } from '@angular/core';

import { USERS_DATA } from '../data/users.data';
import { IUser } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public loggedUser = new BehaviorSubject<IUser | null>(null);

  login(email: string, password: string): boolean {
    // Verificamos que el usuario exista en los registros
    const [user] = USERS_DATA.getValue().filter(
      (entity) => entity.email === email && entity.password === password
    ) as IUser[];

    if (user) {
      this.isAuthenticated.next(true);
      this.loggedUser.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.loggedUser.next(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.getValue();
  }
}

import { Injectable } from '@angular/core';

import { USERS_DATA } from '../data/users.data';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HandleUserService {
  public deleteUser(ci: string): void {
    // Filtramos a los usuario excluyendo al que coincida con el número de cédula proporcionado
    const filteredUsers = USERS_DATA.getValue().filter(
      (user) => user.ci !== ci
    );

    // Actualizamos nuestra lista de usuarios con los filtrados anteriormente
    USERS_DATA.next(filteredUsers);
  }

  public updateUser(user: IUser): void {
    // Actualizamos al usuario cuyo ci sea igual al ci del usuario que recibimos como parámetro
    const updatedUsersData = USERS_DATA.getValue().map((currentUser) => {
      if (currentUser.ci !== user.ci) {
        return currentUser;
      } else {
        return user;
      }
    });

    // Actualizamos nuestra lista de usuarios
    USERS_DATA.next(updatedUsersData);
  }

  public createUser(user: IUser): boolean {
    // Buscamos a un usuario que coincida con el ci o email del usuario que recibimos como parámetro
    const [foundUser] = USERS_DATA.getValue().filter(
      (currentUser) =>
        currentUser.ci === user.ci || currentUser.email === user.email
    );

    // Si existe un usuario con alguno de esos atributos retornamos false
    if (foundUser) return false;

    // Si no existe entonces creamos una variable que contendrá un array con los usuarios que ya teníamos
    // y además el nuevo usuario
    const updatedUsersData = [...USERS_DATA.getValue(), user];

    // Finalmente actualizamos nuestra lista de usuarios y retornamos true
    USERS_DATA.next(updatedUsersData);

    return true;
  }
}

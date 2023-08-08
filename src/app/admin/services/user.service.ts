import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = environment.ADMIN_API + "/user";

  constructor(private _http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this._http.get<User[]>(`${this.BASE_URL}/all`);
  };

  getUserById(id: number) {
    return this._http.get<User>(`${this.BASE_URL}/${id}`);
  }

  isUserAlreadyExists(name: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.BASE_URL}/check-user-exists?userName=${name}`);
  }

  addUser(user: User) {
    return this._http.post(`${this.BASE_URL}`, user, { observe: 'response' });
  }

  updateUser(id: number, user: User) {
    return this._http.put(`${this.BASE_URL}?id=${id}`, user, { observe: "response" });
  }

  deleteUser(id: number) {
    return this._http.delete(`${this.BASE_URL}/${id}`, { observe: 'response' });
  }

}

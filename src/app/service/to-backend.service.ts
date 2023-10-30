import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User, DataObject } from '../shared/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ToBackendService {

  private api = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  //Get all users
  getAllSpieler(): Observable<DataObject> {
    return this.http.get<DataObject>(`${this.api}`)
  }

  //Get a single user
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  //Add a new user
  newUser(user: User): Observable<any> {
    return this.http.post(`${this.api}/`, user)
    .pipe(
      catchError(throwError)
    )
   }

  //update a user
  updateUser(user: User) {
    return this.http.put(`${this.api}/${user.id}`, user)
    .pipe(
      catchError(throwError)
    )
   }

  //Delete a user
  deleteSpieler(id: number): Observable<User> {
    return this.http.delete<User>(`${this.api}/${id}`)
    .pipe(
      catchError(throwError)
    )
  }
}

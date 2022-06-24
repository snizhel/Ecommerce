import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import {  Observable, of } from 'rxjs';
import { User } from '../interface/user';


@Injectable({ providedIn: 'root' })

export class UserService {

  apiUrl='http://localhost:8080/user'

  constructor(private http: HttpClient) {  }

  register(user: object): Observable<object> {  
    return this.http.post(`${this.apiUrl}/register`, user);  
  } 

  getCurrentUser(){
    return this.http.get(`${this.apiUrl}/currentUser/`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allUsers`)
      .pipe(map((res: User[]) => res),
        tap(_ => console.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}

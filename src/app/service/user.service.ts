import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import {  Observable, of } from 'rxjs';
import { User } from '../interface/user';


@Injectable({ providedIn: 'root' })

export class UserService {

  apiUrl='http://localhost:8080/user'

  constructor(private http: HttpClient) {  }



  getCurrentUser(){
    return this.http.get(`${this.apiUrl}/currentUser/`);
  }

  getUserById(id:number){
    return this.http.get(`${this.apiUrl}/userBy/${id}`)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allUsers`)
      .pipe(map((res: User[]) => res),
        tap(_ => console.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  register(user: object): Observable<object> {  
    return this.http.post(`${this.apiUrl}/register`, user);  
  } 

  update(user:object,userId:number){
    return this.http.post(`${this.apiUrl}/update/${userId}`,user)
  }

  updateCategory(category:object,id: number){
    return this.http.post(`${this.apiUrl}/update/${id}`, category); 
  }

  deleteUser(userId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`).pipe(
      tap(_ => console.log('deleted user')),
      catchError(this.handleError<any>())
    )

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

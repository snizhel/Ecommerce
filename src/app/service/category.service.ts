import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import {  Observable, of } from 'rxjs';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  apiUrl='http://localhost:8080/category'

  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/allCats`)
      .pipe(map((res: Category[]) => res),
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getCategoryById(id:number){
    return this.http.get(`${this.apiUrl}/categoryBy/${id}`)
  }

  create(category: object): Observable<object> {  
    return this.http.post(`${this.apiUrl}/create`, category);  
  } 

  updateCategory(category:object,id: number){
    return this.http.post(`${this.apiUrl}/update/${id}`, category); 
  }
  
  deleteCategory(categoryId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${categoryId}`).pipe(
      tap(_ => console.log('Category deleted')),
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

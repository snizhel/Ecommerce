import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable,of,tap } from 'rxjs';
import { Cart } from '../interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl='http://localhost:8080/cart'


  constructor(private http:HttpClient) { }

  getMyCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/myCart`)
      .pipe(map((res: Cart) => res),
        tap(_ => console.log('fetched Cart')),
        catchError(this.handleError<Cart>('getmyCart'))
      );
  }

  add(cartItem: object): Observable<object> {  
    return this.http.post(`${this.apiUrl}/add`, cartItem);  
  } 

  updateCartItem(cartItem:object,id: number){
    return this.http.put(`${this.apiUrl}/update/${id}`, cartItem); 
  }
  
  deleteCartItem(CartItemId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${CartItemId}`).pipe(
      tap(_ => console.log('CartItem deleted')),
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

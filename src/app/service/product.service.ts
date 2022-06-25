import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable ,of,tap} from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl='http://localhost:8080/product'

  constructor(private http: HttpClient) { }


  

getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
      .pipe(map((res: Product[]) => res),
        tap(_ => console.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProductById(id:number){
    return this.http.get(`${this.apiUrl}/productBy/${id}`)
  }

  create(product: Product){  
    return this.http.post(`${this.apiUrl}/add`, product);  
  } 

  ////////////UPDATE Product DOESNT WORK
  updateProduct(productId: number,product:Product){
    return this.http.post(`${this.apiUrl}/update/${productId}`, product)
    .pipe(catchError(this.handleError<any>()));
  }
  
  deleteProduct(productId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`).pipe(
      tap(_ => console.log('product deleted')),
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IProducto } from '../producto/producto';
export interface IControlador{
  id: string;
  nombreControlador: string;
  habilitado: boolean;

}

@Injectable({
  providedIn: 'root'
})
//Loads all of my components
export class LoadComboBoxService {

  private productosUrl = environment.inventariosApiUrl + 'productos';

  constructor(private http: HttpClient) { }

  //cargar productos
  getProductos() : Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.productosUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

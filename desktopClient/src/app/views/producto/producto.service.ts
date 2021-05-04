import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProducto } from './producto'
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoUrl = environment.inventariosApiUrl + 'productos'

  constructor(private http: HttpClient) { }

  private initilizeProducto(): IProducto{
    return {
      id: 0,
    codigoProducto: null,
    proveedorId: 0,
    //TODO: Add proveedor object
    unidadDeMedidaId: 0,
    //TODO: add unidadDeMedida object
    descripcion: null,
    marca: null,
    costoPonderado: 0
    };
  }
  //CRUD operations for producto
  //create
  createProducto( producto : IProducto) : Observable<IProducto> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<IProducto>(this.productoUrl, producto,{ headers}).
    pipe(
      tap( data => console.log('createProducto: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  
  //read
  getProductos() : Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.productoUrl).pipe(
      tap( data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProducto(id: number): Observable<IProducto> {
    if (id == 0) return of(this.initilizeProducto());

    const url = `${this.productoUrl}/${id}`;
    return this.http.get<IProducto>(url).
      pipe(
        tap(data => console.log('getProducto: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  //update
  updateProducto(producto: IProducto): Observable<IProducto> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json'});
    const url = `${this.productoUrl}/${producto.id}`;
    return this.http.put<IProducto>(url, producto, { headers })
      .pipe(
        tap( () => console.log('updateProducto: ' + producto.id)),
      // Return the product on an update
        map(() => producto),
        catchError(this.handleError)
      );
  }
  //delete
  deleteProducto(id:number): Observable<IProducto> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json'});
    const url = `${this.productoUrl}/${id}`;
    return this.http.delete<IProducto>(url, { headers })
      .pipe(
        tap( () => console.log('deleteProducto: ' + id)),
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



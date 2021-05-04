import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoEditComponent } from './producto-edit/producto-edit.component'


@Injectable({
  providedIn: 'root'
})
export class ProductoGuard implements CanDeactivate<ProductoEditComponent> {
  canDeactivate(
    component: ProductoEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if (component.productoForm.dirty) {
        const nombre = component.productoForm.get('nombre').value || 'Nuevo Producto';
        return confirm(`Si deja la página puede perder todos los cambio que no ha salvado de ${nombre}?`);
      } 
      return true;
  }
  
}

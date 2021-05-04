import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoGuard } from './producto.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Producto'
    },
    children: [
      {
        path: '',
        redirectTo: 'producto-list'
      },
      {
        path: 'producto-list',
        component: ProductoListComponent,
        data: {
          title: 'Edición y Consulta'
        }
      },
      {
        path: 'producto-edit/:id',
        component: ProductoEditComponent,
        canDeactivate: [ProductoGuard],
        data: {
          title: 'Formulario'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }

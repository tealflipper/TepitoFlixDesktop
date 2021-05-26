import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculaEditComponent } from './pelicula-edit/pelicula-edit.component';
import { PeliculaListComponent } from './pelicula-list/pelicula-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pelicula'
    },
    children: [
      {
        path: '',
        redirectTo: 'pelicula-list'
      },
      {
        path: 'pelicula-list',
        component: PeliculaListComponent,
        data:{
          title: 'Edición y consulta'
        }        
      },
      {
        path: 'pelicula-edit/:id',
        component: PeliculaEditComponent,
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
export class PeliculaRoutingModule { }

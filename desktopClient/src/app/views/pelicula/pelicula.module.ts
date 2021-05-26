import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaComponent } from './pelicula.component';
import { PeliculaListComponent } from './pelicula-list/pelicula-list.component';
import { PeliculaEditComponent } from './pelicula-edit/pelicula-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PeliculaComponent,
    PeliculaListComponent,
    PeliculaEditComponent
  ],
  imports: [
    CommonModule,
    PeliculaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PeliculaModule { }

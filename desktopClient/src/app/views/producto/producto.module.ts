import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductoEditComponent,
    ProductoListComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }

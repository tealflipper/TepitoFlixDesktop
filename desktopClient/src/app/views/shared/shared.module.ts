import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
//import { SelectEstacionIslaComponent } from './select-estacion-isla/select-estacion-isla.component';



@NgModule({
  declarations: [/*SelectEstacionProductComponent*/],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  exports: [/*SelectEstacionProductComponent*/]
})
export class SharedModule { }

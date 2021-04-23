import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSoapModule} from 'ngx-soap';

import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movie/movie.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSoapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

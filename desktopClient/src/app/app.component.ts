import { Component, OnInit } from '@angular/core';

import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs'
import { Movie } from './movie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  xmlResponse:any;
  client: Client;
  movie:Movie={
    id: 1,
    name: 'tree'
  };
  id:number;
  loading: boolean;
  showDiagnostic: boolean;
  message: string;
  jsonResponse: string;
  resultLabel: string;
  title = 'desktopClient';

  constructor(private http:HttpClient,private soap: NgxSoapService) {
    const prom = this.soap.createClient('assets/movies.wsdl').then(client => {
      this.client = client;
      console.log('Created client!');
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  ngOnInit(): void {
  }



  getMovieRequest() {
    const body = {
      id: this.movie.id
    };
    this.xmlResponse = "";
          this.message = "";
    this.client.call('getMovie',body).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          this.xmlResponse = res.xml;
          this.message = JSON.stringify(res.result);
          this.loading = false;
        },
        err => console.log(err)
      );
}
}

import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';
import {Apollo} from 'apollo-angular';
import { ApolloClient } from 'apollo-client';
import { gql, useQuery } from '@apollo/client';

@Component({
  selector: 'app-pelicula-list',
  templateUrl: './pelicula-list.component.html',
  styleUrls: ['./pelicula-list.component.scss']
})
export class PeliculaListComponent implements OnInit {

  pageTitle = 'Peliculas';
  errorMessage = '';
  _listFilter = '';
  filteredPeliculas: Pelicula[];
  peliculas: any = {};
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }


  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPeliculas = this.listFilter ? this.performFilter(this.listFilter) : this.peliculas;
  }

  performFilter(filterBy: string): Pelicula[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.peliculas.filter((pelicula: Pelicula) =>
    pelicula.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getAllMovies{
              id
              title
              director
              genre
              release
              runtime
              price
            }
          }
        `,
      })
      .valueChanges.subscribe(data => {
        console.log(data)
        this.peliculas = data;
        
      });
  
    this.filteredPeliculas = this.peliculas;
  }

}

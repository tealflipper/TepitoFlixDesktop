import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';
import {ApolloClient, InMemoryCache} from '@apollo/client/core';
import {Apollo, gql} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
const MOVIE_SUB = gql`
subscription{
    movieSub{
        id
        title
        director
        genre
        release
        runtime
        price
    }
}
`;
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
    this.filteredPeliculas = this.performFilter(this.listFilter);
  }

  performFilter(filterBy: string): Pelicula[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.peliculas.filter((pelicula: Pelicula) =>
    pelicula.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         getAllMovies{
    //           id
    //           title
    //           director
    //           genre
    //           release
    //           runtime
    //           price
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe(result => {
    //     this.peliculas = result.data;  
    //     this.peliculas=this.peliculas.getAllMovies;
    //     console.log(this.peliculas); 
    //     this.filteredPeliculas = this.peliculas;     
    //   });

      this.apollo.subscribe<any>({
        query: MOVIE_SUB,
      }).subscribe(data => {
        this.peliculas = data.data.movieSub;
        // console.log(data.data);     
      });
    
  }

}

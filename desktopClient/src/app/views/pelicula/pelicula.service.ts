import { Injectable } from '@angular/core';
import {ApolloClient, InMemoryCache} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {Apollo, gql} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pelicula } from './pelicula';
const GET_MOVIES = gql`
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
`; 
@Injectable({
  providedIn: 'root'
})

// const GET_MOVIES = gql`
//   query{
//     getAllMovies{
//       id
//       title
//       director
//       genre
//       release
//       runtime
//       price
//     }
//   }`
export class PeliculaService {
  peliculas: Pelicula[];

  constructor(private apollo: Apollo) { }
  getMovies():Observable<Pelicula[]>{
    return this.apollo.
    watchQuery<any>({ query: GET_MOVIES })
    .valueChanges.pipe(map((result) => result.data.getAllMovies));
    console.log(this.peliculas)


  }
}

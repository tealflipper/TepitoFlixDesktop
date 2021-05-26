import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';

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
  peliculas: Pelicula[] = [{
    id: 1,
    title: 'spooderman',
    director: 'sml',
    genre: 'horror',
    release: 1997,
    runtime: 96,
    price: 9.99
  }] ;

  constructor(private peliculaService: PeliculaService) { }
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
    this.filteredPeliculas = this.peliculas;
  }

}

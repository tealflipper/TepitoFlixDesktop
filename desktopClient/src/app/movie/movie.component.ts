import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie'
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie:Movie={
    id: 1,
    name: 'rand'
  }
  constructor() { }

  ngOnInit(): void {
    
  }

}

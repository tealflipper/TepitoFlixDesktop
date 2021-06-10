import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../../generic-validator';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';
import {ApolloClient, InMemoryCache} from '@apollo/client/core';
import {Apollo, gql} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

const MOVIE_GET = gql`
query Movie($id: ID!){
    getMovie(id: $id){
        id,
        title,
        director,
        genre,
        release,
        runtime,
        price
    }
}
`;

const MOVIE_DROP = gql`
mutation MovieDrop($id: Int!){
  
  deleteMovie(id:$id)
  {
    id,
    title,
    director,
    genre,
    release,
    runtime,
    price
  }
}
`;

const MOVIE_POST = gql`
mutation PostMovie($title:String!, $director: String,$genre:String, $release: Int, $runtime: Int, $price:Float){
    addMovie(title:$title, director:$director, genre:$genre, release: $release, runtime: $runtime, price: $price )
    {
        id,
        title,
        director,
        genre,
        release,
        runtime,
        price
    }
}
`;

const MOVIE_PUT = gql`
mutation PutMovie($id:Int!,$title:String, $director: String,$genre:String, $release: Int, $runtime: Int, $price:Float){
  updateMovie(id:$id,title:$title, director:$director, genre:$genre, release: $release, runtime: $runtime, price: $price )
    {
        id,
        title,
        director,
        genre,
        release,
        runtime,
        price
    }
}
`;

@Component({
  selector: 'app-pelicula-edit',
  templateUrl: './pelicula-edit.component.html',
  styleUrls: ['./pelicula-edit.component.scss']
})
export class PeliculaEditComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  peliculaForm: FormGroup;
  pageTitle = 'Agregar Pelicula';
  errorMessage = '';
  emailMessage: String;
  pelicula: Pelicula;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private fb: FormBuilder,
    private apollo: Apollo) {

    this.validationMessages = {
      id: {
        required: 'El id de la pelicula.'
      },
      title: {
        required: 'El titulo es obligatorio.'
      },
      director: {
        required: 'El director es obligatorio.'
      },
      genre: {
        required: 'El genero es obligatorio.'
      },
      release: { 
        required: 'El año de estreno es obligatorio.'
      },
      runtime: {
        required: 'La duracion es obligatoria.'
      },
      price: {
        required: 'El precio es obligatorio.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }
  
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

      merge(this.peliculaForm.valueChanges, ...controlBlurs).pipe(
        debounceTime(800)
      ).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.peliculaForm);
      });
  }
  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.route.paramMap);
    this.peliculaForm = this.fb.group({

      /*
      id: ['', [Validators.required]],
      title: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      release: ['',Validators.required],
      runtime: ['', Validators.required],
      price: ['', Validators.required]
      */
      id: [''],//['', [Validators.required]],
      title: ['', [Validators.required]],
      director: ['', [Validators.required]],
      genre: [''],//, [Validators.required]],
      release: [''],//,[Validators.required]],
      runtime: [''],//, [Validators.required]],
      price: ['']//,[Validators.required]]
    });
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        console.log(id)
        this.getPelicula(id);
      })
    
  }

  save(): void{
    if (this.peliculaForm.valid) {
      if (this.peliculaForm.dirty) {
        const p = { ...this.pelicula, ...this.peliculaForm.value };
        console.log("save", p)
        // this.onSaveComplete();
        
        if (p.id === "") {
          this.apollo
          .mutate<any>({
            mutation: MOVIE_POST,
            variables: {
              title:p.title, 
              director:p.director, 
              genre:p.genre, 
              release: p.release, 
              runtime: p.runtime, 
              price: p.price
            },
          })
          .subscribe(({ data }) => {
            console.log('got data', data);
          },(error) => {
            console.log('there was an error sending the query', error);
          });
            
          this.onSaveComplete();
        }else {
          
          this.apollo
          .mutate<any>({
            mutation: MOVIE_PUT,
            variables: {
              id: this.pelicula.id,
              title:p.title, 
              director:p.director, 
              genre:p.genre, 
              release: p.release, 
              runtime: p.runtime, 
              price: p.price
            },
          })
          .subscribe(({ data }) => {
            console.log('got data', data);
          },(error) => {
            console.log('there was an error sending the query', error);
          });
          this.onSaveComplete();
            
        }
      } else {
        this.onSaveComplete();
  
      }
      
    } else {
      this.errorMessage = 'Por favor corrija los errores.';
    }
  }


  getPelicula(iden){
    if (iden !=0){
      this.apollo
      .watchQuery<any>({
        query: MOVIE_GET,
        variables: {
          id: iden,
        },
      })
      .valueChanges.subscribe(result => {
        this.pelicula = result.data.getMovie;
        console.log(this.pelicula);  
        this.displayPelicula(this.pelicula);  
      });
    }else{
      return {
        id: 0,
        title: "",
        director: "",
        genre: "",
        release: 2021,
        runtime: 120,
        price: 0.00
      }
    }
    
  }

  displayPelicula(pelicula: Pelicula): void {
    if (this.peliculaForm) {
      this.peliculaForm.reset
    }

    this.pelicula = pelicula;
    if (this.pelicula.id === 0){
      this.pageTitle = "Crear Pelicula";
    }else{
      this.pageTitle = "Actualizar Pelicula";
    }

    this.peliculaForm.patchValue({
      id: this.pelicula.id,
      title: this.pelicula.title,
      director: this.pelicula.director,
      genre: this.pelicula.genre,
      release: this.pelicula.release,
      runtime: this.pelicula.runtime,
      price: this.pelicula.price
    });
  }

  
  deletePeliculas(): void{
    this.apollo
    .mutate<any>({
      mutation: MOVIE_DROP,
      variables: {
        id: this.pelicula.id,
      },
    })
    .subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    const cache = new InMemoryCache();
    cache.evict({ id: ""+this.pelicula.id })
    this.onSaveComplete();
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.peliculaForm.reset();
    this.router.navigate(['/pelicula/pelicula-list']);
  }


}

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../../generic-validator';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';

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
    private fb: FormBuilder) {

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
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      director: ['', [Validators.required]],
      genre: [''],//, [Validators.required]],
      release: [''],//,[Validators.required]],
      runtime: [''],//, [Validators.required]],
      price: ['']//,[Validators.required]]
    });
  }

  save(): void{
    if (this.peliculaForm.valid) {
      if (this.peliculaForm.dirty) {
        const p = { ...this.pelicula, ...this.peliculaForm.value };
        this.onSaveComplete();
        /*
        if (p.id === 0) {
          /*
          this.peliculaService.createPelicula(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
            
        } else {
          /*
          this.peliculaService.updatePelicula(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
            
        }
      } else {
        this.onSaveComplete();
        */
      }
      
    } else {
      this.errorMessage = 'Por favor corrija los errores.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.peliculaForm.reset();
    this.router.navigate(['/pelicula/pelicula-list']);
  }

  deletePeliculas(): void{

  }

}

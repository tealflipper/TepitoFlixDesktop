import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../../generic-validator';
import { LoadComboBoxService } from '../../shared/load-combo-box.service';
import { IProducto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  productoForm: FormGroup;
  pageTitle = 'Agregar Producto';
  errorMessage = '';
  emailMessage = String;

  producto: IProducto;
  private sub: Subscription;

  /*
   *TODO:   
      1. add Salidas
      2. add Entregas
      3. add Inventarios
      4. add movimientos
      5. add Proveedores
      6. add UnidadesDeMedida
   */
  proveedores = ["Prov1", 'Prov2']
  unidadesDeMedida = ['litros','galones']

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private load: LoadComboBoxService,
    private productoService: ProductoService,
    private fb: FormBuilder) {

    this.validationMessages = {

      /*
      codigoProducto: String;
      proveedorId: number;
      //TODO: Add proveedor object
      unidadDeMedidaId: number;
      //TODO: add unidadDeMedida object
      descripcion: String;
      marca: String;
      costoPonderado: number;
      */
      codigoProducto: {
        required: 'El código de producto es obligatorio.',
        minlength: 'El código de producto debe ser mayor de 3 caracteres.'
      },
      proveedorId: {
        required: 'El proveedor es obligatorio.'
      },
      unidadDeMedidaId: {
        required: 'La unidad de medida es obligatoria.'
      },
      descripcion: {
        required: 'La descripción del producto es obligatoria'
      },
      marca: { 
        required: 'La marca del producto es obligatoria'
      },
      costoPonderado: {
        required: 'El costo ponderado es requerido.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }
  
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      codigoProducto: ['', [Validators.required, Validators.minLength(3)]],
      proveedorId: ['', [Validators.required]],
      unidadDeMedida: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      costoPonderado: ['', [Validators.required]],
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProducto(id);
      }
    );
    /*
    this.load.getProductos().subscribe({
      next: proveedor => {
        this.proveedor = provedor;
      },
      error: err => this.errorMessage = err
    });
    */
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productoForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productoForm);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProducto(id: number): void {
    this.productoService.getProducto(id)
      .subscribe(
        producto => this.displayProducto(producto),
        error => this.errorMessage = error
      );
  }

  displayProducto(producto: IProducto): void {
    if (this.productoForm) this.productoForm.reset;

    this.producto = producto;
    console.log(producto)
    if (this.producto.id === 0) this.pageTitle = 'Agregar Producto';
    else this.pageTitle = `Editar Producto: ${this.producto.codigoProducto}`;

    this.productoForm.patchValue({
      codigoProducto: this.producto.codigoProducto,
      proveedorId: this.producto.proveedorId,
      unidadDeMedidaId: this.producto.unidadDeMedidaId,
      descripcion: this.producto.descripcion,
      marca: this.producto.marca,
      costoPonderado: this.producto.costoPonderado
    })
  }

  save(): void {
    if (this.productoForm.valid) {
      if (this.productoForm.dirty) {
        const p = { ...this.producto, ...this.productoForm.value };

        if (p.id === 0) {
          this.productoService.createProducto(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productoService.updateProducto(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Por favor corrija los errores.';
    }
  }
  
  onBack(): void {
    this.router.navigate(['/producto/producto-list']);
  }

  deleteProducto(): void {
    if (this.producto.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`¿Está seguro que desea eliminar el producto: ${this.producto.codigoProducto}: ${this.producto.descripcion}?`)) {
        this.productoService.deleteProducto(this.producto.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productoForm.reset();
    this.router.navigate(['/producto/producto-list']);
  }

}

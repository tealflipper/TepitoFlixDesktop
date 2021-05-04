import { Component, OnInit } from '@angular/core';
import { IProducto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {
  pageTitle = "Productos"
  errorMessage = '';
  _listFilter = '';
  filteredProductos: IProducto[];
  productos: IProducto[];
  
  constructor(private productService:ProductoService) { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProductos= this.listFilter ? this.performFilter(this.listFilter) : this.productos;
  }

  performFilter(filterBy: string): IProducto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productos.filter((isla: IProducto) =>
    isla.codigoProducto.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnInit(): void {
    this.productService.getProductos().subscribe({
      next: productos => {
        this.productos = productos;
        console.log(productos)
        this.filteredProductos = this.productos;
      },
      error: err => this.errorMessage = err
    });
  }

}

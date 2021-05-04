import { TestBed } from '@angular/core/testing';

import { ProductoGuard } from './producto.guard';

describe('ProductoGuard', () => {
  let guard: ProductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

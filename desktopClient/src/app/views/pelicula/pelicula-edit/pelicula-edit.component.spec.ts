import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaEditComponent } from './pelicula-edit.component';

describe('PeliculaEditComponent', () => {
  let component: PeliculaEditComponent;
  let fixture: ComponentFixture<PeliculaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

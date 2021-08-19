import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSuscripcionComponent } from './listar-suscripcion.component';

describe('ListarSuscripcionComponent', () => {
  let component: ListarSuscripcionComponent;
  let fixture: ComponentFixture<ListarSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

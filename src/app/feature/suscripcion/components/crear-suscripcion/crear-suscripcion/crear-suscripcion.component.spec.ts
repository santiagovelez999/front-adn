import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSuscripcionComponent } from './crear-suscripcion.component';

describe('CrearSuscripcionComponent', () => {
  let component: CrearSuscripcionComponent;
  let fixture: ComponentFixture<CrearSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

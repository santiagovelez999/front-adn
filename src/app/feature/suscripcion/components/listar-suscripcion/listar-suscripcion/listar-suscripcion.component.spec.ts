
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suscripcion } from '@suscripcion/shared/model/suscripcion';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { of } from 'rxjs';

import { ListarSuscripcionComponent } from './listar-suscripcion.component';

describe('ListarSuscripcionComponent', () => {
  let component: ListarSuscripcionComponent;
  let fixture: ComponentFixture<ListarSuscripcionComponent>;
  let suscripcionService: SuscripcionService;

  const listaSuscripciones: Suscripcion[] = [new Suscripcion(1 , 1 , 70000 , 'XXX' , new Date()),
                                             new Suscripcion(2 , 2 , 40000 , 'XV' , new Date())
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSuscripcionComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [SuscripcionService, HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSuscripcionComponent);
    component = fixture.componentInstance;
    spyOn(suscripcionService, 'consultar').and.returnValue(
      of(listaSuscripciones)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listarSuscripciones();
    expect(2).toBe(component.dataSource.data.length);
  });
});

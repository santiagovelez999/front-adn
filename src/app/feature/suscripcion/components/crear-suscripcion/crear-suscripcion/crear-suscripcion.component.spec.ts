import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { of } from 'rxjs';

import { CrearSuscripcionComponent } from './crear-suscripcion.component';

describe('CrearSuscripcionComponent', () => {
  let component: CrearSuscripcionComponent;
  let fixture: ComponentFixture<CrearSuscripcionComponent>;
  let suscripcionService: SuscripcionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSuscripcionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [SuscripcionService, HttpService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSuscripcionComponent);
    component = fixture.componentInstance;
    suscripcionService = TestBed.inject(SuscripcionService);
    spyOn(suscripcionService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
  });

  it('Registrando producto', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
    component.formularioSuscripcion.controls.idSuscripcion.setValue('1');
    component.formularioSuscripcion.controls.idCliente.setValue('1');
    component.formularioSuscripcion.controls.valorSuscripcion.setValue('70000');
    component.formularioSuscripcion.controls.tipoSuscripcion.setValue('XXX');
    component.formularioSuscripcion.controls.fechaRegistro.setValue(new Date());
    expect(component.formularioSuscripcion.valid).toBeTruthy();

    component.guardar();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });


});

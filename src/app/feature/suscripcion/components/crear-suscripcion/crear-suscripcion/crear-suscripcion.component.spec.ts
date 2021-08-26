import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { SuscripcionModule } from '@suscripcion/suscripcion.module';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { CrearSuscripcionComponent } from './crear-suscripcion.component';

describe('CrearSuscripcionComponent', () => {
  let component: CrearSuscripcionComponent;
  let fixture: ComponentFixture<CrearSuscripcionComponent>;
  let suscripcionServiceSpy: jasmine.SpyObj<SuscripcionService>;
  
  const FECHA_ENVIO = '2021-08-12 00:00:00';

  const respuesta = {
    valor: {
      descuento: '$0',
      fechaDeVencimientoDeLaSuscripcion: '27/08/2021'
    }
  };

  beforeEach(async () => {
    suscripcionServiceSpy = jasmine.createSpyObj('SuscripcionService', ['guardar']);
    suscripcionServiceSpy.guardar.and.returnValue(
      of(respuesta)
    );
    await TestBed.configureTestingModule({
      declarations: [CrearSuscripcionComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatDialogModule,
        RouterModule.forRoot([]),
        SuscripcionModule,
        AppModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: SuscripcionService, useValue: suscripcionServiceSpy }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar creación de component', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es invalido cuando esta vacio', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
  });

  fit('Registrando producto', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
    component.formularioSuscripcion.controls.idSuscripcion.setValue('1');
    component.formularioSuscripcion.controls.idCliente.setValue('1');
    component.formularioSuscripcion.controls.valorSuscripcion.setValue('40000');
    component.formularioSuscripcion.controls.tipoSuscripcion.setValue('XV');
    component.formularioSuscripcion.controls.fechaRegistro.setValue(new Date(FECHA_ENVIO));
    expect(component.formularioSuscripcion.valid).toBeTruthy();
    component.guardar();
    expect(component.formularioInvalido).toBeFalse();
  });
});

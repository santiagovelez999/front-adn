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

fdescribe('CrearSuscripcionComponent', () => {
  let component: CrearSuscripcionComponent;
  let fixture: ComponentFixture<CrearSuscripcionComponent>;
  let suscripcionServiceSpy: jasmine.SpyObj<SuscripcionService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CrearSuscripcionComponent>>;
  const FECHA_ENVIO = '2021-08-12 00:00:00';

  const respuesta = {
    valor: {
      descuento: '$0',
      fechaDeVencimientoDeLaSuscripcion: '27/08/2021'
    }
  };

  beforeEach(async () => {
    suscripcionServiceSpy = jasmine.createSpyObj('SuscripcionService', ['guardar', 'actualizar']);
    suscripcionServiceSpy.guardar.and.returnValue(
      of(respuesta)
    );
    suscripcionServiceSpy.actualizar.and.returnValue(
      of(true)
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
        { provide: MatDialogRef, useValue: dialogRef },
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
    console.log('Validar creación de component');
  });

  it('Formulario es invalido cuando esta vacio', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
    console.log('Formulario es invalido cuando esta vacio');
  });

  it('Registrando Suscripción', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
    component.formularioSuscripcion.controls.idCliente.setValue('1');
    component.formularioSuscripcion.controls.valorSuscripcion.setValue('40000');
    component.formularioSuscripcion.controls.tipoSuscripcion.setValue('XV');
    component.formularioSuscripcion.controls.fechaRegistro.setValue(new Date(FECHA_ENVIO));
    expect(component.formularioSuscripcion.valid).toBeTruthy();
    component.guardar();
    expect(component.formularioInvalido).toBeFalse();
    console.log('Registrando Suscripción');
  });

  it('Actualizar Suscripción', () => {
    expect(component.formularioSuscripcion.valid).toBeFalsy();
    component.idSuscripcion = 1;
    component.formularioSuscripcion.controls.idCliente.setValue('1');
    component.formularioSuscripcion.controls.valorSuscripcion.setValue('40000');
    component.formularioSuscripcion.controls.tipoSuscripcion.setValue('XV');
    component.formularioSuscripcion.controls.fechaRegistro.setValue(new Date(FECHA_ENVIO));
    expect(component.formularioSuscripcion.valid).toBeTruthy();
    component.actualizar();
    expect(component.formularioInvalido).toBeFalse();
    console.log('Actualizar Suscripción');
  });
});

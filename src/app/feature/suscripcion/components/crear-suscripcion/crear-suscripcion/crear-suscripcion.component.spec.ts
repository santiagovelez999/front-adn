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

  beforeEach(async () => {
    suscripcionServiceSpy = jasmine.createSpyObj('SuscripcionService',['guardar']);
    suscripcionServiceSpy.guardar.and.returnValue(
      of({ valor: "1"})
    );
    await TestBed.configureTestingModule({
      declarations: [ CrearSuscripcionComponent ],
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
    component.formularioSuscripcion.controls.valorSuscripcion.setValue('70000');
    component.formularioSuscripcion.controls.tipoSuscripcion.setValue('XXX');
    component.formularioSuscripcion.controls.fechaRegistro.setValue(new Date());
    expect(component.formularioSuscripcion.valid).toBeTruthy();

    component.guardar();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });


});

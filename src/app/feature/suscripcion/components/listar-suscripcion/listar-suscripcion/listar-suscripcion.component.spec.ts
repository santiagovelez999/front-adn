
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Suscripcion } from '@suscripcion/shared/model/suscripcion';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { SuscripcionModule } from '@suscripcion/suscripcion.module';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { ListarSuscripcionComponent } from './listar-suscripcion.component';

fdescribe('ListarSuscripcionComponent', () => {
  let component: ListarSuscripcionComponent;
  let fixture: ComponentFixture<ListarSuscripcionComponent>;
  let suscripcionServiceSpy: jasmine.SpyObj<SuscripcionService>;
  const listaSuscripciones: Suscripcion[] = [new Suscripcion(1 , 1 , 70000 , 'XXX' , new Date()),
                                             new Suscripcion(2 , 2 , 40000 , 'XV' , new Date())
  ];

  beforeEach(async () => {
    suscripcionServiceSpy = jasmine.createSpyObj('SuscripcionService', [
      'consultar', 'eliminar',
    ]);
    suscripcionServiceSpy.consultar.and.returnValue(
      of(listaSuscripciones)
    );

    suscripcionServiceSpy.eliminar.and.returnValue(
      of(true)
    );

    await TestBed.configureTestingModule({
      declarations: [ ListarSuscripcionComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatDialogModule,
        RouterModule.forRoot([]),
        SuscripcionModule,
        AppModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: SuscripcionService, useValue: suscripcionServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar creación de component', () => {
    expect(component).toBeTruthy();
    console.log('Validar creación de component');
  });

  it('Listar', fakeAsync(() => {
    component.listarSuscripciones();
    tick();
    fixture.detectChanges();
    expect(2).toBe(component.dataSource.data.length);
    console.log('Listar');
  }));

  it('Eliminar', fakeAsync(() => {
    const idSuscripcion = 1;
    component.eliminar(idSuscripcion);
    tick();
    fixture.detectChanges();
    expect(true).toBe(component.registroEliminado);
    console.log('Eliminar');
  }));
});

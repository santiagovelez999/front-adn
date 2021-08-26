
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Suscripcion } from '@suscripcion/shared/model/suscripcion';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { SuscripcionModule } from '@suscripcion/suscripcion.module';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { ListarSuscripcionComponent } from './listar-suscripcion.component';

describe('ListarSuscripcionComponent', () => {
  let component: ListarSuscripcionComponent;
  let fixture: ComponentFixture<ListarSuscripcionComponent>;

  const listaSuscripciones: Suscripcion[] = [new Suscripcion(1 , 1 , 70000 , 'XXX' , new Date()),
                                             new Suscripcion(2 , 2 , 40000 , 'XV' , new Date())
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSuscripcionComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule, 
        ReactiveFormsModule , 
        MatTableModule, 
        MatDialogModule, 
        RouterModule.forRoot([]),
        SuscripcionModule,
        AppModule
      ],
      providers: [SuscripcionService, HttpClient,  
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let suscripcionService = TestBed.inject(SuscripcionService);
    fixture = TestBed.createComponent(ListarSuscripcionComponent);
    component = fixture.componentInstance;
    spyOn(suscripcionService, 'consultar').and.returnValue(
      of(listaSuscripciones)
    );
    fixture.detectChanges();
  });

  it('Validar creación de component', () => {
    expect(component).toBeTruthy();
  });

  it('Listar', () => {
    component.listarSuscripciones();
    expect(2).toBe(component.dataSource.data.length);
  });
});

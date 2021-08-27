import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearSuscripcionComponent } from '@suscripcion/components/crear-suscripcion/crear-suscripcion/crear-suscripcion.component';
import { Suscripcion } from '@suscripcion/shared/model/suscripcion';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-suscripcion',
  templateUrl: './listar-suscripcion.component.html',
  styleUrls: ['./listar-suscripcion.component.css']
})
export class ListarSuscripcionComponent implements OnInit {

  listSuscripciones = new Observable<Suscripcion[]>();
  dataSource: MatTableDataSource<Suscripcion>;
  displayedColumns: string[] = ['idSuscripcion', 'idCliente', 'valorSuscripcion',
                                'tipoSuscripcion', 'fechaRegistro', 'opcion'];
  preloader: boolean = false;

  @ViewChild(MatPaginator) paginador: MatPaginator;
  @ViewChild(MatSort) ordenar: MatSort;
  buscador = new FormControl('');

  constructor(protected suscripcionService: SuscripcionService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.preloader = true;
    this.listarSuscripciones();
  }


  /*
    Metodo encargado de listar la cantidad de suscripciones totales
  */
  listarSuscripciones(){
    this.suscripcionService.consultar().subscribe(async (respuesta: Suscripcion[]) =>
      {
        this.dataSource = new MatTableDataSource(await respuesta);
        this.dataSource.paginator = this.paginador;
        this.dataSource.sort = this.ordenar;
      }
    );
    this.preloader = false;
  }

  /*
    Metodo encargado de abrir modulo para guardar o actualizar suscripciones
  */
  abrirModalDeCrear(datosSuscripcion: Suscripcion = null){
    const dialogRef = this.dialog.open(CrearSuscripcionComponent, {
      height: '500px' ,
      width: '350px' ,
      data: datosSuscripcion
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.buscador.setValue('');
        this.listarSuscripciones();
      }
    });
  }

  /*
    Metodo encargado de aplicar filtro
  */
  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
    Metodo encargado de eliminar registro
  */
  eliminar(idSuscripcion:number) {
    this.suscripcionService.eliminar(idSuscripcion).subscribe(async (respuesta) => {
      console.log(respuesta);
      this.buscador.setValue('');
      this.listarSuscripciones();
    }
    );
    this.preloader = false;
  }

}

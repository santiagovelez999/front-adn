import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  dataSource :Suscripcion[] = [];
  displayedColumns: string[] = ['idSuscripcion', 'idCliente', 'valorSuscripcion',
                                'tipoSuscripcion', 'fechaRegistro', 'opcion'];

  constructor(protected suscripcionService: SuscripcionService, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.listarSuscripciones();
  }


  listarSuscripciones(){
    this.suscripcionService.consultar().subscribe((respuesta:Suscripcion[])=>
    {
      this.dataSource  = respuesta;
      console.log(respuesta);
    }
    );
  }

  abrirModalDeCrear(){
    const dialogRef = this.dialog.open(CrearSuscripcionComponent, {
      height: '500px',
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.listarSuscripciones();
      }
    });
  }
  
}

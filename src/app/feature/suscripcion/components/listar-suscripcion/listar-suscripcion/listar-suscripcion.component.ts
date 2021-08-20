import { Component, OnInit } from '@angular/core';
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

  constructor(protected suscripcionService: SuscripcionService) { 
    
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

  
}

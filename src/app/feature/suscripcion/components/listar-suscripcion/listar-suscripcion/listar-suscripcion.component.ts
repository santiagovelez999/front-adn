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

  public listSuscripciones = new Observable<Suscripcion[]>();
  public listaDeDatosSuscripcion:Suscripcion[] = [];

  constructor(protected suscripcionService: SuscripcionService) { }

  ngOnInit(): void {
    this.listarSuscripciones();
  }


  listarSuscripciones(){
    this.suscripcionService.consultar().subscribe((respuesta:Suscripcion[])=>
    {
      this.listaDeDatosSuscripcion = respuesta;
      console.log(respuesta);
    }
    );
  }

  
}

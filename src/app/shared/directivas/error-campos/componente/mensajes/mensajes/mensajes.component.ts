import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  titulo:String = "";
  icono:String = "";
  contenido:String = "";
  estado:boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) private datosMensaje: any) { }

  ngOnInit(): void {
    this.titulo = this.datosMensaje.titulo;
    this.icono = this.datosMensaje.icono;
    this.contenido = this.datosMensaje.contenido;
    this.estado = this.datosMensaje.estado;
    console.log(this.datosMensaje);
  }

}

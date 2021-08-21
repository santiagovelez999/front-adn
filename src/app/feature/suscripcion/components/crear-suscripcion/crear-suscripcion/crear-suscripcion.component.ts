import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesComponent } from '@shared/directivas/error-campos/componente/mensajes/mensajes/mensajes.component';
import { Suscripcion } from '@suscripcion/shared/model/suscripcion';
import { SuscripcionInterface } from '@suscripcion/shared/model/suscripcionInterface';
import { SuscripcionService } from '@suscripcion/shared/service/suscripcion.service';


@Component({
  selector: 'app-crear-suscripcion',
  templateUrl: './crear-suscripcion.component.html',
  styleUrls: ['./crear-suscripcion.component.css'],
  providers: [DatePipe]
})
export class CrearSuscripcionComponent implements OnInit {

  formularioSuscripcion: FormGroup;
  formularioInvalido: boolean = false;
  cerrar: boolean = true;
  titulo: String = null;
  subTituloCrear: String = "Crear";
  subTituloEditar: String = "Editar";
  idSuscripcion: number = 0;

  titulosMensajes = {
    correcto:{
      titulo:"BIEN HECHO!",
      icono:"mood"
    },
    incorrecto:{
      titulo:"UPSS!! HA OCURRIDO UN ERROR",
      icono:"mood_bad"
    }
  }

  constructor(private formBuilder: FormBuilder,
    private miDatePipe: DatePipe,
    private suscripcionService: SuscripcionService,
    @Inject(MAT_DIALOG_DATA) private datosSuscripcion: Suscripcion,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    if (this.datosSuscripcion != null) {
      this.titulo = this.subTituloEditar;
      this.precargarDatosEnFormulario();
    } else {
      this.titulo = this.subTituloCrear;
    }
  }

  iniciarFormulario() {
    this.formularioSuscripcion = this.formBuilder.group({
      idSuscripcion: new FormControl(""),
      idCliente: new FormControl("", Validators.required),
      valorSuscripcion: new FormControl("", Validators.required),
      tipoSuscripcion: new FormControl("", Validators.required),
      fechaRegistro: new FormControl("", Validators.required)
    });
  }

  precargarDatosEnFormulario() {
    this.idSuscripcion = this.datosSuscripcion.idSuscripcion;
    this.formularioSuscripcion.controls["idCliente"].setValue(this.datosSuscripcion.idCliente);
    this.formularioSuscripcion.controls["valorSuscripcion"].setValue(this.datosSuscripcion.valorSuscripcion);
    this.formularioSuscripcion.controls["tipoSuscripcion"].setValue(this.datosSuscripcion.tipoSuscripcion);
    this.formularioSuscripcion.controls["fechaRegistro"].setValue(this.transformarFechaEntrada(this.datosSuscripcion.fechaRegistro));
  }

  accion() {
    if (this.idSuscripcion != 0) {
      this.actualizar();
    } else {
      this.guardar();
    }
  }

  actualizar() {
    if (this.validarFormulario()) {
      this.formularioInvalido = false;
      let datosAEnviar: SuscripcionInterface = this.prepararDatosDeEnvio(this.idSuscripcion);
      this.suscripcionService.actualizar(datosAEnviar).subscribe(respuesta => {
        console.log("datos insertados correctamente" + respuesta);
        this.limpiarFormulario();
        this.formularioInvalido = false;
      }, error => {
        console.log(error);
      }
      );
    } else {
      this.formularioInvalido = true;
      this.limpiarFormulario();
    }
  } 

  guardar() {
    if (this.validarFormulario()) {
      this.formularioInvalido = false;
      let datosAEnviar: SuscripcionInterface = this.prepararDatosDeEnvio();
      this.suscripcionService.guardar(datosAEnviar).subscribe(respuesta => {
        console.log(respuesta);
        this.mostrarMensajes(this.titulosMensajes.correcto.titulo, 
                             this.titulosMensajes.correcto.icono, 
                            "Fecha vencimiento suscripción: " + respuesta.valor.fechaDeVencimientoDeLaSuscripcion,
                            true);
        this.limpiarFormulario();
        this.formularioInvalido = false;
      }, error => {
        console.log(error.error.mensaje);
        this.mostrarMensajes(this.titulosMensajes.incorrecto.titulo, 
                             this.titulosMensajes.incorrecto.icono, 
                             error.error.mensaje,
                             false);
      }
      );
    } else {
      this.formularioInvalido = true;
      this.limpiarFormulario();
    }
  }

  validarFormulario() {
    return this.formularioSuscripcion.valid;
  }

  prepararDatosDeEnvio(idSuscripcion: number = 0): SuscripcionInterface {
    let datosAEnviar: SuscripcionInterface = {
      idCliente: this.formularioSuscripcion.get("idCliente").value,
      valorSuscripcion: this.formularioSuscripcion.get("valorSuscripcion").value,
      tipoSuscripcion: this.formularioSuscripcion.get("tipoSuscripcion").value,
      fechaRegistro: this.transformarFechaEnvio()
    }
    if (idSuscripcion != 0) {
      datosAEnviar.idSuscripcion = this.idSuscripcion;
    }
    return datosAEnviar;
  }

  mostrarMensajes(tituloMensaje:String, iconoMensaje:String, contenidoMensaje:String, estadoMensaje:boolean){
    this.dialog.open(MensajesComponent, {
      height: '50%',
      width: '60%',
      data: {titulo: tituloMensaje, icono: iconoMensaje, contenido:contenidoMensaje, estado:estadoMensaje}
    });
  }

  limpiarFormulario() {
    this.formularioSuscripcion.get("idSuscripcion").setValue("");
    this.formularioSuscripcion.get("idCliente").setValue("");
    this.formularioSuscripcion.get("valorSuscripcion").setValue("");
    this.formularioSuscripcion.get("tipoSuscripcion").setValue("");
    this.formularioSuscripcion.get("fechaRegistro").setValue("");
  }

  transformarFechaEnvio() {
    return this.miDatePipe.transform(this.formularioSuscripcion.
      get("fechaRegistro").value, 'yyyy-MM-dd HH:mm:ss');
  }

  transformarFechaEntrada(fecha: Date) {
    return this.miDatePipe.transform(fecha, 'dd/MM/yyyy');
  }

}

import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  titulo: string = null;
  subTituloCrear: string = 'Crear';
  subTituloEditar: string = 'Editar';
  idSuscripcion: number = 0;

  titulosMensajes = {
    correcto: {
      titulo: 'BIEN HECHO!',
      icono: 'mood'
    },
    incorrecto: {
      titulo: 'UPSS!! HA OCURRIDO UN ERROR',
      icono: 'mood_bad'
    }
  };

  MENSAJE_ACTUALIZADO_CORRECTO: string = 'Datos actualizados correctamente.';

  constructor(private formBuilder: FormBuilder,
              private miDatePipe: DatePipe,
              private suscripcionService: SuscripcionService,
              public dialogRef: MatDialogRef<CrearSuscripcionComponent>,
              @Inject(MAT_DIALOG_DATA) private datosSuscripcion: Suscripcion,
              public dialogo: MatDialog) {
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    if (this.datosSuscripcion != null) {
      this.titulo = this.subTituloEditar;
      this.precargarDatosEnFormulario();
    } else {
      this.titulo = this.subTituloCrear;
    }
  }

  // Metodo encargado de inicializar formulario
  iniciarFormulario() {
    this.formularioSuscripcion = this.formBuilder.group({
      idSuscripcion: new FormControl(''),
      idCliente: new FormControl('', Validators.required),
      valorSuscripcion: new FormControl('', Validators.required),
      tipoSuscripcion: new FormControl('', Validators.required),
      fechaRegistro: new FormControl('', Validators.required)
    });
  }

  // Metodo encargado de cargar datos cuanto la opcion es actualizar
  precargarDatosEnFormulario() {
    this.idSuscripcion = this.datosSuscripcion.idSuscripcion;
    this.formularioSuscripcion.get('idCliente').setValue(this.datosSuscripcion.idCliente);
    this.formularioSuscripcion.get('valorSuscripcion').setValue(this.datosSuscripcion.valorSuscripcion);
    this.formularioSuscripcion.get('tipoSuscripcion').setValue(this.datosSuscripcion.tipoSuscripcion);
    this.formularioSuscripcion.get('fechaRegistro').setValue(this.transformarFechaEntrada(this.datosSuscripcion.fechaRegistro));
  }

  // Metodo encargado de realizar la accion de actualizar o guardar
  accion() {
    if (this.idSuscripcion !== 0) {
      this.actualizar();
    } else {
      this.guardar();
    }
  }

  // Metodo encargado de actualizar la información
  actualizar() {
    if (this.validarFormulario()) {
      this.formularioInvalido = false;
      const datosAEnviar: SuscripcionInterface = this.prepararDatosDeEnvio(this.idSuscripcion);
      this.suscripcionService.actualizar(datosAEnviar).subscribe(respuesta => {
          console.log(respuesta);
          this.mostrarMensajes(this.titulosMensajes.correcto.titulo,
                             this.titulosMensajes.correcto.icono,
                             this.MENSAJE_ACTUALIZADO_CORRECTO,
                             true
          );
          this. ocultarVentana();
      }, error => {
          this.mostrarMensajes(this.titulosMensajes.incorrecto.titulo,
                               this.titulosMensajes.incorrecto.icono,
                               error.error.mensaje,
                               false
          );
      });
    } else {
      this.formularioInvalido = true;
      this.limpiarFormulario();
    }
  }

  // Metodo encargado de guardar la información
  guardar() {
    if (this.validarFormulario()) {
      if (this.validarSoloNumeros()) {
        this.formularioInvalido = false;
        const datosAEnviar: SuscripcionInterface = this.prepararDatosDeEnvio();
        this.suscripcionService.guardar(datosAEnviar).subscribe(respuesta => {
          console.log(respuesta);
          this.mostrarMensajes(this.titulosMensajes.correcto.titulo,
            this.titulosMensajes.correcto.icono,
            this.prepararMensajeGuardar(respuesta.valor),
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
      }
    } else {
      this.formularioInvalido = true;
      this.limpiarFormulario();
    }
  }

  // Metodo encargado de validar todos los campos del formulario
  validarFormulario(): boolean {
    return this.formularioSuscripcion.valid;
  }

  // Metodo encargado de validar si los campos numericos tienen caracteres especiales
  validarSoloNumeros(): boolean {
    const valoresAceptados = /^[0-9]+$/;
    if (this.formularioSuscripcion.get('idCliente').value.match(valoresAceptados) == null ||
      this.formularioSuscripcion.get('valorSuscripcion').value.match(valoresAceptados) == null) {
      this.mostrarMensajes(this.titulosMensajes.incorrecto.titulo,
        this.titulosMensajes.incorrecto.icono,
        'Este formulario tiene errores, por favor valide la información suministrada.',
        false);
      return false;
    } else {
      return true;
    }
  }

  // Metodo encargado de preparar los datos a enviar
  prepararDatosDeEnvio(idSuscripcion: number = 0): SuscripcionInterface {
    const datosAEnviar: SuscripcionInterface = {
        idCliente: this.formularioSuscripcion.get('idCliente').value,
        valorSuscripcion: this.formularioSuscripcion.get('valorSuscripcion').value,
        tipoSuscripcion: this.formularioSuscripcion.get('tipoSuscripcion').value,
        fechaRegistro: this.transformarFechaEnvio()
    };
    if (idSuscripcion !== 0) {
        datosAEnviar.idSuscripcion = this.idSuscripcion;
    }
    return datosAEnviar;
  }

  // Metodo encargado de mostrar ventana con mensaje personalizado
  mostrarMensajes(tituloMensaje: string, iconoMensaje: string, contenidoMensaje: string, estadoMensaje: boolean) {
    this.dialogo.open(MensajesComponent, {
      height: '45%',
      width: '50%',
      data: {
        titulo: tituloMensaje, icono: iconoMensaje,
        contenido: contenidoMensaje, estado: estadoMensaje
      }
    });
  }

  // Metodo encargado de preparar el mensaje a mostrar, cuando la accion del guardar es correcta
  prepararMensajeGuardar(mensaje: any) {
    const salida: string = 'Descuento: ' + mensaje.descuento +
                           '  ||  Fecha vencimiento suscripción: ' +
                           mensaje.fechaDeVencimientoDeLaSuscripcion;
    return salida;
  }

  // Metodo encargado de limpiar todo el formulario
  limpiarFormulario() {
    this.formularioSuscripcion.get('idSuscripcion').setValue('');
    this.formularioSuscripcion.get('idCliente').setValue('');
    this.formularioSuscripcion.get('valorSuscripcion').setValue('');
    this.formularioSuscripcion.get('tipoSuscripcion').setValue('');
    this.formularioSuscripcion.get('fechaRegistro').setValue('');
  }

  // Metodo encargado de transformar formato de fecha a enviar
  transformarFechaEnvio() {
    return this.miDatePipe.transform(this.formularioSuscripcion.
      get('fechaRegistro').value, 'yyyy-MM-dd HH:mm:ss');
  }

  // Metodo encargado de transformar formato de fecha a mostrar en el actualizar
  transformarFechaEntrada(fecha: Date) {
    return new Date(fecha);
  }

  // Metodo encargado de cerrar la modal
  ocultarVentana(){
    this.dialogRef.close();
  }

}

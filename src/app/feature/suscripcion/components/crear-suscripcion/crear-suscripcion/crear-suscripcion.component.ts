import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteInterface } from '@suscripcion/shared/model/suscripcionInterface';
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
  constructor(private formBuilder: FormBuilder, 
              private miDatePipe: DatePipe,
              private suscripcionService:SuscripcionService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
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

  guardar() {
    if (this.validarFormulario()) {
      this.formularioInvalido = false;
      let datosAEnviar:ClienteInterface= {
        idCliente: this.formularioSuscripcion.get("idCliente").value,
        valorSuscripcion: this.formularioSuscripcion.get("valorSuscripcion").value,
        tipoSuscripcion: this.formularioSuscripcion.get("tipoSuscripcion").value,
        fechaRegistro: this.transformarFecha()
      }
      this.suscripcionService.guardar(datosAEnviar).subscribe(respuesta => 
        {
          console.log("datos insertados correctamente" + respuesta);
        }
      );
    } else {
      this.formularioInvalido = true;
    }
  }

  validarFormulario() {
    return this.formularioSuscripcion.valid;
  }

  transformarFecha() {
    return this.miDatePipe.transform(this.formularioSuscripcion.
      get("fechaRegistro").value, 'yyyy-MM-dd HH:mm:ss');
  }



}

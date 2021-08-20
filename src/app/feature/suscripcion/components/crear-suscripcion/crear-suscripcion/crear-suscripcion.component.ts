import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-suscripcion',
  templateUrl: './crear-suscripcion.component.html',
  styleUrls: ['./crear-suscripcion.component.css']
})
export class CrearSuscripcionComponent implements OnInit {

  formularioSuscripcion: FormGroup;
  formularioInvalido:boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formularioSuscripcion = this.formBuilder.group({
      idSuscripcion : new FormControl(""),
      idCliente : new FormControl("", Validators.required),
      valorSuscripcion : new FormControl("", Validators.required),
      tipoSuscripcion  : new FormControl("", Validators.required),
      fechaRegistro : new FormControl("", Validators.required)
    });
  }



  guardar() {
    if(this.validarFormulario()){
      this.formularioInvalido = false;

    }else{
      this.formularioInvalido = true;
    }


  }

  validarFormulario(){
    return this.formularioSuscripcion.valid;
  }

  

}

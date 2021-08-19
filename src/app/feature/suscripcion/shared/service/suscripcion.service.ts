import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Suscripcion } from '../model/suscripcion';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Suscripcion[]>(`${environment.endpoint}/listar`, this.http.optsName('consultar suscripcion'));
  }

  public guardar(suscripcion: Suscripcion) {
    return this.http.doPost<Suscripcion, boolean>(`${environment.endpoint}`, suscripcion,
                                                this.http.optsName('crear/actualizar suscripcion'));
  }
}
